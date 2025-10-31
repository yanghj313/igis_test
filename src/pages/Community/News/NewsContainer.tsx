// src/pages/Community/News/NewsContainer.tsx
import React, { useEffect, useState } from 'react';
import { db } from '@config/firebase';
import { collection, getDocs, orderBy, query, type Timestamp, type CollectionReference } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

type UA = 'pc' | 'tablet' | 'mb';

interface NewsRow {
	title: string;
	timestamp?: Timestamp; // ← any 금지 해결
}

interface NewsData extends NewsRow {
	id: string;
}

const detectUA = (w: number): UA => {
	if (w >= 1024) return 'pc';
	if (w >= 768) return 'tablet';
	return 'mb';
};

const NewsContainer: React.FC = () => {
	const { t } = useTranslation();
	const [news, setNews] = useState<NewsData[]>([]);
	const [ua, setUa] = useState<UA>(() => (typeof window !== 'undefined' ? detectUA(window.innerWidth) : 'pc'));

	// 화면 크기 변경 시 UA 갱신
	useEffect(() => {
		const onResize = () => setUa(detectUA(window.innerWidth));
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);

	// 뉴스 불러오기
	useEffect(() => {
		const fetchNews = async () => {
			// 컬렉션에 타입 부여
			const colRef = collection(db, 'news') as CollectionReference<NewsRow>;
			const q = query(colRef, orderBy('timestamp', 'desc'));
			const snapshot = await getDocs(q);
			const rows: NewsData[] = snapshot.docs.map(d => ({
				id: d.id,
				...d.data(),
			}));
			setNews(rows);
		};
		fetchNews();
	}, []);

	return (
		<section>
			<h3>{t('news')}</h3>
			<p>현재 기기: {ua}</p>
			<ul>
				{news.map(n => (
					<li key={n.id}>
						{n.title}
						{/* 필요하면 날짜 출력:
                {n.timestamp ? n.timestamp.toDate().toLocaleDateString() : null}
            */}
					</li>
				))}
			</ul>
		</section>
	);
};

export default NewsContainer;
