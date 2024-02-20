"use client";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

function BugNotification() {
	useEffect(() => {
		// Check if the toast has been shown in this session
		if (!sessionStorage.getItem("toastShown")) {
			toast.custom(
				(t) => (
					<div
						className={`${
							t.visible ? "animate-enter" : "animate-leave"
						} max-w-md w-full bg-yellow-600 text-white shadow-lg rounded-lg pointer-events-auto`}
					>
						<div className="rounded-lg shadow-xs overflow-hidden">
							<div className="p-4">
								<div className="flex items-start">
									<div className="flex-shrink-0">{/* Icon */}</div>
									<div className="ml-3 w-0 flex-1">
										<p className="text-sm leading-5 font-medium">
											{
												"Heads Up! Due to API rate limits and costs, I'm using the free plan for the Yahoo Finance API, which may reach its limit, resulting in occasional data update restrictions. Thank you for your understanding!"
											}
										</p>
									</div>
									<div className="ml-4 flex-shrink-0 flex">
										<button
											onClick={() => toast.dismiss(t.id)}
											className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150 bg-white px-2 py-1 rounded text-black"
										>
											Dismiss
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				),
				{
					duration: 10000,
				}
			);

			// Mark the toast as shown for this session
			sessionStorage.setItem("toastShown", "true");
		}
	}, []);

	return null;
}

export default BugNotification;
