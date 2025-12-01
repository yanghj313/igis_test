// src/pages/Community/Video/VideoDetailContainer.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '@config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import '../../../assets/css/newsdetails.css'; // ✅ 뉴스 디테일이랑 같은 레이아웃 사용

interface VideoData {
	id: string;
	title: string;
	img?: string;
	content?: string; // 유튜브 영상 ID
	timestamp?: number;
	isBlind?: number;
}

const formatDate = (ts?: number): string => {
	if (!ts) return '';
	const d = new Date(ts);
	const yyyy = d.getFullYear();
	const mm = (d.getMonth() + 1).toString().padStart(2, '0');
	const dd = d.getDate().toString().padStart(2, '0');
	return `${yyyy}.${mm}.${dd}`;
};

const VideoDetailContainer: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const [video, setVideo] = useState<VideoData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchVideo = async (): Promise<void> => {
			if (!id) return;
			setLoading(true);
			try {
				const docRef = doc(db(), 'video', id);
				const snapshot = await getDoc(docRef);
				if (snapshot.exists()) {
					const data = snapshot.data() as Omit<VideoData, 'id'>;
					setVideo({ id: snapshot.id, ...data });
				} else {
					setVideo(null);
				}
			} catch (err) {
				console.error('❌ Video fetch error:', err);
				setVideo(null);
			} finally {
				setLoading(false);
			}
		};

		fetchVideo().catch(console.error);
	}, [id]);

	const backLabel = t('back_to_list') || '목록으로';

	// 로딩/없음/비공개도 레이아웃 안에서 보여주면 더 자연스러움
	if (loading) {
		return (
			<main className="NewsDetail">
				<section className="news-section">
					<article className="news-detail">
						<p className="loading">{t('loading') ?? 'Loading...'}</p>
					</article>
				</section>
			</main>
		);
	}

	if (!video) {
		return (
			<main className="NewsDetail">
				<section className="news-section">
					<article className="news-detail">
						<p>{t('no_video') ?? 'Video not found.'}</p>
					</article>
					<div className="news-detail-footer">
						<button type="button" onClick={() => navigate('/community/video')}>
							{backLabel}
						</button>
					</div>
				</section>
			</main>
		);
	}

	if (video.isBlind && video.isBlind !== 0) {
		return (
			<main className="NewsDetail">
				<section className="news-section">
					<article className="news-detail">
						<p>{t('private_video') ?? 'Private video.'}</p>
					</article>
					<div className="news-detail-footer">
						<button type="button" onClick={() => navigate('/community/video')}>
							{backLabel}
						</button>
					</div>
				</section>
			</main>
		);
	}

	const dateLabel = formatDate(video.timestamp);

	return (
		<main className="NewsDetail">
			<section className="news-section">
				<article className="news-detail">
					<header>
						<h2>{video.title}</h2>
						{dateLabel && <p className="news-date">{dateLabel}</p>}
					</header>

					<div className="news-content">
						{video.content ? (
							<div className="video-frame">
								<iframe width="100%" height="480" src={`https://www.youtube.com/embed/${video.content}`} title={video.title} frameBorder="0" allowFullScreen />
							</div>
						) : (
							video.img && (
								<div className="video-frame">
									<img src={video.img} alt={video.title} />
								</div>
							)
						)}
					</div>
				</article>

				<div className="news-detail-footer">
					<button type="button" onClick={() => navigate('/community/video')}>
						{t('videoList.back_to_list') ?? '목록'}
					</button>
				</div>
			</section>
		</main>
	);
};

export default VideoDetailContainer;
