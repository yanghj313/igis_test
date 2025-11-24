import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '@config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import NewsDetail from './NewsDetail';
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

	const [data, setData] = useState<NewsData | null>(null);
	const [content, setContent] = useState('');
	const [engContent, setEngContent] = useState('');

	useEffect(() => {
		const fetchNews = async () => {
			if (!id) return;

			const firestore = db();

			const newsDoc = await getDoc(doc(firestore, 'news', id));
			if (!newsDoc.exists()) return;

			const value = newsDoc.data() as NewsData;
			setData(value);

			if (value.content) {
				const detailDoc = await getDoc(doc(firestore, 'detail', value.content));
				if (detailDoc.exists()) {
					const d = detailDoc.data() as { content: string; eng?: string };
					setContent(d.content);
					if (d.eng) setEngContent(d.eng);
				}
			}
		};

		fetchNews();
	}, [id]);

	if (!data) return <p className="loading">뉴스를 불러오는 중입니다...</p>;
	if (data.isBlind) return <p className="blind_text">비공개 기사입니다.</p>;

	return <NewsDetail data={data} content={content} EngContent={engContent} />;
};

export default NewsDetailContainer;
