// src/pages/Community/News/NewsDetail.tsx
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../assets/css/newsdetails.css';
import { useTranslation } from 'react-i18next';

/** Firestore Timestamp 또는 밀리초 number 둘 다 대응 */
type NewsTimestamp = number | { seconds: number; nanoseconds?: number };

type NewsData = {
	title: string;
	eng_title?: string;
	eng?: boolean;
	timestamp?: NewsTimestamp;
};

type Props = {
	data: NewsData;
	content: string; // 국문 HTML
	EngContent: string; // 영문 HTML
};

const formatDate = (ts?: NewsTimestamp): string => {
	if (ts == null) return '';

	let date: Date;

	if (typeof ts === 'number') {
		// Date.now() 처럼 밀리초 숫자로 들어온 경우
		date = new Date(ts);
	} else {
		// Firestore Timestamp 형태 { seconds, nanoseconds }
		date = new Date(ts.seconds * 1000);
	}

	if (isNaN(date.getTime())) return ''; // 안전장치

	const yyyy = date.getFullYear();
	const mm = String(date.getMonth() + 1).padStart(2, '0');
	const dd = String(date.getDate()).padStart(2, '0');
	return `${yyyy}-${mm}-${dd}`;
};

const NewsDetail: React.FC<Props> = ({ data, content, EngContent }) => {
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();

	// i18n 기준으로 언어 판단
	const lang: 'ko' | 'en' = i18n.language.toLowerCase().startsWith('en') ? 'en' : 'ko';

	const title = useMemo(() => (lang === 'en' ? data.eng_title || data.title : data.title), [lang, data.eng_title, data.title]);

	const html = useMemo(() => {
		const raw = lang === 'en' ? EngContent || content : content;
		return raw && raw.trim() !== '' ? raw : '<p>내용이 없습니다.</p>';
	}, [lang, content, EngContent]);

	const dateLabel = formatDate(data.timestamp);

	return (
		<main className="NewsDetail">
			<section className="news-section">
				<article className="news-detail">
					<header>
						<h2>{title}</h2>
						{dateLabel && <p className="news-date">{dateLabel}</p>}
					</header>

					<div className="news-content" dangerouslySetInnerHTML={{ __html: html }} />
				</article>

				<div className="news-detail-footer">
					<button type="button" onClick={() => navigate(-1)}>
						{t('newsdetail.back_to_list')}
					</button>
				</div>
			</section>
		</main>
	);
};

export default NewsDetail;
