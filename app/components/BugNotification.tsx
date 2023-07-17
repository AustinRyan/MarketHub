"use client";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

function BugNotification() {
	useEffect(() => {
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
											'Due API rate limits, you may experience some delays or "Too Many Requests" errors when navigating to a stock page. I am actively working on a solution. If you run into this error please try again in a few minutes.'
										}
									</p>
								</div>
								<div className="ml-4 flex-shrink-0 flex">
									<button
										onClick={() => toast.dismiss(t.id)}
										className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
									>
										{/* Dismiss button */}
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
	}, []);

	return null;
}

export default BugNotification;
