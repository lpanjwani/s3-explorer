import { useEffect } from 'react';
import { setBaseUrl } from '../api';

export default function useBaseUrl() {
	useEffect(() => {
		const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'default-url';
		setBaseUrl(baseUrl);
	}, []);
}
