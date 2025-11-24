// src/pages/Community/News/NewsContainer.tsx
import React, { useEffect, useState } from 'react';
import { db } from '@config/firebase';
import { collection, getDocs, orderBy, query, type CollectionReference, type DocumentData, type QueryDocumentSnapshot } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../../../assets/css/news.css';
const ICON_PREV = '/assets/images/prev.png';
const ICON_PREV_BEFORE = '/assets/images/prev_before.png';

interface NewsRow {
	title: string;
	eng_title?: string;
	text?: string;
	eng_text?: string;
	img?: string;
	thumbnailURL?: string;
	timestamp?: number;
	isBlind?: boolean | number;
}

interface NewsData extends NewsRow {
	id: string;
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

	useEffect(() => {
		const fetchNews = async (): Promise<void> => {
			setLoading(true);

			try {
				const firestore = db();
				const colRef = collection(firestore, 'news') as CollectionReference<NewsRow>;
				const q = query(colRef, orderBy('timestamp', 'desc'));
				const snapshot = await getDocs(q);

				const rows: NewsData[] = snapshot.docs.map(
					(d: QueryDocumentSnapshot<DocumentData>) =>
						({
							id: d.id,
							...(d.data() as NewsRow),
						} as NewsData)
				);

				// isBlind == true(1) 제외
				const visible = rows.filter(r => !r.isBlind);
				setNews(visible);
			} catch (err) {
				console.error('❌ News load failed:', err);
				setNews([]);
			} finally {
				setLoading(false);
			}
		};

		fetchNews().catch(console.error);
	}, []);

	// 날짜 formatting
	const formatDate = (ts?: number): string => {
		if (!ts) return '';
		const date = new Date(ts);
		return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
	};

	// 검색 + 정렬 + 페이지네이션용 데이터 가공
	const lowerKeyword = searchTerm.trim().toLowerCase();

	const filtered = news.filter(n => {
		if (!lowerKeyword) return true;

		const title = ((isEnglish ? n.eng_title || n.title : n.title) ?? '').toLowerCase();
		const content = ((isEnglish ? n.eng_text || n.text : n.text) ?? '').toLowerCase();

		if (searchField === 'title') {
			return title.includes(lowerKeyword);
		}
		if (searchField === 'content') {
			return content.includes(lowerKeyword);
		}
		// 'all'
		return title.includes(lowerKeyword) || content.includes(lowerKeyword);
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

	// 검색어/정렬이 바뀌면 1페이지로
	useEffect(() => {
		setPage(1);
	}, [searchTerm, sortOrder]);

	const startIndex = (page - 1) * PER_PAGE;
	const current = sorted.slice(startIndex, startIndex + PER_PAGE);

	if (loading) return <p className="loading">{t('loading') ?? 'Loading...'}</p>;

	return (
		<section className="news-list">
			{/* 상단 헤더: 제목 + Total + 정렬 */}
			<div className="news-header">
				<div className="news-header-right">
					<p className="news-total">
						Total <span>{total}</span>
					</p>

					<div className="news-sort">
						<select id="newsSort" value={sortOrder} onChange={e => setSortOrder(e.target.value as SortOrder)}>
							<option value="최신순">{t('최신순') ?? '최신순'}</option>
							<option value="오래된순">{t('오래된순') ?? '오래된 순'}</option>
						</select>
					</div>
				</div>
			</div>

			{/* 리스트 */}
			<ul className="news-items">
				{current.length === 0 && <li>{t('no_news') ?? 'No articles.'}</li>}

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
						// 그냥 필터만 적용하니까 추가 로직 필요 없음
					}}
					className="news-search-form"
				>
					{/* 셀렉트: 제목/내용/전체 */}
					<div className="news-search-select">
						<label htmlFor="newsSearchField" className="sr-only">
							검색 구분
						</label>
						<select id="newsSearchField" value={searchField} onChange={e => setSearchField(e.target.value as SearchField)}>
							<option value="title">제목</option>
							<option value="content">내용</option>
							<option value="all">전체</option>
						</select>
					</div>

					<label htmlFor="newsSearch" className="sr-only">
						검색어
					</label>
					<input id="newsSearch" type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="검색어를 입력하세요" />

					<button type="submit">검색</button>
				</form>
			</div>

			{/* 페이지네이션: 9개씩 */}
			{total > PER_PAGE && (
				<div className="news-pagination">
					{/* 🔹 맨 처음으로 (≪) */}
					<button type="button" className="icon-btn first" onClick={() => setPage(1)} disabled={page === 1}>
						<img src={ICON_PREV_BEFORE} alt="처음 페이지" />
					</button>

					{/* 🔹 한 칸 이전 (<) */}
					<button type="button" className="icon-btn prev" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
						<img src={ICON_PREV} alt="이전 페이지" />
					</button>

					{/* 숫자 버튼 */}
					{Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
						<button key={p} type="button" onClick={() => setPage(p)} className={p === page ? 'active' : ''}>
							{p}
						</button>
					))}

					{/* 🔹 한 칸 다음 (>) */}
					<button type="button" className="icon-btn next" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
						<img src={ICON_PREV} alt="다음 페이지" />
					</button>

					{/* 🔹 맨 마지막으로 (≫) */}
					<button type="button" className="icon-btn last" onClick={() => setPage(totalPages)} disabled={page === totalPages}>
						<img src={ICON_PREV_BEFORE} alt="마지막 페이지" />
					</button>
				</div>
			)}
		</section>
	);
};

export default NewsContainer;
