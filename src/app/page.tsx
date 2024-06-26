'use client';

import { useEffect, useState } from 'react';

export default function Home() {
	const [host, setHost] = useState('');
	const [url, setUrl] = useState('');
	const [shortLink, setShortLink] = useState('');

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		try {
			const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
			const response = await fetch(`/api/link`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ url }),
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const result = await response.json();
			const fullShortLink = `${result.data.shortLink}`;
			setShortLink(fullShortLink);
			setHost(baseUrl);
		} catch (error: any) {
			console.log('Error in POST /api/link: ', error.message);
		}
	};

	const handleChange = (event: any) => {
		setUrl(event.target.value);
	};

	const prewarmingConnection = async () => {
		try {
			await fetch('/api/prewarming');
		} catch (error: any) {
			console.log('Error in prewarmingConnection: ', error.message);
		}
	};

	useEffect(() => {
		prewarmingConnection();
		setHost(window.location.host);
	}, []);

	return (
		<div className="h-screen w-screen flex justify-center items-center">
			<div className="h-fit w-fit p-8 bg-white shadow-lg rounded-lg outline outline-gray-200">
				<h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Shortener Link</h1>
				<form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
					<input
						type="text"
						placeholder="Enter your link"
						value={url}
						onChange={handleChange}
						className="border border-gray-300 rounded-md p-2 w-72 mb-4 focus:outline-none focus:border-blue-500"
					/>
					<button
						className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 mt-2 w-full font-semibold"
						type="submit"
					>
						Submit
					</button>
				</form>
				{shortLink && (
					<div className="mt-4 p-4 bg-blue-100 text-blue-700 rounded-md w-full text-center">
						<p>Shortened Link:</p>
						<a
							href={`${shortLink}`}
							className="text-blue-500 hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							{`${host}/${shortLink}`}
						</a>
					</div>
				)}
			</div>
		</div>
	);
}
