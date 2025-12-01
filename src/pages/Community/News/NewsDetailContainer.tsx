import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '@config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import NewsDetail from './NewsDetail';
import { useTranslation } from 'react-i18next';
import '../../../assets/css/newsdetails.css';

interface NewsData {
	title: string;
	eng_title?: string;
	text?: string;
	eng_text?: string;
	isBlind?: boolean;
	content?: string;
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
		const fetchNews = async () => {
			if (!id) return;

			try {
				const firestore = db();
				const newsDoc = await getDoc(doc(firestore, 'news', id));

				if (!newsDoc.exists()) {
					setLoading(false);
					return;
				}

				const value = newsDoc.data() as NewsData;
				setData(value);

				// 상세 내용 가져오기
				if (value.content) {
					const detailDoc = await getDoc(doc(firestore, 'detail', value.content));

					if (detailDoc.exists()) {
						const d = detailDoc.data() as { content: string; eng?: string };
						setContent(d.content);
						if (d.eng) setEngContent(d.eng);
					}
				}
			} catch (err) {
				console.error('❌ News detail load failed:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchNews();
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
