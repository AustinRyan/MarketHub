import React from "react";
import Link from "next/link";

type Mover = {
	name: string;
	ticker: string;
	percentNetChange: number;
};

type CryptoNewsItem = {
	HEADLINE: string;
	news_link: string;
	last_updated: string;
	news_provider_name: string;
	news_summary?: string;
	BODY?: string;
};

type RenderTablesProps = {
	data: Mover[];
	isLoser: boolean;
};

export default async function RenderTables({
	data,
	isLoser,
}: RenderTablesProps) {
	const hotOrColdEmoji = isLoser ? "🥶" : "🔥";
	return (
		<div className="overflow-x-auto w-full py-4">
			<table className="table w-full">
				{/* head */}
				<thead>
					<tr className="hover">
						<th>Ticker</th>
						<th>Name</th>
						<th>Percent Change</th>
					</tr>
				</thead>
				<tbody>
					{(await data).map((movers, index) => (
						<tr
							key={index}
							className="hover"
						>
							<td className="cursor-pointer">
								<Link href={`/stocks/${movers.ticker}`}>{movers.ticker}</Link>
							</td>
							<td className="cursor-pointer">
								<Link href={`/stocks/${movers.ticker}`}>{movers.name}</Link>
							</td>
							<td>
								{movers.percentNetChange.toFixed(2)}% {hotOrColdEmoji}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
