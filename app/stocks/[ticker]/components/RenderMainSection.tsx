import StockGraph from "./StockGraph";
import RenderAnalyticsAndData from "./RenderAnalyticsAndData";
import RenderStockNews from "./RenderStockNews";

type Params = {
	ticker: string;
};
export default async function RenderMainSection({ ticker }: Params) {
	return (
		<div className="flex flex-col items-start text-center justify-top rounded bg-base-100 min-h-screen dark:bg-gray-800 p-2 ">
			<div className=" p-2 font-bold ">
				<p className="text-center ">Overview</p>
			</div>

			<div className=" z-10 w-full flex flex-row border-t-2 border-black">
				{await (<RenderAnalyticsAndData ticker={ticker} />)}
				<div className="w-2/3">
					<StockGraph ticker={ticker} />
				</div>
			</div>
			{/* News Section Below */}
			<div className="flex flex-row w-full border-t-2 border-black">
				{await (<RenderStockNews ticker={ticker.toUpperCase()} />)}
			</div>
		</div>
	);
}
