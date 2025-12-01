// src/pages/Community/Video/VideoContainer.tsx
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '@config/firebase';
import { collection, getDocs, orderBy, query, type DocumentData, type QueryDocumentSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import '../../../assets/css/news.css';

interface VideoData {
	id: string;
	title: string;
	img?: string;
	content?: string; // 유튜브 영상 ID (검색에는 안 씀)
	timestamp?: number;
	isBlind?: number;
}

type SortOrder = 'latest' | 'oldest';
type SearchField = 'title' | 'all';

const PER_PAGE = 9;

// 뉴스 리스트에서 쓰던 아이콘 그대로 재사용
const ICON_PREV = '/assets/images/prev.png'; // <, >
const ICON_PREV_BEFORE = '/assets/images/prev_before.png'; // ≪, ≫

const VideoContainer: React.FC = () => {
	const { t } = useTranslation();
	const [videos, setVideos] = useState<VideoData[]>([]);
	const [loading, setLoading] = useState(true);

	// UI 상태
	const [sortOrder, setSortOrder] = useState<SortOrder>('latest');
	const [searchField, setSearchField] = useState<SearchField>('title');
	const [searchTerm, setSearchTerm] = useState('');
	const [page, setPage] = useState(1);

	useEffect(() => {
		const fetchVideos = async (): Promise<void> => {
			setLoading(true);
			try {
				const q = query(collection(db(), 'video'), orderBy('timestamp', 'desc'));
				const snapshot = await getDocs(q);

				const rows: VideoData[] = snapshot.docs.map((d: QueryDocumentSnapshot<DocumentData>) => ({
					id: d.id,
					...(d.data() as VideoData),
				}));

				// isBlind === 0 만 노출
				const visible = rows.filter(v => v.isBlind === 0 || v.isBlind === undefined);
				setVideos(visible);
			} catch (err) {
				console.error('❌ Video load failed:', err);
				setVideos([]);
			} finally {
				setLoading(false);
			}
		};

		fetchVideos().catch(console.error);
	}, []);

	const formatDate = (ts?: number): string => {
		if (!ts) return '';
		const d = new Date(ts);
		const yyyy = d.getFullYear();
		const mm = (d.getMonth() + 1).toString().padStart(2, '0');
		const dd = d.getDate().toString().padStart(2, '0');
		return `${yyyy}.${mm}.${dd}`;
	};

	// 검색 + 정렬 + 페이지네이션
	const keyword = searchTerm.trim().toLowerCase();

	const filtered = videos.filter(v => {
		if (!keyword) return true;
		const title = (v.title ?? '').toLowerCase();

		if (searchField === 'title') return title.includes(keyword);

		// 'all' – 지금은 제목만, 나중에 설명 필드 생기면 여기서 추가
		return title.includes(keyword);
	});

	const sorted = [...filtered].sort((a, b) => {
		const ta = a.timestamp ?? 0;
		const tb = b.timestamp ?? 0;

		if (sortOrder === 'latest') return tb - ta; // 최신순
		return ta - tb; // 오래된 순
	});

	const total = sorted.length;
	const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

	// 검색/정렬 옵션이 바뀌면 1페이지로
	useEffect(() => {
		setPage(1);
	}, [searchTerm, searchField, sortOrder]);

	const startIndex = (page - 1) * PER_PAGE;
	const current = sorted.slice(startIndex, startIndex + PER_PAGE);

	if (loading) return <p className="loading">{t('loading') ?? 'Loading...'}</p>;

	return (
		<section className="video-list">
			{/* 헤더 */}
			<div className="news-header">
				<div className="news-header-right">
					<p className="news-total">
						{t('videoList.total')} <span>{total}</span>
					</p>

					<div className="news-sort">
						<label htmlFor="videoSort" className="sr-only">
							{t('videoList.sort_label')}
						</label>
						<select id="videoSort" value={sortOrder} onChange={e => setSortOrder(e.target.value as SortOrder)}>
							<option value="latest">{t('videoList.sort_latest')}</option>
							<option value="oldest">{t('videoList.sort_oldest')}</option>
						</select>
					</div>
				</div>
			</div>

			{/* 리스트 */}
			<ul className="video-items">
				{current.length === 0 && <li>{t('videoList.no_video') ?? 'No videos found.'}</li>}

				{current.map(v => (
					<li key={v.id} className="video-item">
						<Link to={`/community/video/${v.id}`} className="video-link">
							<div className="video-thumb">
								<img src={v.img || '/assets/images/no-image.jpg'} alt={v.title} loading="lazy" />
							</div>
							<div className="video-info">
								<h4 className="video-title">{v.title}</h4>
								<p className="video-date">{formatDate(v.timestamp)}</p>
							</div>
						</Link>
					</li>
				))}
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
						<label htmlFor="videoSearchField" className="sr-only">
							{t('videoList.search_field_label')}
						</label>
						<select id="videoSearchField" value={searchField} onChange={e => setSearchField(e.target.value as SearchField)}>
							<option value="title">{t('videoList.search_title')}</option>
							<option value="all">{t('videoList.search_all')}</option>
						</select>
					</div>

					<label htmlFor="videoSearch" className="sr-only">
						{t('videoList.search_label')}
					</label>
					<input id="videoSearch" type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder={t('videoList.search_placeholder')} />

					<button type="submit">{t('videoList.search_button')}</button>
				</form>
			</div>

			{/* 페이지네이션 */}
			{total > PER_PAGE && (
				<div className="news-pagination">
					{/* 처음 페이지 */}
					<button type="button" className="icon-btn first" onClick={() => setPage(1)} disabled={page === 1}>
						<img src={ICON_PREV_BEFORE} alt={t('videoList.page_first')} />
					</button>

					{/* 이전 페이지 */}
					<button type="button" className="icon-btn prev" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
						<img src={ICON_PREV} alt={t('videoList.page_prev')} />
					</button>

					{/* 숫자 버튼 */}
					{Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
						<button key={p} type="button" onClick={() => setPage(p)} className={p === page ? 'active' : ''}>
							{p}
						</button>
					))}

					{/* 다음 페이지 */}
					<button type="button" className="icon-btn next" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
						<img src={ICON_PREV} alt={t('videoList.page_next')} />
					</button>

					{/* 마지막 페이지 */}
					<button type="button" className="icon-btn last" onClick={() => setPage(totalPages)} disabled={page === totalPages}>
						<img src={ICON_PREV_BEFORE} alt={t('videoList.page_last')} />
					</button>
				</div>
			)}
		</section>
	);
};

export default VideoContainer;
