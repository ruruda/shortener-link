/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${process.env.NEXT_PUBLIC_VERCEL_URL}//:path*`,
			},
		];
	},
	compiler: {
		styledComponents: true,
	},
};

export default nextConfig;
