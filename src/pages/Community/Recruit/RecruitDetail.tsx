// src/pages/Community/Recruit/RecruitDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '@config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { RecruitDoc } from '@/types/recruit';
import '../../../assets/css/recruitdetail.css';

const formatDate = (ms?: number) => (typeof ms === 'number' ? new Date(ms).toLocaleDateString() : '');

type Period = { start?: number; finish?: number } | undefined;

const getRecruitStatus = (period: Period): '채용중' | '채용마감' => {
	if (period?.finish) {
		const now = Date.now();
		if (now > period.finish) return '채용마감';
	}
	return '채용중';
};

const getPeriodLabel = (period: Period) => {
	if (!period?.start) return '';
	if (period.finish) {
		return `${formatDate(period.start)} ~ ${formatDate(period.finish)}`;
	}
	return `${formatDate(period.start)} · 채용 시`;
};

const tagText = [
	{ text: '# 자율적이고 편안한 분위기', type: 'tag1' },
	{ text: '# 탄력근무제', type: 'tag2' },
	{ text: '# 간식커피무한제공', type: 'tag3' },
	{ text: '# 공간정보 솔루션', type: 'tag4' },
	{ text: '# 드론 솔루션은 iGiS', type: 'tag5' },
	{ text: '# 내일채움공채지원', type: 'tag6' },
	{ text: '# DFOS', type: 'tag7' },
	{ text: '# 4차 산업혁명 시대를 선도', type: 'tag8' },
];

const section1 = [
	{
		text: <>개개인의 성장이 곧 회사의 성장!</>,
		sub: (
			<>
				스스로 성장하기 위해 주도적, 능동적으로 <br />
				업무에 임할 수 있는 인재
			</>
		),
		img: '/assets/images/recruit/section1-icon1.svg',
		type: 'first',
	},
	{
		text: <>커뮤니케이션 능력</>,
		sub: (
			<>
				유연한 사고 방식으로 다양한 직군과의 <br />
				원활한 커뮤니케이션 능력을 갖추신 인재
			</>
		),
		img: '/assets/images/recruit/section1-icon2.svg',
		type: 'second',
	},
	{
		text: <>도전적인</>,
		sub: (
			<>
				어떤 환경에서도 최적의 답을 <br />
				찾을 줄 아는 도전적인 인재
			</>
		),
		img: '/assets/images/recruit/section1-icon3.svg',
		type: 'third',
	},
];

const section2 = [
	{
		text: (
			<>
				전직원 시차출퇴근제 <br /> (유연근무제) 실시
			</>
		),
		sub: (
			<>
				8시/9시/10시 자율적인
				<br className="mb" />
				유연근무제 운영
			</>
		),
		img: '/assets/images/recruit/section2-icon1.svg',
	},
	{
		text: <>자유로운 연차 사용</>,
		sub: (
			<>
				눈치보지 않고 쓰는 <br className="mb" />
				자유로운 연차
			</>
		),
		img: '/assets/images/recruit/section2-icon2.svg',
	},
	{
		text: <>업무는 장비빨</>,
		sub: (
			<>
				업무에만 집중! <br className="mb" />
				최적의 업무 장비 지원
			</>
		),
		img: '/assets/images/recruit/section2-icon3.svg',
	},
	{
		text: <>아낌없는 성장 지원</>,
		sub: (
			<>
				발전하는 iGiS인! <br className="mb" /> 도서비 및 교육비 지원
			</>
		),
		img: '/assets/images/recruit/section2-icon4.svg',
	},
	{
		text: <>점심 식대 제공</>,
		sub: (
			<>
				먹어야 일하죠! <br className="mb" />
				점심 식대 제공
			</>
		),
		img: '/assets/images/recruit/section2-icon5.svg',
	},
	{
		text: <>무제한 간식 및 커피머신 이용</>,
		sub: (
			<>
				당충전 및 카페인충전 필수! <br />
				자유롭게 이용해요
			</>
		),
		img: '/assets/images/recruit/section2-icon6.svg',
	},
	{
		text: (
			<>
				정부지원 <br className="pc" />
				청년내일
				<br className="mb" />
				채움공제 지원
			</>
		),
		sub: (
			<>
				가능한 정부지원 모두 <br className="mb" /> 챙겨드립니다!
			</>
		),
		img: '/assets/images/recruit/section2-icon7.svg',
	},
	{
		text: (
			<>
				특별한
				<br className="mb" /> 날을 위한 지원
			</>
		),
		sub: (
			<>
				명절 선물 및 <br className="mb" />
				경조사비 지급
			</>
		),
		img: '/assets/images/recruit/section2-icon8.svg',
	},
	{
		text: (
			<>
				근로자 <br />
				휴가지원사업 지원
			</>
		),
		sub: (
			<>
				복지포인트로 신나는 <br className="mb" />
				휴가 떠나자!
			</>
		),
		img: '/assets/images/recruit/section2-icon9.svg',
	},
	{
		text: (
			<>
				건물 내 차량 <br />
				주차비 지원
			</>
		),
		sub: <>주차로 스트레스받지 말자! 주차비 지원</>,
		img: '/assets/images/recruit/section2-icon10.svg',
	},
];

