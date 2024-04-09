import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryProvider from './query-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'S3 Bucket Explorer',
	description: 'Explore the contents of an S3 bucket'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	);
}
