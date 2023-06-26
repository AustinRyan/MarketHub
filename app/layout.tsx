import "./globals.css";
import { Inter } from "next/font/google";
import TopNavbar from "./components/TopNavbar";
import SideNavbar from "./components/SideNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Market Analysis",
	description: "Stock market analysis and news",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className=""></div>
				{children}
			</body>
		</html>
	);
}
