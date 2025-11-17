import React, { useEffect, useState } from 'react';
import { db } from '@config/firebase';
import { collection, getDocs, orderBy, query, type CollectionReference, type DocumentData, type QueryDocumentSnapshot } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../../../assets/css/news.css';

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

const NewsContainer: React.FC = () => {
	const { t, i18n } = useTranslation();
	const [news, setNews] = useState<NewsData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const isEnglish = i18n.language.toLowerCase().startsWith('en');

	useEffect(() => {
		const fetchNews = async (): Promise<void> => {
			setLoading(true);

			try {
				/** ✅ Firestore 인스턴스 생성 (db() 호출 필수) */
				const firestore = db();

				/** Firestore collection 참조 */
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

				/** isBlind == true(1) 은 제외 */
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

	/** 날짜 formatting */
	const formatDate = (ts?: number): string => {
		if (!ts) return '';
		const date = new Date(ts);
		return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
	};

	if (loading) return <p>{t('loading') ?? 'Loading...'}</p>;

	return (
		<section className="news-list">
			<h3>{t('news') ?? 'News'}</h3>

			<ul className="news-items">
				{news.length === 0 && <li>{t('no_news') ?? 'No articles.'}</li>}

				{news.map(n => {
					const displayTitle = isEnglish ? n.eng_title || n.title : n.title;

					/** Firestore 기반 썸네일 결정 */
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

									{n.text && <p className="news-preview">{n.text.slice(0, 80)}...</p>}
								</div>
							</Link>
						</li>
					);
				})}
			</ul>
		</section>
	);
};

export default NewsContainer;
