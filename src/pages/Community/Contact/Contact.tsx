import React, { useEffect, useState } from 'react';
import { db } from '@config/firebase';
import { collection, getDocs } from 'firebase/firestore';
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

	useEffect(() => {
		const fetchData = async () => {
			const snapshot = await getDocs(collection(db, 'contact'));
			setData(snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<ContactData, 'id'>) })));
		};
		fetchData();
	}, []);

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
