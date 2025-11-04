import React from 'react';
import { useNavigate } from 'react-router-dom';

type NewsData = {
	title: string;
	eng_title?: string;
	eng?: boolean;
	timestamp?: { seconds: number; nanoseconds: number };
};

type Props = {
	data: NewsData;
	content: string;
	EngContent: string;
};

const formatDate = (ts?: { seconds: number; nanoseconds: number }) => {
	if (!ts) return '';
	const date = new Date(ts.seconds * 1000);
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const NewsDetail: React.FC<Props> = ({ data, content, EngContent }) => {
	const navigate = useNavigate();
	const lang = navigator.language.toLowerCase().startsWith('en') ? 'en' : 'ko';
	const html = lang === 'en' ? EngContent || content : content;

	return (
		<main className="NewsDetail">
			<div className="news-section">
				<div className="news-detail">
					<h2>{lang === 'en' ? data.eng_title || data.title : data.title}</h2>
					<p>{formatDate(data.timestamp)}</p>

					<div
						className="news-content"
						dangerouslySetInnerHTML={{
							__html: html || '<p>내용이 없습니다.</p>',
						}}
					/>
				</div>

				<button onClick={() => navigate(-1)}>목록으로</button>
			</div>
		</main>
	);
};

export default NewsDetail;
