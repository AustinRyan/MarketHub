import Image from "next/image";
import { Inter } from "next/font/google";
import SideNavbar from "./components/SideNavbar";
import Hero from "./components/Hero";
import TopNavbar from "./components/TopNavbar";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<main className="">
			<Hero />
		</main>
	);
}
