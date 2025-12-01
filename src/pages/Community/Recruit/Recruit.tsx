// src/pages/Community/Recruit/Recruit.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '@config/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import type { RecruitDoc } from '@/types/recruit';
import { useTranslation } from 'react-i18next';
import '../../../assets/css/recruit.css';

const formatDate = (ms?: number) => (typeof ms === 'number' ? new Date(ms).toLocaleDateString() : '');

type Period = { start?: number; finish?: number } | undefined;

// 🔹 채용 상태 계산
const getRecruitStatus = (period: Period, t: (key: string) => string): string => {
	if (period?.finish) {
		const now = Date.now();
		if (now > period.finish) return t('recruitment.closed'); // "채용마감"
	}
	return t('recruitment.open'); // "채용중"
};

// 🔹 기간 문구
const getPeriodLabel = (period: Period, t: (key: string) => string): string => {
	if (!period?.start) return '';
	if (period.finish) {
		return `${formatDate(period.start)} ~ ${formatDate(period.finish)}`;
	}
	return `${formatDate(period.start)} · ${t('recruitment.until_hired')}`; // "채용 시"
};

const PER_PAGE = 10;

const Recruit: React.FC = () => {
	const { t } = useTranslation();
	const [jobs, setJobs] = useState<RecruitDoc[]>([]);
	const [loading, setLoading] = useState(true);
	const [err, setErr] = useState<string | null>(null);
	const [page, setPage] = useState(1);

	useEffect(() => {
		(async () => {
			try {
				const q = query(collection(db(), 'recruit'), orderBy('fixtime', 'desc'));
				const snap = await getDocs(q);
				const rows = snap.docs.map(d => ({
					id: d.id,
					...(d.data() as Omit<RecruitDoc, 'id'>),
				}));
				setJobs(rows);
			} catch (e) {
				setErr(e instanceof Error ? e.message : String(e));
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	const total = jobs.length;
	const totalPages = Math.ceil(total / PER_PAGE) || 1;

	useEffect(() => {
		setPage(1);
	}, [total]);

	const startIndex = (page - 1) * PER_PAGE;
	const currentJobs = jobs.slice(startIndex, startIndex + PER_PAGE);

	if (loading) return <p className="loading">{t('loading')}</p>;
	if (err)
		return (
			<p style={{ color: 'crimson' }}>
				{t('error')}: {err}
			</p>
		);

	return (
		<section className="content-box recruit-list">
			<div className="recruit-header">
				<h2>{t('recruitment.title')}</h2>

				<p className="recruit-total">
					{t('total')} <span>{total}</span>
				</p>
			</div>

			<ul className="recruit-grid">
				{currentJobs.map(j => {
					const title = j.title ?? j.work ?? t('recruitment.no_title');

					const status = getRecruitStatus(j.period, t);
					const periodLabel = getPeriodLabel(j.period, t);
					const isClosed = status === t('recruitment.closed');

					return (
						<li key={j.id} className="recruit-card">
							<Link to={`detail/${j.id}`}>
								<p className={`recruit-status ${isClosed ? 'closed' : 'open'}`}>{status}</p>

								<h3 className={`recruit-title ${isClosed ? 'close' : ''}`}>{title}</h3>

								{periodLabel && <p className={`recruit-period ${isClosed ? 'close' : ''}`}>{periodLabel}</p>}
							</Link>
						</li>
					);
				})}
			</ul>

			{total > PER_PAGE && (
				<div className="recruit-pagination">
					<button type="button" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
						{t('prev')}
					</button>

					{Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
						<button key={p} type="button" onClick={() => setPage(p)} className={p === page ? 'active' : ''}>
							{p}
						</button>
					))}

					<button type="button" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
						{t('next')}
					</button>
				</div>
			)}
		</section>
	);
};

export default Recruit;
