import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '@config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import '../../../assets/css/video.css';

interface VideoData {
	id: string;
	title: string;
	img?: string;
	content?: string; // 유튜브 영상 ID
	timestamp?: number;
	isBlind?: number;
}

const VideoDetailContainer: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { t } = useTranslation();
	const [video, setVideo] = useState<VideoData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchVideo = async (): Promise<void> => {
			if (!id) return;
			setLoading(true);
			try {
				const docRef = doc(db, 'video', id);
				const snapshot = await getDoc(docRef);
				if (snapshot.exists()) {
					const data = snapshot.data() as VideoData;
					setVideo(data);
				} else {
					setVideo(null);
				}
			} catch (err) {
				console.error('❌ Video fetch error:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchVideo().catch(console.error);
	}, [id]);

	const formatDate = (ts?: number): string => {
		if (!ts) return '';
		const d = new Date(ts);
		return `${d.getFullYear()}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getDate().toString().padStart(2, '0')}`;
	};

	if (loading) return <p>{t('loading') ?? 'Loading...'}</p>;
	if (!video) return <p>{t('no_video') ?? 'Video not found.'}</p>;
	if (video.isBlind && video.isBlind !== 0) return <p>{t('private_video') ?? 'Private video.'}</p>;

	return (
		<article className="video-detail">
			<Link to="/community/video" className="back-link">
				← {t('back_to_list') ?? 'Back to List'}
			</Link>

			<h2 className="video-title">{video.title}</h2>
			<p className="video-date">{formatDate(video.timestamp)}</p>

			{/* ✅ 유튜브 임베드 */}
			{video.content ? (
				<div className="video-frame">
					<iframe width="100%" height="480" src={`https://www.youtube.com/embed/${video.content}`} title={video.title} frameBorder="0" allowFullScreen></iframe>
				</div>
			) : (
				<img src={video.img} alt={video.title} />
			)}
		</article>
	);
};

export default VideoDetailContainer;
