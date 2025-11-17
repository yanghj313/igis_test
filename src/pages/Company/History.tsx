// src/pages/Company/History.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@config/firebase';

type HistoryRow = {
	year: string | number;
	content?: string; // 한글
	eng?: string; // 영어
};

type HistoryDoc = {
	list?: HistoryRow[];
};

const History: React.FC = () => {
	const { t, i18n } = useTranslation();
	const [rows, setRows] = useState<HistoryRow[]>([]);
	const [loading, setLoading] = useState(true);
	const [err, setErr] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			try {
				// history 컬렉션에서 첫 문서의 list 배열을 사용 (콘솔 스샷 구조와 동일)
				const snap = await getDocs(collection(db(), 'history'));
				const first = snap.docs[0]?.data() as HistoryDoc | undefined;

				const list: HistoryRow[] = Array.isArray(first?.list) ? first!.list : [];
				setRows(list);
			} catch (e) {
				setErr(e instanceof Error ? e.message : String(e));
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	// 연도 -> 항목[] 로 그룹핑
	const grouped = useMemo(() => {
		const map: Record<number, HistoryRow[]> = {};
		for (const r of rows) {
			const y = Number(r.year);
			if (!Number.isFinite(y)) continue;
			(map[y] ??= []).push(r);
		}
		return map;
	}, [rows]);

	// 🔽 최신 연도부터 위에 보이게 (내림차순)
	const years = useMemo(
		() =>
			Object.keys(grouped)
				.map(n => Number(n))
				.filter(n => Number.isFinite(n))
				.sort((a, b) => b - a),
		[grouped]
	);

	if (loading)
		return (
			<section className="history-wrap">
				<p>{t('loading') || '불러오는 중…'}</p>
			</section>
		);
	if (err)
		return (
			<section className="history-wrap">
				<p style={{ color: 'crimson' }}>{err}</p>
			</section>
		);
	if (years.length === 0)
		return (
			<section className="history-wrap">
				<p>{t('not_found') || '연혁 데이터가 없습니다.'}</p>
			</section>
		);

	return (
		<section className="history-wrap">
			<h2 className="history-title">{t('history') || '연혁'}</h2>

			{years.map(year => (
				<div key={year} className="history-year">
					<h3 className="year">{year}</h3>
					<ul className="events">
						{grouped[year].map((it, idx) => {
							const text = (i18n.language === 'en' ? it.eng : it.content) || it.content || it.eng || '';
							return (
								<li key={idx} className="event">
									{text}
								</li>
							);
						})}
					</ul>
				</div>
			))}

			{/* 최소 스타일 (원하면 제거하고 CSS 파일로 옮겨도 됩니다) */}
			<style>{`
        .history-wrap { max-width: 920px; margin: 0 auto; padding: 24px 16px; }
        .history-title { font-size: 28px; font-weight: 700; margin: 0 0 20px; }
        .history-year { display: grid; grid-template-columns: 120px 1fr; gap: 16px; padding: 18px 0; border-top: 1px solid #e5e7eb; }
        .history-year:first-of-type { border-top: 0; }
        .year { margin: 0; font-size: 22px; line-height: 1; color: #111827; }
        .events { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
        .event { position: relative; padding-left: 14px; color: #374151; }
        .event::before { content: '•'; position: absolute; left: 0; top: 0; color: #9ca3af; }
        @media (max-width: 640px) {
          .history-year { grid-template-columns: 1fr; }
          .year { margin-bottom: 4px; }
        }
      `}</style>
		</section>
	);
};

export default History;
