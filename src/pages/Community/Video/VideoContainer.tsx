import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '@config/firebase';
import {
	collection,
	getDocs,
	orderBy,
	query,
	Timestamp, // ✅ 추가
} from 'firebase/firestore';

interface VideoData {
	id: string;
	title: string;
	url?: string;
	thumbnail?: string;
	timestamp?: Timestamp; // ✅ 정확한 타입 지정
}

const VideoContainer: React.FC = () => {
	const { t } = useTranslation();
	const [videos, setVideos] = useState<VideoData[]>([]);

	useEffect(() => {
		const fetchVideos = async () => {
			const q = query(collection(db, 'video'), orderBy('timestamp', 'desc'));
			const snapshot = await getDocs(q);
			const rows = snapshot.docs.map(doc => ({
				id: doc.id,
				...(doc.data() as Omit<VideoData, 'id'>),
			}));
			setVideos(rows);
		};
		fetchVideos();
	}, []);

	return (
		<section>
			<h3>{t('video')}</h3>
			<ul>
				{videos.map(v => (
					<li key={v.id}>{v.title}</li>
				))}
			</ul>
		</section>
	);
};

export default VideoContainer;
