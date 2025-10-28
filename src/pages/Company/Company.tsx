const Company = ({ userAgent }: { userAgent: 'pc' | 'tablet' | 'mb' }) => {
	return <div>회사 소개 페이지 ({userAgent})</div>;
};

export default Company;
