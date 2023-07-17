"use client";
import { useEffect, useState, useRef } from "react";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { Suspense } from "react";
import useChartData from "@/lib/getChartDataClient";

// The function below will prevent the changing of interval and ranges if they are changed too quickly
function debounce<F extends (...args: any[]) => any>(
	func: F,
	wait: number
): (...funcArgs: Parameters<F>) => void {
	let timeoutId: NodeJS.Timeout | null;
	return (...args: Parameters<F>): void => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => func(...args), wait);
	};
}
// type for the rangekeys
type RangeKeys =
	| "1d"
	| "5d"
	| "1mo"
	| "3mo"
	| "6mo"
	| "1y"
	| "2y"
	| "5y"
	| "10y"
	| "ytd"
	| "max";
const ranges: Record<RangeKeys, string[]> = {
	"1d": ["1m", "2m", "5m", "15m", "30m", "60m"],
	"5d": ["1m", "2m", "5m", "15m", "30m", "60m", "90m", "1h", "1d"],
	"1mo": ["1d", "5d", "1wk", "1mo", "3mo"],
	"3mo": ["1d", "5d", "1wk", "1mo", "3mo"],
	"6mo": ["1d", "5d", "1wk", "1mo", "3mo"],
	"1y": ["1d", "5d", "1wk", "1mo", "3mo"],
	"2y": ["1d", "5d", "1wk", "1mo", "3mo"],
	"5y": ["1d", "5d", "1wk", "1mo", "3mo"],
	"10y": ["1d", "5d", "1wk", "1mo", "3mo"],
	ytd: ["1d", "5d", "1wk", "1mo", "3mo"],
	max: ["1d", "5d", "1wk", "1mo", "3mo"],
};
// Extending the Window interface to include 'my_modal_1' property.
declare global {
	interface Window {
		my_modal_1: any;
	}
}

