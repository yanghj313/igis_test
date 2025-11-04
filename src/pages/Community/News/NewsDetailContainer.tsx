import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '@config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import NewsDetail from '@pages/Community/News/NewsDetail';

// ✅ 타입 정의 (Firestore 구조에 맞게)
interface NewsData {
	title: string;
	eng_title?: string;
	text?: string;
	eng_text?: string;
	isBlind?: boolean;
	content?: string;
	eng?: boolean;
	timestamp?: { seconds: number; nanoseconds: number };
}

const NewsDetailContainer: React.FC = () => {
	const { id } = useParams<{ id: string }>();

	const [data, setData] = useState<NewsData | null>(null);
	const [content, setContent] = useState<string>('');
	const [EngContent, setEngContent] = useState<string>('');

	// ✅ Firestore에서 데이터 가져오기
	useEffect(() => {
		const fetchNews = async () => {
			if (!id) return;

			try {
				const newsDoc = await getDoc(doc(db, 'news', id));
				if (newsDoc.exists()) {
					const value = newsDoc.data() as NewsData;
					setData(value);

					// ✅ content 필드에 연결된 detail 문서 불러오기
					if (value.content) {
						const detailDoc = await getDoc(doc(db, 'detail', value.content));
						if (detailDoc.exists()) {
							const detailData = detailDoc.data() as {
								content: string;
								eng?: string;
							};
							setContent(detailData.content);
							if (detailData.eng) setEngContent(detailData.eng);
						}
					}
				}
			} catch (err) {
				console.error('❌ Firestore 데이터 불러오기 실패:', err);
			}
		};

		fetchNews();
	}, [id]);

	// ✅ 로딩 중 처리
	if (!data) return <p>뉴스를 불러오는 중입니다...</p>;
	if (data.isBlind) return <p>비공개 기사입니다.</p>;

	return <NewsDetail data={data} content={content} EngContent={EngContent} />;
};

export default NewsDetailContainer;
