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
			{/* <div className="  ">
        <SideNavbar />
      </div> */}
			<Hero />
		</main>
	);
}
//TODO: Add no-cache to api calls, so that the data is always fresh
//TODO: Add Recent IPO's to the hero section
//TODO: Add functionality to search for stocks
//TODO: Add functionality for navbar
//TODO: Add nextAuth for authentication????????
//TODO: If adding nextAuth, add functionality for users to save stocks to their watchlist
