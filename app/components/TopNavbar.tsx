"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function TopNavbar() {
	const [search, setSearch] = useState(" ");
	const handleSearch = (value: string) => {
		setSearch(value);
		console.log(search);
	};

	return (
		<div className="navbar bg-base-200 flex justify-center ">
			<div className="navbar-center ">
				<Link
					href={"#"}
					className="btn btn-ghost normal-case text-xl"
				>
					Home
				</Link>
			</div>

			{/* 
			Wanted to add search bar to the navigation
			But since the nav bar lives in layout.js and not in the pages,
			we can't use useRouter() hook to redirect to the search page
			
		*/}

			{/* <div className="navbar-end">
				<div className="form-control ">
					<input
						type="text"
						placeholder="Search"
						className="input input-bordered w-full md:w-auto" // full width on mobile, auto width on monitors and laptops
						onChange={(e) => handleSearch(e.target.value)}
						value={search}
					/>
				</div>
				<button className="btn btn-ghost btn-circle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>
				<button className="btn btn-ghost btn-circle">
					<div className="indicator">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
							/>
						</svg>
						<span className="badge badge-xs badge-primary indicator-item"></span>
					</div>
				</button>
			</div>
			<div className="md:hidden flex-grow"></div>{" "} */}
			{/* force navbar-center to the center on mobile */}
		</div>
	);
}
