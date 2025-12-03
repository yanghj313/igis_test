// src/pages/Community/News/NewsDetailContainer.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '@config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import NewsDetail from './NewsDetail';
import { useTranslation } from 'react-i18next';
import '../../../assets/css/newsdetails.css';

interface NewsData {
	title: string;
	eng_title?: string;
	text?: string;
	eng_text?: string;
	isBlind?: boolean;
	content?: string; // detail 문서 ID
	timestamp?: { seconds: number; nanoseconds: number };
}

const NewsDetailContainer: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { t } = useTranslation();

	const [data, setData] = useState<NewsData | null>(null);
	const [content, setContent] = useState('');
	const [engContent, setEngContent] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!id) return;

		const firestore = db();
		const newsRef = doc(firestore, 'news', id);

		setLoading(true);

		let unsubscribeDetail: (() => void) | null = null;

		// 🔹 news 문서 실시간 구독
		const unsubscribeNews = onSnapshot(newsRef, snap => {
			if (!snap.exists()) {
				// 문서가 없는 경우
				setData(null);
				setContent('');
				setEngContent('');
				setLoading(false);

				if (unsubscribeDetail) {
					unsubscribeDetail();
					unsubscribeDetail = null;
				}
				return;
			}

			const value = snap.data() as NewsData;
			setData(value);

			if (unsubscribeDetail) {
				unsubscribeDetail();
				unsubscribeDetail = null;
			}

			if (value.content) {
				const detailRef = doc(firestore, 'detail', value.content);

				unsubscribeDetail = onSnapshot(detailRef, detailSnap => {
					if (detailSnap.exists()) {
						const d = detailSnap.data() as { content: string; eng?: string };
						setContent(d.content);
						setEngContent(d.eng ?? '');
					} else {
						setContent('');
						setEngContent('');
					}
					setLoading(false);
				});
			} else {
				// content 필드 자체가 없으면
				setContent('');
				setEngContent('');
				setLoading(false);
			}
		});

		// 🔹 cleanup: news/detail 구독 모두 해제
		return () => {
			unsubscribeNews();
			if (unsubscribeDetail) {
				unsubscribeDetail();
			}
		};
	}, [id]);

	// 🔹 로딩
	if (loading) return <p className="loading">{t('newsDetail.loading')}</p>;

	// 🔹 데이터 없음
	if (!data) return <p className="loading">{t('newsDetail.not_found')}</p>;

	// 🔹 비공개 기사
	if (data.isBlind) return <p className="blind_text">{t('newsDetail.blind')}</p>;

	return <NewsDetail data={data} content={content} EngContent={engContent} />;
};

export default NewsDetailContainer;
