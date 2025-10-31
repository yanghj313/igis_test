import React, { useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react';
import gsap from 'gsap';
import Splitting from 'splitting';
import 'splitting/dist/splitting.css';
import './MainSection.css';
import { useTranslation } from 'react-i18next';

const MainSection: React.FC = () => {
	const [current, setCurrent] = useState(0);
	const [isPlaying, setIsPlaying] = useState(true);
	const progressRefs = useRef<Array<HTMLSpanElement | null>>([]);
	const { t } = useTranslation();

	const slides = [
		{
			subtitle: t('subtitle_1'),
			message: 'SPATIALLY INFORMED\nDRONE SOLUTIONS SPECIALIST.',
		},
		{
			subtitle: t('subtitle_2'),
			message: 'CREATING THE FUTURE\nWITH SMART GIS SYSTEMS.',
		},
		{
			subtitle: t('subtitle_3'),
			message: 'INTEGRATED SOLUTIONS\nFOR A CONNECTED WORLD.',
		},
	];

	/** ✅ Progress Bar Ref */
	const setProgressRef = useCallback(
		(index: number) => (el: HTMLSpanElement | null) => {
			progressRefs.current[index] = el;
		},
		[]
	);

	/** ✅ 자동 슬라이드 전환 */
	useEffect(() => {
		let timer: ReturnType<typeof setInterval> | undefined;

		if (isPlaying) {
			timer = setInterval(() => {
				setCurrent(prev => (prev + 1) % slides.length);
			}, 6000);
		}

		return () => {
			if (timer) clearInterval(timer);
		};
	}, [isPlaying]);

	/** ✅ 프로그레스바 */
	useEffect(() => {
		progressRefs.current.forEach((bar, idx) => {
			if (!bar) return;

			if (idx === current) {
				bar.style.display = 'block';
				bar.style.transition = 'none';
				bar.style.width = '0%';
				requestAnimationFrame(() => {
					bar.style.transition = 'width 6s linear';
					bar.style.width = '100%';
				});
			} else {
				bar.style.transition = 'none';
				bar.style.width = '0%';
				bar.style.display = 'none';
			}
		});
	}, [current]);

	useLayoutEffect(() => {
		const results = Splitting({ target: '.hero-message', by: 'chars' });
		const chars = results[0]?.chars;

		// sub-message (위 텍스트)
		gsap.fromTo('.hero-sub-message', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });

		// message (큰 글자)
		if (chars && chars.length > 0) {
			gsap.fromTo(
				chars,
				{ opacity: 0, y: 60, rotateX: 45 },
				{
					opacity: 1,
					y: 0,
					rotateX: 0,
					duration: 1.2,
					ease: 'power4.out',
					stagger: 0.03,
					delay: 0.2,
				}
			);
		}

		return () => {
			gsap.killTweensOf('.hero-sub-message');
			if (chars) gsap.killTweensOf(chars);
		};
	}, [current]);

	/** ✅ 하이라이트 */
	const highlightMessage = (text: string, isFirstLine: boolean, isLastLine: boolean) => {
		const firstChar = text.charAt(0);
		const lastDotIndex = text.lastIndexOf('.');
		const beforeDot = text.slice(1, lastDotIndex);
		const afterDot = text.slice(lastDotIndex);
		return (
			<>
				{isFirstLine ? <span className="highlight">{firstChar}</span> : firstChar}
				{beforeDot}
				{isLastLine && afterDot ? <span className="highlight">.</span> : afterDot}
			</>
		);
	};

	return (
		<section className="hero">
			<div className="hero-frame">
				<video className="hero-video" src="/assets/videos/igis_video.mp4" autoPlay muted loop playsInline />

				{/* ✅ 텍스트 */}
				<div className="hero-info">
					<p className="hero-text">
						<span className="hero-sub-message">{slides[current].subtitle}</span>
						<span className="hero-message" data-splitting>
							{slides[current].message.split('\n').map((line, i, arr) => (
								<span key={i} className="masking">
									{highlightMessage(line, i === 0, i === arr.length - 1)}
									<br />
								</span>
							))}
						</span>
					</p>
				</div>

				{/* ✅ 컨트롤 */}
				<div className="hero-control">
					<button type="button" className={`hero-control-button ${!isPlaying ? 'pause' : ''}`} onClick={() => setIsPlaying(p => !p)} aria-label={isPlaying ? '정지' : '재생'} />

					<ul className="hero-list">
						{slides.map((_, idx) => (
							<li key={idx} className={`hero-item ${idx === current ? 'active' : ''}`}>
								<button className="hero-indicator" onClick={() => setCurrent(idx)}>
									<span className="hero-indicator-text">{idx === 0 ? 'Company' : idx === 1 ? 'Business' : 'Vision'}</span>
									<div className="hero-progress">
										<span className="hero-progress-track">
											<span className="hero-progress-bar" ref={setProgressRef(idx)}></span>
										</span>
									</div>
								</button>
							</li>
						))}
					</ul>
				</div>

				{/* ✅ Scroll Down */}
				<div className="scroll-down">
					<div className="scroll-arrows">
						<span></span>
						<span></span>
						<span></span>
					</div>
					<span>SCROLL DOWN</span>
				</div>
			</div>
		</section>
	);
};

export default MainSection;
