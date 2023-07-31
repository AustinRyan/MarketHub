"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Search from "./Search";
import { useSession, signOut } from "next-auth/react";

interface Stock {
	ticker: string;
	stockFullName: string;
}

export default function TopNavbar() {
	const [search, setSearch] = useState(" ");
	const handleSearch = (value: string) => {
		setSearch(value);
		console.log(search);
	};
	const session = useSession();
	const [stocks, setStocks] = useState<Stock[]>([]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (session?.status === "authenticated") {
				fetch("/api/get-watchlist", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"User-Email": session.data.user.email,
					},
				})
					.then((response) => response.json())
					.then((data) => setStocks(data))
					.catch((error) => console.error("Error:", error));
			}
		}, 2000);

		return () => clearInterval(interval); // cleanup on unmount
	}, [session]);

	return (
		<div className="navbar bg-base-200 flex justify-center ">
			<div className="navbar-start">
				{session?.status !== "authenticated" && (
					<>
						<Link href={"/login"}>
							<button className="btn btn-ghost rounded-btn">Login</button>
						</Link>
						<Link href={"/register"}>
							<button className="btn btn-ghost rounded-btn">
								Create an Account
							</button>
						</Link>
					</>
				)}
				{session?.status === "authenticated" && (
					<div className="dropdown dropdown-right">
						<label
							tabIndex={0}
							className="btn btn-ghost rounded-btn"
						>
							My Watchlist
						</label>
						<ul
							tabIndex={0}
							className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4 "
						>
							{stocks.length > 0 ? (
								stocks?.map((stock, index) => (
									<li key={index}>
										<Link href={`/stocks/${stock.ticker}`}>{stock.ticker}</Link>
									</li>
								))
							) : (
								<li>
									<a>No items in watchlist.</a>
								</li>
							)}
						</ul>
					</div>
				)}
			</div>
			<div className="navbar-center ">
				<Link
					href={"#"}
					className="btn btn-ghost normal-case text-xl"
				>
					Home
				</Link>
			</div>
			<div className="navbar-end">
				<Search isNav={true} />
				{session?.status === "authenticated" && (
					<button
						className="btn btn-ghost rounded-btn"
						onClick={() => signOut()}
					>
						Logout
					</button>
				)}
			</div>
			<div className="md:hidden flex-grow"></div>{" "}
		</div>
	);
}
