// src/pages/Community/Recruit/Recruit.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '@config/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import type { RecruitDoc } from '@/types/recruit';

const formatDate = (ms?: number) => (typeof ms === 'number' ? new Date(ms).toLocaleDateString() : '');

const Recruit: React.FC = () => {
	const [jobs, setJobs] = useState<RecruitDoc[]>([]);
	const [loading, setLoading] = useState(true);
	const [err, setErr] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const q = query(collection(db(), 'recruit'), orderBy('fixtime', 'desc'));
				const snap = await getDocs(q);
				const rows = snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<RecruitDoc, 'id'>) }));
				setJobs(rows);
			} catch (e) {
				setErr(e instanceof Error ? e.message : String(e));
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	if (loading) return <p>불러오는 중…</p>;
	if (err) return <p style={{ color: 'crimson' }}>에러: {err}</p>;

	return (
		<section>
			<h3>채용</h3>
			<ul>
				{jobs.map(j => {
					const title = j.title ?? j.work ?? '(제목 없음)';
					return (
						<li key={j.id}>
							{/* ✅ 상대경로: /community/recruitment 기준 */}
							<Link to={`detail/${j.id}`}>
								<strong>{title}</strong>
							</Link>
							{j.period?.start && (
								<>
									{' '}
									· {formatDate(j.period.start)} ~ {formatDate(j.period.finish)}
								</>
							)}
						</li>
					);
				})}
			</ul>
		</section>
	);
};

export default Recruit;
