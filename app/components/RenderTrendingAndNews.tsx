import React from "react";
import RenderTables from "./RenderTables";
import RenderNews from "./RenderNews";
import RenderCryptoNews from "./RenderCryptoNews";

type Mover = {
	name: string;
	ticker: string;
	percentNetChange: number;
};
type NewsItem = {
	previewUrl?: string | undefined;
	id: string;
	contentType: string;
	title: string;
	pubDate: string;
	thumbnail: {
		resolutions: {
			url: string;
			width: number;
			height: number;
			tag: string;
		}[];
	};
	clickThroughUrl?: {
		url?: string;
	};
	provider: {
		displayName: string;
	};
	finance: {
		stockTickers:
			| {
					symbol: string;
			  }[]
			| null;
	};
};

type RenderTrendingAndNewsType = {
	gainer: Mover[];
	loser: Mover[];
};

export default async function RenderTrendingAndNews({
	gainer,
	loser,
}: RenderTrendingAndNewsType) {
	return (
		<div className="grid grid-cols-2 gap-4 mb-4">
			<div className="flex flex-col items-center justify-center rounded bg-base-100 min-h-28 dark:bg-gray-800 p-2">
				<p className="text-2xl font-bold font-mono text-gray-500  ">
					Top Gainers 🔥
				</p>
				<div className=" w-full">
					{await (
						<RenderTables
							data={gainer}
							isLoser={false}
						/>
					)}
				</div>
				<hr className="border-t w-full border-gray-500" />
			</div>

			<div className="flex flex-col items-center justify-center rounded bg-base-100 min-h-28 dark:bg-gray-800 p-2">
				<p className="text-2xl font-bold font-mono text-gray-500 ">
					Top Losers 🥶
				</p>

				<div className=" w-full">
					{await (
						<RenderTables
							data={loser}
							isLoser={true}
						/>
					)}
				</div>
				<hr className="border-t w-full border-gray-500" />
			</div>

			<div className="flex justify-center rounded bg-base-100 h-60 dark:bg-gray-800 flex-grow min-h-screen  ">
				<div className="w-full ">
					<p className="text-2xl font-bold font-mono text-gray-500 mb-2  text-center p-2">
						Market News
					</p>
					{await (<RenderNews />)}
				</div>
			</div>

			<div className="flex justify-center rounded bg-base-100 h-60 dark:bg-gray-800 flex-grow min-h-screen">
				<div className="w-full">
					<p className="text-2xl font-bold font-mono text-gray-500 mb-2  text-center p-2">
						Crypto News
					</p>
					{await (<RenderCryptoNews />)}
				</div>
			</div>
		</div>
	);
}
