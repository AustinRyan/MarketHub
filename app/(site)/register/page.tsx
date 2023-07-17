"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { set } from "lodash";
import Image from "next/image";

export default function Register() {
	const [data, setData] = useState({ name: "", email: "", password: "" });
	const session = useSession();
	const router = useRouter();
	useEffect(() => {
		if (session?.status === "authenticated") {
			toast.success("You are logged in! Redirecting to home page...");
			setTimeout(() => {
				router.push("/");
			}, 2000);
		}
	}, [session, router]);

	const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		axios
			.post("/api/register", data)
			.then(() => toast.success("Account created successfully!"))
			.catch((err) => {
				toast.error("Something went wrong " + err);
			});
	};
	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						className="mx-auto h-10 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
						alt="Your Company"
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Register for an account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form
						className="space-y-6"
						onSubmit={registerUser}
					>
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Name
							</label>
							<div className="mt-2">
								<input
									id="name"
									name="name"
									type="text"
									value={data.name}
									onChange={(e) => setData({ ...data, name: e.target.value })}
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									value={data.email}
									onChange={(e) => setData({ ...data, email: e.target.value })}
									autoComplete="email"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Password
								</label>
								<div className="text-sm">
									<a
										href="#"
										className="font-semibold text-indigo-600 hover:text-indigo-500"
									>
										Forgot password?
									</a>
								</div>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									value={data.password}
									onChange={(e) =>
										setData({ ...data, password: e.target.value })
									}
									autoComplete="current-password"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Create account
							</button>
						</div>
					</form>
					<div className="mt-10 space-y-6 sm:mx-auto sm:w-full sm:max-w-sm">
						<h2 className="mt-6 text-center text-sm font-medium leading-6 text-gray-900">
							or
						</h2>
						<h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
							Sign into GitHub
						</h1>
						<button
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							onClick={() => signIn("github")}
						>
							Sign in with GitHub
						</button>
						<h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
							Sign into Google
						</h1>
						<button
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							onClick={() => signIn("google")}
						>
							Sign in with Google
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
