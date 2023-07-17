"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const useRouteChangeLoadingIndicator = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [firstLoad, setFirstLoad] = useState(true);

	useEffect(() => {
		const handleStart = (url: string) => {
			if (url !== router.asPath && !firstLoad) {
				setLoading(true);
			}
		};
		const handleComplete = (url: string) => {
			if (url === router.asPath) {
				setLoading(false);
				setFirstLoad(false);
			}
		};

		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleComplete);
		router.events.on("routeChangeError", handleComplete);

		return () => {
			router.events.off("routeChangeStart", handleStart);
			router.events.off("routeChangeComplete", handleComplete);
			router.events.off("routeChangeError", handleComplete);
		};
	}, [router, firstLoad]);

	return loading;
};

export default useRouteChangeLoadingIndicator;
