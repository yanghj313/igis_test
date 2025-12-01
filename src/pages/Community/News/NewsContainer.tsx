// src/pages/Community/News/NewsContainer.tsx
import React, { useEffect, useState } from 'react';
import { db } from '@config/firebase';
import { collection, getDocs, orderBy, query, type CollectionReference, type DocumentData, type QueryDocumentSnapshot, Timestamp } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../../../assets/css/news.css';

const ICON_PREV = '/assets/images/prev.png';
const ICON_PREV_BEFORE = '/assets/images/prev_before.png';

// Firestore에 저장되는 형태
interface NewsRow {
	title: string;
	eng_title?: string;
	text?: string;
	eng_text?: string;
	img?: string;
	thumbnailURL?: string;
	timestamp?: number | Timestamp;
	isBlind?: boolean | number | string;
}

// 화면에서 사용할 형태
interface NewsData {
	id: string;
	title: string;
	eng_title?: string;
	text?: string;
	eng_text?: string;
	img?: string;
	thumbnailURL?: string;
	timestamp?: number;
	isBlind?: boolean | number | string;
}

type SortOrder = 'latest' | 'oldest';
type SearchField = 'title' | 'content' | 'all';

const PER_PAGE = 9;

const NewsContainer: React.FC = () => {
	const { t, i18n } = useTranslation();
	const [news, setNews] = useState<NewsData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	// UI 상태
	const [sortOrder, setSortOrder] = useState<SortOrder>('latest');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [searchField, setSearchField] = useState<SearchField>('title');
	const [page, setPage] = useState<number>(1);

	const isEnglish = i18n.language.toLowerCase().startsWith('en');

	// 🔹 Firestore에서 뉴스 목록 로드
	useEffect(() => {
		const fetchNews = async (): Promise<void> => {
			setLoading(true);

			try {
				const firestore = db();

				const colRef = collection(firestore, 'news') as CollectionReference<NewsRow>;
				const q = query(colRef, orderBy('timestamp', 'desc'));
				const snapshot = await getDocs(q);

				console.log('📦 총 문서 수:', snapshot.size);

				const rows: NewsData[] = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>): NewsData => {
					const data = doc.data() as NewsRow;
					console.log('🔥 news doc:', doc.id, data);

					const { timestamp, ...rest } = data;

					let ts: number | undefined;
					if (timestamp instanceof Timestamp) {
						ts = timestamp.toMillis();
					} else if (typeof timestamp === 'number') {
						ts = timestamp;
					} else {
						ts = undefined;
					}

					return {
						id: doc.id,
						...rest,
						timestamp: ts,
					};
				});

				// isBlind === true / 1 / '1' 만 숨기고 나머지는 표시
				const visible = rows.filter(row => {
					const v = row.isBlind;
					const isHidden = v === true || v === 1 || v === '1';
					return !isHidden;
				});

				setNews(visible);
			} catch (err) {
				console.error('❌ News load failed:', err);
				setNews([]);
			} finally {
				setLoading(false);
			}
		};

		void fetchNews();
	}, []);

	// 🔹 날짜 formatting
	const formatDate = (ts?: number): string => {
		if (!ts) return '';
		const date = new Date(ts);
		if (Number.isNaN(date.getTime())) return '';
		return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
	};

	// 🔹 검색 + 정렬 + 페이지네이션용 데이터 가공
	const lowerKeyword = searchTerm.trim().toLowerCase();

	const filtered = news.filter(n => {
		if (!lowerKeyword) return true;

		const title = (isEnglish ? n.eng_title || n.title : n.title)?.toLowerCase();
		const content = (isEnglish ? n.eng_text || n.text : n.text)?.toLowerCase();

		if (!title && !content) return false;

		if (searchField === 'title') {
			return title?.includes(lowerKeyword) ?? false;
		}
		if (searchField === 'content') {
			return content?.includes(lowerKeyword) ?? false;
		}
		// 'all'
		return (title?.includes(lowerKeyword) ?? false) || (content?.includes(lowerKeyword) ?? false);
	});

	const sorted = [...filtered].sort((a, b) => {
		const ta = a.timestamp ?? 0;
		const tb = b.timestamp ?? 0;

		if (sortOrder === 'latest') {
			return tb - ta; // 최신순
		}
		return ta - tb; // 오래된순
	});

	const total = sorted.length;
	const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

	// 검색어/정렬 변경 시 1페이지로
	useEffect(() => {
		setPage(1);
	}, [searchTerm, sortOrder]);

	const startIndex = (page - 1) * PER_PAGE;
	const current = sorted.slice(startIndex, startIndex + PER_PAGE);

	if (loading) {
		return <p className="loading">{t('loading') ?? 'Loading...'}</p>;
	}

	return (
		<section className="news-list">
			{/* 상단 헤더: 제목 + Total + 정렬 */}
			<div className="news-header">
				<div className="news-header-right">
					<p className="news-total">
						{t('newsdetail.total')} <span>{total}</span>
					</p>

					<div className="news-sort">
						<select id="newsSort" value={sortOrder} onChange={e => setSortOrder(e.target.value as SortOrder)}>
							<option value="latest">{t('newsdetail.sort_latest')}</option>
							<option value="oldest">{t('newsdetail.sort_oldest')}</option>
						</select>
					</div>
				</div>
			</div>

			{/* 리스트 */}
			<ul className="news-items">
				{current.length === 0 && <li>{t('newsdetail.no_news') ?? 'No articles.'}</li>}

				{current.map(n => {
					const displayTitle = isEnglish ? n.eng_title || n.title : n.title;

					const thumbnail = n.thumbnailURL && n.thumbnailURL.trim() !== '' ? n.thumbnailURL : n.img && n.img.trim() !== '' ? n.img : '/assets/images/no-image.jpg';

					return (
						<li key={n.id} className="news-item">
							<Link to={`/community/news/${n.id}`} className="news-link">
								<div className="news-thumb">
									<img src={thumbnail} alt={displayTitle} loading="lazy" />
								</div>

								<div className="news-info">
									<h4 className="news-title">{displayTitle}</h4>
									<p className="news-date">{formatDate(n.timestamp)}</p>
								</div>
							</Link>
						</li>
					);
				})}
			</ul>

			{/* 검색 바 */}
			<div className="news-search-bar">
				<form
					onSubmit={e => {
						e.preventDefault();
					}}
					className="news-search-form"
				>
					<div className="news-search-select">
						<label htmlFor="newsSearchField" className="sr-only">
							{t('newsdetail.search_field_label')}
						</label>
						<select id="newsSearchField" value={searchField} onChange={e => setSearchField(e.target.value as SearchField)}>
							<option value="title">{t('newsdetail.search_title')}</option>
							<option value="content">{t('newsdetail.search_content')}</option>
							<option value="all">{t('newsdetail.search_all')}</option>
						</select>
					</div>

					<label htmlFor="newsSearch" className="sr-only">
						{t('newsdetail.search_label')}
					</label>
					<input id="newsSearch" type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder={t('newsdetail.search_placeholder')} />

					<button type="submit">{t('newsdetail.search_button')}</button>
				</form>
			</div>

			{/* 페이지네이션 */}
			{total > PER_PAGE && (
				<div className="news-pagination">
					<button type="button" className="icon-btn first" onClick={() => setPage(1)} disabled={page === 1}>
						<img src={ICON_PREV_BEFORE} alt={t('newsdetail.page_first')} />
					</button>

					<button type="button" className="icon-btn prev" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
						<img src={ICON_PREV} alt={t('newsdetail.page_prev')} />
					</button>

					{Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
						<button key={p} type="button" onClick={() => setPage(p)} className={p === page ? 'active' : ''}>
							{p}
						</button>
					))}

					<button type="button" className="icon-btn next" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
						<img src={ICON_PREV} alt={t('newsdetail.page_next')} />
					</button>

					<button type="button" className="icon-btn last" onClick={() => setPage(totalPages)} disabled={page === totalPages}>
						<img src={ICON_PREV_BEFORE} alt={t('newsdetail.page_last')} />
					</button>
				</div>
			)}
		</section>
	);
};

export default NewsContainer;
