// src/pages/Company/History.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@config/firebase';
import '../../assets/css/history.css';

type HistoryRow = {
	year: string | number;
	content?: string; // 한글
	eng?: string; // 영어
};

type HistoryDoc = {
	list?: HistoryRow[];
};

type ParsedEvent = {
	year: number;
	month?: string; // '01', '05'...
	text: string;
};

const parseLines = (raw: string, fallbackYear?: number): ParsedEvent[] => {
	return raw
		.split(/\r?\n/)
		.map(line => line.trim())
		.filter(Boolean)
		.map(line => {
			const m = line.match(/^[·•-]?\s*(\d{4})\.(\d{1,2})\s*(.+)$/);

			if (m) {
				const yearStr = m[1];
				const monthStr = m[2];
				const text = m[3].trim();

				const y = Number(yearStr);
				const year = Number.isFinite(y) ? y : fallbackYear ?? 0;

				return {
					year,
					month: monthStr.padStart(2, '0'),
					text,
				};
			}

			return {
				year: fallbackYear ?? 0,
				text: line,
			};
		});
};

const History: React.FC = () => {
	const { t, i18n } = useTranslation();
	const [rows, setRows] = useState<HistoryRow[]>([]);
	const [loading, setLoading] = useState(true);
	const [err, setErr] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			try {
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

	const grouped = useMemo(() => {
		const map: Record<number, ParsedEvent[]> = {};

		for (const row of rows) {
			const base = (i18n.language === 'en' ? row.eng : row.content) ?? row.content ?? row.eng ?? '';

			if (!base) continue;

			const fallbackYear = Number(row.year);
			const events = parseLines(base, fallbackYear);

			for (const ev of events) {
				if (!Number.isFinite(ev.year)) continue;
				(map[ev.year] ??= []).push(ev);
			}
		}

		Object.keys(map).forEach(key => {
			const y = Number(key);
			map[y].sort((a, b) => {
				const ma = a.month ? Number(a.month) : 0;
				const mb = b.month ? Number(b.month) : 0;
				return ma - mb;
			});
		});

		return map;
	}, [rows, i18n.language]);

	const years = useMemo(
		() =>
			Object.keys(grouped)
				.map(n => Number(n))
				.filter(n => Number.isFinite(n))
				.sort((a, b) => b - a),
		[grouped]
	);

	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		if (years.length > 0) setActiveIndex(0);
	}, [years]);

	const activeYear = years[activeIndex];

	const scrollToYear = (year: number) => {
		const el = document.getElementById(`history-year-${year}`);
		if (!el) return;
		const offset = 150;
		const top = window.scrollY + el.getBoundingClientRect().top - offset;

		window.scrollTo({
			top,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		if (!years.length) return;

		const onScroll = () => {
			const offset = 150;
			let bestIdx = activeIndex;
			let bestDiff = Infinity;

			years.forEach((year, idx) => {
				const el = document.getElementById(`history-year-${year}`);
				if (!el) return;
				const rect = el.getBoundingClientRect();
				const diff = Math.abs(rect.top - offset);

				if (rect.bottom > 0 && rect.top < window.innerHeight && diff < bestDiff) {
					bestDiff = diff;
					bestIdx = idx;
				}
			});

			if (bestIdx !== activeIndex) {
				setActiveIndex(bestIdx);
			}
		};

		window.addEventListener('scroll', onScroll);
		onScroll(); // 최초 1번 호출

		return () => window.removeEventListener('scroll', onScroll);
	}, [years, activeIndex]);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		if (window.innerWidth > 1024) return;

		const selector = `.historyYearItem[data-year="${activeYear}"]`;
		const el = document.querySelector<HTMLLIElement>(selector);
		if (!el || !el.parentElement) return;

		const container = el.parentElement; // ul.historyYearList

		const containerRect = container.getBoundingClientRect();
		const elRect = el.getBoundingClientRect();

		const offset = elRect.left - containerRect.left - containerRect.width / 2 + elRect.width / 2;

		container.scrollTo({
			left: container.scrollLeft + offset,
			behavior: 'smooth',
		});
	}, [activeYear]);

	const goPrev = () => {
		setActiveIndex(prev => {
			const next = prev > 0 ? prev - 1 : prev;
			scrollToYear(years[next]);
			return next;
		});
	};

	const goNext = () => {
		setActiveIndex(prev => {
			const next = prev < years.length - 1 ? prev + 1 : prev;
			scrollToYear(years[next]);
			return next;
		});
	};

	if (loading) {
		return (
			<section className="history-wrap">
				<p>{t('loading') || '불러오는 중…'}</p>
			</section>
		);
	}
	if (err) {
		return (
			<section className="history-wrap">
				<p style={{ color: 'crimson' }}>{err}</p>
			</section>
		);
	}
	if (!years.length) {
		return (
			<section className="history-wrap">
				<p>{t('not_found') || '연혁 데이터가 없습니다.'}</p>
			</section>
		);
	}

	return (
		<section className="subPage history_page" id="content">
			<h2 className="history-title">
				<Trans i18nKey="history_text" components={{ strong: <span className="history-title-igis" /> }} />
			</h2>
			<div className="inner">
				<div className="leftBox">
					<div className="historySlideWrap">
						<button type="button" className="arrowBtn prevBtn" onClick={goPrev}>
							<img src="/assets/images/company/arrow.png" alt="prev" />
						</button>

						<ul className="historyYearList">
							{years.map((year, idx) => (
								<li key={year} className={`historyYearItem ${idx === activeIndex ? 'active' : ''}`} data-year={year} onClick={() => scrollToYear(year)}>
									<p>{year}</p>
								</li>
							))}
						</ul>

						<button type="button" className="arrowBtn nextBtn" onClick={goNext}>
							<img src="/assets/images/company/arrow.png" alt="next" className="arrow-down" />
						</button>
					</div>
					<div className="history-scroll-hint">
						<img src="/assets/images/company/mouse.png" alt="scroll down" className="history-scroll-mouse" />
						<span className="history-scroll-text">SCROLL DOWN</span>
					</div>
				</div>

				<ul className="rightBox">
					{years.map(year => (
						<li key={year} id={`history-year-${year}`} className={`contBox year_${year} ${year === activeYear ? 'on' : ''}`}>
							<div className="textBox">
								<h3>
									<span>{year}</span>
								</h3>
								{(grouped[year] ?? []).map((ev, idx) => (
									<p key={`${year}-${idx}`} className="history-line">
										{ev.month && <span className="history-month">{ev.month}</span>}
										<span className="history-text">{ev.text}</span>
									</p>
								))}
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default History;