const section3_1 = [
	{ img: '/assets/images/recruit/section3-1-icon1.svg', text: '입사지원' },
	{ img: '/assets/images/recruit/section3-1-icon2.svg', text: '서류전형' },
	{ img: '/assets/images/recruit/section3-1-icon3.svg', text: '1차 실무진 면접' },
	{ img: '/assets/images/recruit/section3-1-icon4.svg', text: '2차 임원 면접' },
	{ img: '/assets/images/recruit/section3-1-icon5.svg', text: '최종 합격' },
];

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
				setJob(snap.exists() ? ({ id: snap.id, ...(snap.data() as Omit<RecruitDoc, 'id'>) } as RecruitDoc) : null);
			} catch (e) {
				setErr(e instanceof Error ? e.message : String(e));
			} finally {
				setLoading(false);
			}
		})();
	}, [id]);

	if (loading)
		return (
			<section className="content-box">
				<p>불러오는 중…</p>
			</section>
		);
	if (err)
		return (
			<section className="content-box">
				<p style={{ color: 'crimson' }}>에러: {err}</p>
			</section>
		);
	if (!job)
		return (
			<section className="content-box">
				<p>공고를 찾을 수 없습니다.</p>
			</section>
		);

	const title = job.title ?? job.work ?? '(제목 없음)';
	const status = getRecruitStatus(job.period);
	const periodLabel = getPeriodLabel(job.period);

	return (
		<main className="RecrultmentDetail">
			{/* 상단 타이틀 영역 */}
			<div className="title-section"></div>

			{/* 상단 배경 / 슬로건 */}
			<div className="background-section">
				<div className="logo">
					<img src="/assets/images/logo.svg" alt="IGIS" />
				</div>
				<div className="text">
					우리가 가면 길이 됩니다 <br />
					<span>아이지아이에스와 동행할 인재를 찾습니다</span>
				</div>
				<div className="line" />
			</div>

			{/* 회사/복지 소개 (정적인 영역) */}
			<div className="section1">
				<div className="tag-wrapper">
					<div className="tag-section">
						{tagText.map((item, idx) => (
							<div key={idx} className={`tag ${item.type}`}>
								{item.text}
							</div>
						))}
					</div>

					<div className="text-section">
						(주)아이지아이에스는 ICT 전문기업으로{' '}
						<span>
							공간정보 솔루션과 <br />
							드론 솔루션을 개발하여 공공 및 민간에 솔루션을 제공
						</span>
						하고 있습니다.
						<br />
						<br className="mb" />
						<br className="mb" />
						공간정보기술과 드론 기술의 노하우를 바탕으로 재난 재해 분야, 건설, 토목,
						<br />
						환경, 측량 등 다양한 분야에 적용이 가능한 범용 솔루션입니다
						<br />
						<br className="mb" />
						<br className="mb" />
						<br />
						현재 개발된 솔루션은 미국, 베트남, 호주 등 제품 적용을 위한
						<br />
						협의가 진행중에 있으며, 이를 바탕으로{' '}
						<span>
							ODA 사업을 추진하여
							<br /> 사업 영역을 확장해
						</span>{' '}
						나갈 계획입니다.
						<br className="mb" />
						<br className="mb" />
						<br />
						<br />
						축적된 현장 적용 경험과 기술 노하우를 기반으로{' '}
						<span>
							4차 산업혁명 시대를 <br />
							선도하고, 국가 첨단 산업 분야에 기여하
						</span>
						고자 합니다.
					</div>
				</div>

				<div className="section1-sub-wrapper">
					<div className="title-section">
						<div className="title">우리는 이런 인재를 찾습니다</div>
						<div className="sub">
							아이지아이에스와 함께 더 높게
							<br />
							성장하실 인재를 모십니다
						</div>
					</div>

					<div className="content-section">
						{section1.map((item, idx) => (
							<div key={idx} className="box">
								<div className="img">
									<img src={item.img} alt="" />
								</div>
							</div>
						))}
					</div>

					<div className="content-text">
						{section1.map((item, idx) => (
							<div key={idx} className={`box ${item.type}`}>
								<div className="text">{item.text}</div>
								<div className="sub">{item.sub}</div>
							</div>
						))}
					</div>
				</div>

				<div className="igis">
					<img src="/assets/images/recruit/igis.svg" alt="background logo" />
				</div>
			</div>

			{/* 복지/혜택 그리드 */}
			<div className="section2">
				<div className="transparent" />
				<div className="title">
					내일 더 성장할 <br />
					인재를 위해 지원합니다
				</div>

				<div className="section2-content">
					{section2.map((item, idx) => (
						<div key={idx} className="box">
							<div className="text-wrapper">
								<div className="text">{item.text}</div>
								<div className="sub">{item.sub}</div>
							</div>
							<div className="img">
								<img src={item.img} alt="" />
							</div>
						</div>
					))}
				</div>
			</div>

			{/* 사내 환경 + 이번 공고 상세 */}
			<div className="section3">
				<div className="back-icon left">
					<img src="/assets/images/recruit/igis-back.svg" alt="" />
				</div>
				<div className="back-icon right">
					<img src="/assets/images/recruit/igis-back.svg" alt="" />
				</div>

				<div className="title">쾌적한 근무환경</div>

				{/* 사진 그리드 – 이미지 이름은 폴더 기준으로 맞춰둠 */}
				<div className="section3-content">
					<div className="top">
						<div className="left">
							<img src="/assets/images/recruit/section3-img1.png" alt="" className="item1" />
							<img src="/assets/images/recruit/section3-img3.png" alt="" className="item3" />
						</div>
						<div className="right">
							<img src="/assets/images/recruit/section3-img2.png" alt="" className="item2" />
							<img src="/assets/images/recruit/section3-img4.png" alt="" className="item4" />
						</div>
					</div>

					<div className="bottom top">
						<div className="left">
							<img src="/assets/images/recruit/section3-img5.png" alt="" className="item5" />
							<img src="/assets/images/recruit/section3-img7.png" alt="" className="item7" />
						</div>
						<div className="right">
							<img src="/assets/images/recruit/section3-img6.png" alt="" className="item6" />
							<img src="/assets/images/recruit/section3-img8.png" alt="" className="item8" />
						</div>
					</div>
				</div>

				{/* 근무조건 / 채용절차 – Firestore 데이터 연결 */}
				<div className="section3-1">
					<div className="title-wrapper">
						<div className="title">
							아이지아이에스의 <br />
							소중한 팀원을 기다립니다
						</div>
						<div className="sub">
							지원해 주시는 모든 분의 서류를 신중하게 살펴보겠습니다. <br />
							아이지아이에스와 오래 함께할 소중한 팀원을 기다립니다.
						</div>
					</div>

					<div className="section3-1-content">
						<div className="top">
							<div className="title">근무조건</div>
							<div className="sub">{job.condition ? job.condition : '상세 근무조건은 문의 시 안내드립니다.'}</div>
						</div>

						<div className="bottom top">
							<div className="title">채용절차</div>
							<div className="sub">
								· 제출 서류 : 경력기술이 포함 된 이력서, 포트폴리오 <br />
								· 절차 변동 시 유선상으로 사전에 안내를 드립니다. <br />· 허위사실이 발견될 경우 채용이 취소될 수 있습니다.
							</div>

							<div className="order">
								{section3_1.map((item, idx) => (
									<div key={idx} className="box">
										<div className="img">
											<img src={item.img} alt="" />
										</div>
										<div className="text">{item.text}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				<a className="section3-btn" href="https://www.saramin.co.kr/zf_user/company-info/view?csn=R0pGcVlEVVZkOE8wa2xaZDBHdDVVZz09" target="_blank" rel="noreferrer">
					채용사이트 바로가기
				</a>

				{/* 이번 공고 상세 내용 – Firestore 데이터 바인딩 */}
				<div className="section3-2">
					<div className="title">
						아이지아이에스는 <br /> 현재 {status === '채용중' ? '채용중 입니다' : '해당 공고 채용이 마감되었습니다'}
					</div>
					<div className="content">
						<div className="top">
							<span className="recruit-job-title">{title}</span>
						</div>

						<div className="bottom">
							<div className="text-section">
								<div className="box">
									<div className="title">이런 일을 하게 됩니다</div>
									<div className="sub">{job.work}</div>
								</div>
								<div className="box">
									<div className="title">이런 분을 찾고 있습니다.</div>
									<div className="sub">{job.find}</div>
								</div>
								<div className="box">
									<div className="title">이런 경험과 역량을 보유하시면 더 좋습니다.</div>
									<div className="sub">{job.experience}</div>
								</div>
								<div className="box">
									<div className="title">접수기간</div>
									<div className="sub">{periodLabel || '상세 접수기간은 별도 공지'}</div>
								</div>
							</div>

							<p className="recruit-back" style={{ marginTop: 32 }}>
								<Link to="/community/recruitment">목록</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default RecruitDetail;
