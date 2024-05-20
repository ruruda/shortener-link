'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ShortLinkPage() {
	const { shortLink } = useParams();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (shortLink) {
			const fetchData = async () => {
				try {
					const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
					const response = await fetch(`${baseUrl}/api/link/${shortLink}`);
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					const result = await response.json();
					if (!result.data) {
						window.location.href = `${baseUrl}`;
					}
					const longLink = result.data.longLink;

					if (!/^https?:\/\//i.test(longLink)) {
						window.location.href = 'http://' + longLink;
					} else {
						window.location.href = longLink;
					}
				} catch (error: any) {
					setError(error.message);
				} finally {
					setLoading(false);
				}
			};

			fetchData();
		}
	}, [shortLink]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;
	return (
		<div>
			<h1>Redirecting...</h1>
		</div>
	);
}
