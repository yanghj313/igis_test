// src/pages/Community/Recruit/Recruit.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '@config/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import type { RecruitDoc } from '@/types/recruit';
import '../../../assets/css/recruit.css';

const formatDate = (ms?: number) => (typeof ms === 'number' ? new Date(ms).toLocaleDateString() : '');

type Period = { start?: number; finish?: number } | undefined;

// 채용 상태 계산: 마감일 지나면 "채용마감", 그 외에는 "채용중"
const getRecruitStatus = (period: Period): '채용중' | '채용마감' => {
	if (period?.finish) {
		const now = Date.now();
		if (now > period.finish) return '채용마감';
	}
	return '채용중';
};

// 기간 문구
const getPeriodLabel = (period: Period) => {
	if (!period?.start) return '';
	if (period.finish) {
		return `${formatDate(period.start)} ~ ${formatDate(period.finish)}`;
	}
	return `${formatDate(period.start)} · 채용 시`;
};

const PER_PAGE = 10;

const Recruit: React.FC = () => {
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

	// 글 개수 / 페이지 계산
	const total = jobs.length;
	const totalPages = Math.ceil(total / PER_PAGE) || 1;

	// jobs가 바뀌면 페이지를 1로 리셋
	useEffect(() => {
		setPage(1);
	}, [total]);

	const startIndex = (page - 1) * PER_PAGE;
	const currentJobs = jobs.slice(startIndex, startIndex + PER_PAGE);

	if (loading) return <p>불러오는 중…</p>;
	if (err) return <p style={{ color: 'crimson' }}>에러: {err}</p>;

	return (
		<section className="content-box recruit-list">
			<div className="recruit-header">
				<h2>IGIS는 내일을 함께 할 팀원을 찾습니다</h2>
				<p className="recruit-total">
					Total <span>{total}</span>
				</p>
			</div>

			<ul className="recruit-grid">
				{currentJobs.map(j => {
					const title = j.title ?? j.work ?? '(제목 없음)';
					const status = getRecruitStatus(j.period);
					const periodLabel = getPeriodLabel(j.period);
					const isClosed = status === '채용마감'; // 🔹 추가

					return (
						<li key={j.id} className="recruit-card">
							<Link to={`detail/${j.id}`}>
								<p className={`recruit-status ${isClosed ? 'closed' : 'open'}`}>{status}</p>

								{/* 🔹 마감이면 close 클래스 추가 */}
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
						이전
					</button>

					{Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
						<button key={p} type="button" onClick={() => setPage(p)} className={p === page ? 'active' : ''}>
							{p}
						</button>
					))}

					<button type="button" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
						다음
					</button>
				</div>
			)}
		</section>
	);
};

export default Recruit;
