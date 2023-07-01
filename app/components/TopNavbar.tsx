"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Search from "./Search";
import { useSession } from "next-auth/react";

export default function TopNavbar() {
	const [search, setSearch] = useState(" ");
	const handleSearch = (value: string) => {
		setSearch(value);
		console.log(search);
	};
	const session = useSession();

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
							className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
						>
							<li>
								<a>Item 1</a>
							</li>
							<li>
								<a>Item 2</a>
							</li>
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
	);
}
