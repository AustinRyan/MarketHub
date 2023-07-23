import "./globals.css";
import { Inter } from "next/font/google";
import TopNavbar from "./components/TopNavbar";
import SideNavbar from "./components/SideNavbar";
import Provider from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";

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
		<html
			lang="en"
			data-theme="dark"
		>
			<body className={inter.className}>
				<div className="max-w-screen-lg max-h-screen"></div>
				<Provider>
					<ToasterContext />
					<TopNavbar />

					{children}
				</Provider>
			</body>
		</html>
	);
}
