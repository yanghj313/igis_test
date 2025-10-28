import React, { useEffect, useState, useRef, useCallback } from 'react';
import './MainSection.css';

const slides = [
	{
		subtitle: '변화와 혁신을 선도하는 기업, iGiS 입니다.',
		message: 'SPATIALLY INFORMED\nDRONE SOLUTIONS SPECIALIST.',
	},
	{
		subtitle: '스마트 기술로 공간정보를 연결합니다.',
		message: 'CREATING THE FUTURE\nWITH SMART GIS SYSTEMS.',
	},
	{
		subtitle: '공간과 데이터를 잇는 혁신적 플랫폼',
		message: 'INTEGRATED SOLUTIONS\nFOR A CONNECTED WORLD.',
	},
];

const MainSection = () => {
	const [current, setCurrent] = useState(0);
	const [isPlaying, setIsPlaying] = useState(true);
	const progressRefs = useRef<Array<HTMLSpanElement | null>>([]);

	const setProgressRef = useCallback(
		(index: number) => (el: HTMLSpanElement | null) => {
			progressRefs.current[index] = el;
		},
		[]
	);

	// 자동 슬라이드 전환
	useEffect(() => {
		let timer: NodeJS.Timeout | null = null;
		if (isPlaying) {
			timer = setInterval(() => {
				setCurrent(prev => (prev + 1) % slides.length);
			}, 5000);
		}
		return () => {
			if (timer) clearInterval(timer);
		};
	}, [isPlaying]);

	// 프로그레스바 애니메이션
	useEffect(() => {
		progressRefs.current.forEach((bar, idx) => {
			if (!bar) return;

			if (idx === current) {
				bar.style.display = 'block';
				bar.style.transition = 'none';
				bar.style.width = '0%';
				requestAnimationFrame(() => {
					bar.style.transition = 'width 5s linear';
					bar.style.width = '100%';
				});
			} else {
				bar.style.transition = 'none';
				bar.style.width = '0%';
				bar.style.display = 'none';
			}
		});
	}, [current]);

	const highlightMessage = (text: string, isFirstLine: boolean, isLastLine: boolean) => {
		const firstChar = text.charAt(0);
		const lastDotIndex = text.lastIndexOf('.');
		const beforeDot = text.slice(1, lastDotIndex);
		const afterDot = text.slice(lastDotIndex);

		return (
			<>
				{/* ✅ 첫 번째 줄일 때만 첫 글자 하이라이트 */}
				{isFirstLine ? <span className="highlight">{firstChar}</span> : firstChar}
				{beforeDot}
				{/* ✅ 마지막 줄에만 마지막 온점 하이라이트 */}
				{isLastLine && afterDot ? <span className="highlight">.</span> : afterDot}
			</>
		);
	};

	return (
		<section className="hero">
			<div className="hero-frame">
				<video className="hero-video" src="/assets/videos/igis_video.mp4" autoPlay muted loop playsInline />

				<div className="hero-info">
					<p className="hero-text">
						<span className="hero-sub-message">{slides[current].subtitle}</span>
						<span className="hero-message">
							{slides[current].message.split('\n').map((line, i, arr) => (
								<span key={i} className="masking">
									{highlightMessage(line, i === 0, i === arr.length - 1)}
									<br />
								</span>
							))}
						</span>
					</p>
				</div>

				<div className="hero-control">
					{/* ▶️ / ⏸ 아이콘 버튼 (텍스트 없음) */}
					<button
						type="button"
						className={`hero-control-button ${!isPlaying ? 'pause' : ''}`}
						onClick={() => setIsPlaying(p => !p)}
						aria-label={isPlaying ? '정지' : '재생'} // 스크린리더 전용
					/>

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
