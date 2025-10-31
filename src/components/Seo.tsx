// src/components/Seo.tsx
import { Helmet } from 'react-helmet-async';

type Props = {
	title?: string;
	description?: string;
	url?: string;
	image?: string;
	canonical?: string;
	locale?: 'ko_KR' | 'en_US';
};

export default function Seo({ title = 'IGIS', description = 'IGIS | 회사 소개와 솔루션 소식', url = 'https://igis-test-web.web.app', image = '/og-default.jpg', canonical, locale = 'ko_KR' }: Props) {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			{canonical && <link rel="canonical" href={canonical} />}

			<meta property="og:locale" content={locale} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />
			<meta property="og:url" content={url} />

			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={image} />
		</Helmet>
	);
}
