// src/pages/Community/Contact/Contact.tsx (혹은 Contact/index.tsx 위치)
import React, { useEffect, useState } from 'react';
import { db } from '@config/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

interface ContactData {
	id: string;
	company: string;
	email?: string;
	phone?: string;
}

const Contact: React.FC = () => {
	const { t } = useTranslation();
	const [data, setData] = useState<ContactData[]>([]);
	const [loading, setLoading] = useState(true);
	const [err, setErr] = useState<string | null>(null);

	useEffect(() => {
		const firestore = db();
		const colRef = collection(firestore, 'contact');

		setLoading(true);

		// 🔹 실시간 구독
		const unsubscribe = onSnapshot(
			colRef,
			snapshot => {
				const rows: ContactData[] = snapshot.docs.map(doc => ({
					id: doc.id,
					...(doc.data() as Omit<ContactData, 'id'>),
				}));
				setData(rows);
				setErr(null);
				setLoading(false);
			},
			error => {
				console.error('❌ Contact load failed:', error);
				setErr(error.message);
				setData([]);
				setLoading(false);
			}
		);

		// 🔹 언마운트 시 구독 해제
		return () => {
			unsubscribe();
		};
	}, []);

	if (loading) {
		return (
			<section>
				<h3>{t('contact')}</h3>
				<p className="loading">{t('loading') ?? 'Loading...'}</p>
			</section>
		);
	}

	if (err) {
		return (
			<section>
				<h3>{t('contact')}</h3>
				<p style={{ color: 'crimson' }}>{err}</p>
			</section>
		);
	}

	return (
		<section>
			<h3>{t('contact')}</h3>
			<ul>
				{data.map(item => (
					<li key={item.id}>{item.company}</li>
				))}
			</ul>
		</section>
	);
};

export default Contact;