export default function StockGraph({ ticker }: { ticker: string }) {
	// State for Interval and Range
	const [interval, setInterval] = useState("1d");
	const [range, setRange] = useState("1y");
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenRange, setIsOpenRange] = useState(false);

	const [selectedItem, setSelectedItem] = useState("");
	const { data, isLoading, isError } = useChartData(ticker, interval, range);

	// Extract data if not loading and no error

	// TODO - refactor this nested if statements
	let historical, dates, closingPrices: any[], data2;
	if (!isLoading && !isError && data) {
		if (data.chart) {
			if (data.chart.result) {
				if (data.chart.result[0]) {
					historical = data.chart.result[0].indicators?.quote[0];
					dates = data.chart.result[0]?.timestamp;
					if (historical) {
						closingPrices = historical.close;
						data2 = dates.map((date: any, index: number) => ({
							date: new Date(date * 1000)?.toLocaleDateString(),
							price: Number(closingPrices[index]?.toFixed(2)),
						}));
					}
				} else {
					console.error("data.chart.result[0] is undefined");
				}
			} else {
				console.error("data.chart.result is undefined");
			}
		} else {
			console.error("data.chart is undefined");
		}
	}
	const modalRef = useRef<null | HTMLDialogElement>(null);

	useEffect(() => {
		if (modalRef.current) {
			window.my_modal_1 = modalRef.current;
		}
	}, []);

	// Function to check if the range and interval are compatible
	const isCompatible = (range: RangeKeys, interval: string): boolean => {
		return ranges[range].includes(interval);
	};
	type RangeKeys =
		| "1d"
		| "5d"
		| "1mo"
		| "3mo"
		| "6mo"
		| "1y"
		| "2y"
		| "5y"
		| "10y"
		| "ytd"
		| "max";

	const getCompatibleInterval = (range: RangeKeys): string => {
		switch (range) {
			case "1d":
				return "5m";
			case "5d":
				return "5m";
			case "1mo":
				return "1h";
			case "3mo":
				return "4h";
			case "6mo":
				return "1d";
			case "1y":
				return "2d";
			case "2y":
				return "1wk";
			case "5y":
				return "2wk";
			case "10y":
				return "1mo";
			case "ytd":
				return "1wk";
			case "max":
				return "1mo";
			default:
				return "1m";
		}
	};

	// Function to handle the change in interval
	// If the combination is not compatible, it will show a modal
	const handleIntervalChange = (item: string) => {
		if (item in ranges && isCompatible(range as RangeKeys, item)) {
			setInterval(item);
		} else {
			modalRef.current?.showModal();
		}
		setIsOpen(false);
	};

	const handleRangeChange = (value: string) => {
		// If the range-interval combination is not compatible, adjust the interval
		if (!isCompatible(value as RangeKeys, interval)) {
			// Get a compatible interval for the selected range
			const newInterval = getCompatibleInterval(value as RangeKeys);

			setInterval(newInterval);
		}

		setRange(value);

		setIsOpen(false);
	};

	// Debouncing the handleIntervalChange and handleRangeChange functions
	const debouncedHandleIntervalChange = debounce(handleIntervalChange, 300);
	const debouncedHandleRangeChange = debounce(handleRangeChange, 300);
	return (
		<div className="w-full h-[50vh] mb-14  ">
			<div className="w-full h-full">
				<div className="dropdown dropdown-top">
					<label
						onClick={() => setIsOpen(!isOpen)}
						tabIndex={0}
						className="btn m-1"
					>
						{"Interval: " + interval}
					</label>
					{isOpen && (
						<ul
							tabIndex={0}
							className="dropdown-content menu p-2 shadow bg-base-100 rounded-box max-h-60 w-60"
						>
							<li onClick={() => debouncedHandleIntervalChange("1m")}>
								<a>1 minute</a>
							</li>
							<li onClick={() => debouncedHandleIntervalChange("2m")}>
								<a>2 minutes</a>
							</li>
							<li onClick={() => debouncedHandleIntervalChange("5m")}>
								<a>5 minutes</a>
							</li>
							<li onClick={() => debouncedHandleIntervalChange("15m")}>
								<a>15 minutes</a>
							</li>
							<li onClick={() => debouncedHandleIntervalChange("30m")}>
								<a>30 minutes</a>
							</li>
							<li onClick={() => debouncedHandleIntervalChange("60m")}>
								<a>60 minutes</a>
							</li>
							<li onClick={() => debouncedHandleIntervalChange("1d")}>
								<a>1 day</a>
							</li>
							<li onClick={() => debouncedHandleIntervalChange("1wk")}>
								<a>1 week</a>
							</li>
							<li onClick={() => debouncedHandleIntervalChange("1mo")}>
								<a>1 month</a>
							</li>
						</ul>
					)}
				</div>
				<div className="dropdown dropdown-top">
					<label
						tabIndex={0}
						className="btn m-1"
						onClick={() => setIsOpen(!isOpenRange)}
					>
						{"Range: " + range}
					</label>
					{isOpen && (
						<ul
							tabIndex={0}
							className="dropdown-content menu p-2 shadow bg-base-100 rounded-box max-h-60 w-60"
						>
							<li onClick={() => debouncedHandleRangeChange("1d")}>
								<a>1 day</a>
							</li>
							<li onClick={() => debouncedHandleRangeChange("5d")}>
								<a>5 days</a>
							</li>
							<li onClick={() => debouncedHandleRangeChange("1mo")}>
								<a>1 month</a>
							</li>
							<li onClick={() => debouncedHandleRangeChange("3mo")}>
								<a>3 months</a>
							</li>
							<li onClick={() => debouncedHandleRangeChange("6mo")}>
								<a>6 months</a>
							</li>
							<li onClick={() => debouncedHandleRangeChange("1y")}>
								<a>1 year</a>
							</li>
							<li onClick={() => debouncedHandleRangeChange("2y")}>
								<a>2 years</a>
							</li>
							<li onClick={() => debouncedHandleRangeChange("5y")}>
								<a>5 years</a>
							</li>
							<li onClick={() => debouncedHandleRangeChange("10y")}>
								<a>10 years</a>
							</li>
							<li onClick={() => debouncedHandleRangeChange("ytd")}>
								<a>Year to date</a>
							</li>
							<li onClick={() => debouncedHandleRangeChange("max")}>
								<a>Max</a>
							</li>
						</ul>
					)}
				</div>
				{isLoading ? (
					<div className=" flex items-center justify-center">
						<progress className="progress w-96 mt-10"></progress>
					</div>
				) : (
					<ResponsiveContainer>
						<LineChart data={data2}>
							<Line
								type="monotone"
								dataKey="price"
								stroke="#8884d8"
								dot={false}
							/>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis
								dataKey="date"
								interval="preserveEnd"
							/>
							<YAxis />
							<Tooltip />
						</LineChart>
					</ResponsiveContainer>
				)}
			</div>
			<dialog
				ref={modalRef}
				id="my_modal_1"
				className="modal"
			>
				<form
					method="dialog"
					className="modal-box"
				>
					<h3 className="font-bold text-lg">
						Invalid range and interval combination!
					</h3>
					<p className="py-4">
						The range and interval selected are not compatible. Please select a
						different combination.
					</p>
					<div className="modal-action">
						<button className="btn">Close</button>
					</div>
				</form>
			</dialog>
		</div>
	);
}
