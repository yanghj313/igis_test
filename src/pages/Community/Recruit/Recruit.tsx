import React, { useEffect, useState } from 'react';
import { db } from '@config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

interface JobData {
	id: string;
	title: string;
	description?: string;
}

const Recruit: React.FC = () => {
	const { t } = useTranslation();
	const [jobs, setJobs] = useState<JobData[]>([]);

	useEffect(() => {
		const fetchJobs = async () => {
			const snapshot = await getDocs(collection(db, 'recruit'));
			setJobs(snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<JobData, 'id'>) })));
		};
		fetchJobs();
	}, []);

	return (
		<section>
			<h3>{t('recruit')}</h3>
			<ul>
				{jobs.map(j => (
					<li key={j.id}>{j.title}</li>
				))}
			</ul>
		</section>
	);
};

export default Recruit;
