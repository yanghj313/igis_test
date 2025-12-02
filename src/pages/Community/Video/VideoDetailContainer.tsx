// src/pages/Community/Video/VideoDetailContainer.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '@config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import '../../../assets/css/newsdetails.css';

interface VideoData {
	id: string;
	title: string;
	img?: string;
	content?: string; // 기존 (지금은 잘못된 ID일 수 있음)
	youtubeId?: string; // 🔥 Firestore 콘솔에서 새로 넣는 실제 유튜브 ID
	timestamp?: number;
	isBlind?: number;
}

// 유튜브 URL/ID에서 순수 ID만 추출하는 유틸
const extractYoutubeId = (raw?: string): string | null => {
	if (!raw) return null;

	const value = raw.trim();

	// URL이 아닌, 그냥 ID처럼 보이는 경우
	if (!value.includes('http') && !value.includes('youtu')) {
		return value.split(/[?&]/)[0];
	}

	try {
		const url = new URL(value);

		// https://youtu.be/abcdEFGHijk
		if (url.hostname.includes('youtu.be')) {
			return url.pathname.replace('/', '').split(/[?&]/)[0];
		}

		// https://www.youtube.com/watch?v=abcdEFGHijk
		const vParam = url.searchParams.get('v');
		if (vParam) {
			return vParam.split(/[?&]/)[0];
		}

		// https://www.youtube.com/shorts/abcdEFGHijk
		if (url.pathname.startsWith('/shorts/')) {
			return url.pathname.replace('/shorts/', '').split(/[?&]/)[0];
		}

		// 기타: 마지막 path segment를 시도
		const parts = url.pathname.split('/');
		const last = parts[parts.length - 1];
		return last ? last.split(/[?&]/)[0] : null;
	} catch {
		// URL 파싱 실패 시, 그냥 ? 앞까지만 사용
		return value.split(/[?&]/)[0];
	}
};

// 날짜 포맷
const formatDate = (ts?: number): string => {
	if (!ts) return '';
	const d = new Date(ts);
	const yyyy = d.getFullYear();
	const mm = (d.getMonth() + 1).toString().padStart(2, '0');
	const dd = d.getDate().toString().padStart(2, '0');
	return `${yyyy}.${mm}.${dd}`;
};
const extractYoutubeIdFromImg = (img?: string): string | null => {
	if (!img) return null;
	const match = img.match(/\/vi\/([^/]+)\//);
	return match?.[1] ?? null;
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

	// youtubeId > content 우선순위로 ID 추출
	const youtubeId = extractYoutubeId(video?.youtubeId) || extractYoutubeIdFromImg(video?.img) || extractYoutubeId(video?.content);

	// 디버깅 로그 (확인 다 됐으면 빼도 됨)
	useEffect(() => {
		if (!video) return;
		console.log('🔥 raw content from DB:', video.content);
		console.log('🔥 raw youtubeId from DB:', video.youtubeId);
		console.log('🎯 parsed youtubeId (final):', youtubeId);
		console.log('🔗 embed url:', youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : 'no id');
	}, [video, youtubeId]);

	const backLabel = t('back_to_list') || '목록으로';

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
						{youtubeId ? (
							<div className="video-frame">
								<iframe
									src={`https://www.youtube.com/embed/${youtubeId}`}
									title={video.title}
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									allowFullScreen
								/>
							</div>
						) : video.img ? (
							<div className="video-frame">
								<img src={video.img} alt={video.title} />
							</div>
						) : (
							<p>{t('no_video') ?? 'Video not found.'}</p>
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
