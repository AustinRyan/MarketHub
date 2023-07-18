"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Search from "./Search";
import { useSession, signOut } from "next-auth/react";
import SideNavbar from "./SideNavbar";

interface Stock {
	ticker: string;
	stockFullName: string;
}
export default function TopNavbar() {
	const [isSideNavbarOpen, setIsSideNavbarOpen] = useState(false);
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

		return () => clearInterval(interval);
	}, [session]);

	return (
		<>
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
						<div className="flex flex-row">
							<div className="drawer">
								<input
									id="my-drawer"
									type="checkbox"
									className="drawer-toggle"
								/>
								<div className="drawer-content">
									<label
										htmlFor="my-drawer"
										className="btn btn-ghost rounded-btn"
									>
										My Account
									</label>
								</div>
								<div className="drawer-side z-50">
									<label
										htmlFor="my-drawer"
										className="drawer-overlay"
									></label>
									<ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
										<li>
											<a onClick={() => signOut({ callbackUrl: "/" })}>
												Log out
											</a>
										</li>
									</ul>
								</div>
							</div>
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
												<Link href={`/stocks/${stock.ticker}`}>
													{stock.ticker}
												</Link>
											</li>
										))
									) : (
										<li>
											<a>No items in watchlist</a>
										</li>
									)}
								</ul>
							</div>
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
					{/* <div className="form-control ">
        <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full md:w-auto" // full width on mobile, auto width on monitors and laptops
            onChange={(e) => handleSearch(e.target.value)}
            value={search}
        />
    </div> */}
					<Search isNav={true} />
				</div>
				<div className="md:hidden flex-grow"></div>{" "}
			</div>
		</>
	);
}
