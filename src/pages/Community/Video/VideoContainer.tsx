import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '@config/firebase';
import { collection, getDocs, orderBy, query, type DocumentData, type QueryDocumentSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import '../../../assets/css/video.css';

interface VideoData {
	id: string;
	title: string;
	img?: string;
	content?: string; // 유튜브 영상 ID
	timestamp?: number;
	isBlind?: number;
}

const VideoContainer: React.FC = () => {
	const { t } = useTranslation();
	const [videos, setVideos] = useState<VideoData[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchVideos = async (): Promise<void> => {
			try {
				const q = query(collection(db(), 'video'), orderBy('timestamp', 'desc'));
				const snapshot = await getDocs(q);

				const rows: VideoData[] = snapshot.docs.map((d: QueryDocumentSnapshot<DocumentData>) => ({
					id: d.id,
					...(d.data() as VideoData),
				}));

				const visible = rows.filter(v => v.isBlind === 0);
				setVideos(visible);
			} catch (err) {
				console.error('❌ Video load failed:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchVideos().catch(console.error);
	}, []);

	const formatDate = (ts?: number): string => {
		if (!ts) return '';
		const d = new Date(ts);
		return `${d.getFullYear()}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getDate().toString().padStart(2, '0')}`;
	};

	if (loading) return <p>{t('loading') ?? 'Loading...'}</p>;

	return (
		<section className="video-list">
			<h3>{t('video') ?? 'Videos'}</h3>

			<ul className="video-items">
				{videos.length === 0 && <li>{t('no_video') ?? 'No videos found.'}</li>}

				{videos.map(v => (
					<li key={v.id} className="video-item">
						<Link to={`/community/video/${v.id}`} className="video-link">
							<div className="video-thumb">
								<img src={v.img || '/assets/images/no-image.jpg'} alt={v.title} loading="lazy" />
							</div>
							<div className="video-info">
								<h4>{v.title}</h4>
								<p>{formatDate(v.timestamp)}</p>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
};

export default VideoContainer;
