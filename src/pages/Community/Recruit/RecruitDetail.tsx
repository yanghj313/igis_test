// src/pages/Community/Recruit/RecruitDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '@config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { RecruitDoc } from '@/types/recruit';

const formatDate = (ms?: number) => (typeof ms === 'number' ? new Date(ms).toLocaleDateString() : '');

const RecruitDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [job, setJob] = useState<RecruitDoc | null>(null);
	const [loading, setLoading] = useState(true);
	const [err, setErr] = useState<string | null>(null);

	useEffect(() => {
		if (!id) return;
		(async () => {
			try {
				const snap = await getDoc(doc(db(), 'recruit', id));
				setJob(snap.exists() ? { id: snap.id, ...(snap.data() as Omit<RecruitDoc, 'id'>) } : null);
			} catch (e) {
				setErr(e instanceof Error ? e.message : String(e));
			} finally {
				setLoading(false);
			}
		})();
	}, [id]);

	if (loading)
		return (
			<section>
				<p>불러오는 중…</p>
			</section>
		);
	if (err)
		return (
			<section>
				<p style={{ color: 'crimson' }}>에러: {err}</p>
			</section>
		);
	if (!job)
		return (
			<section>
				<p>공고를 찾을 수 없습니다.</p>
			</section>
		);

	const title = job.title ?? job.work ?? '(제목 없음)';

	return (
		<section>
			<p>
				<Link to="/community/recruitment">← 목록으로</Link>
			</p>

			<h2>{title}</h2>
			{job.description && <p>{job.description}</p>}

			<dl>
				{typeof job.category === 'number' && (
					<>
						<dt>분류</dt>
						<dd>{job.category}</dd>
					</>
				)}
				{job.work && (
					<>
						<dt>주요업무</dt>
						<dd>{job.work}</dd>
					</>
				)}
				{job.condition && (
					<>
						<dt>근무조건</dt>
						<dd>{job.condition}</dd>
					</>
				)}
				{job.experience && (
					<>
						<dt>우대/경력</dt>
						<dd>{job.experience}</dd>
					</>
				)}
				{job.find && (
					<>
						<dt>인재상</dt>
						<dd>{job.find}</dd>
					</>
				)}
				{job.period && (
					<>
						<dt>접수기간</dt>
						<dd>
							{formatDate(job.period.start)} ~ {formatDate(job.period.finish)}
						</dd>
					</>
				)}
				{typeof job.view === 'number' && (
					<>
						<dt>조회수</dt>
						<dd>{job.view}</dd>
					</>
				)}
				{job.fixtime && (
					<>
						<dt>게시일</dt>
						<dd>{formatDate(job.fixtime)}</dd>
					</>
				)}
			</dl>
		</section>
	);
};

export default RecruitDetail;
