import getStockSummary from "@/lib/getStockSummary";
type Params = {
	ticker: string;
};

export default async function RenderAnalyticsAndData({ ticker }: Params) {
	const _stockData = await getStockSummary(ticker);
	const stockData = await _stockData;

	return (
		<div className="grid sm:grid-cols-1 md:grid-cols-2 grid-rows-auto gap-4 p-3 w-1/3 border-r-2 border-black">
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Market Cap</span>
				<span className="font-bold">
					{stockData.price.marketCap.fmt
						? stockData.price.marketCap.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Revenue (ttm)</span>
				<span className="font-bold">
					{stockData?.financialData?.totalRevenue?.fmt
						? stockData.financialData.totalRevenue.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Net Income (ttm)</span>
				<span className="font-bold">
					{stockData.defaultKeyStatistics.netIncomeToCommon.fmt
						? stockData.defaultKeyStatistics.netIncomeToCommon.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Shares Out</span>
				<span className="font-bold">
					{stockData.defaultKeyStatistics.sharesOutstanding.fmt
						? stockData.defaultKeyStatistics.sharesOutstanding.fmt
						: "N/A"}{" "}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>EPS (ttm)</span>
				<span className="font-bold">
					{stockData.defaultKeyStatistics.trailingEps.fmt
						? stockData.defaultKeyStatistics.trailingEps.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Ebitda Margins</span>
				<span className="font-bold">
					{stockData.financialData.ebitdaMargins.fmt
						? stockData.financialData.ebitdaMargins.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Profit Margins</span>
				<span className="font-bold">
					{stockData.financialData.profitMargins.fmt
						? stockData.financialData.profitMargins.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Operating Cash flow</span>
				<span className="font-bold">
					{stockData.financialData.operatingCashflow.fmt
						? stockData.financialData.operatingCashflow.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Gross Profits</span>
				<span className="font-bold">
					{stockData.financialData.grossProfits.fmt
						? stockData.financialData.grossProfits.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Debt To Equity</span>
				<span className="font-bold">
					{stockData.financialData.debtToEquity.fmt
						? stockData.financialData.debtToEquity.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Open</span>
				<span className="font-bold">
					{stockData.price.regularMarketOpen.fmt
						? stockData.price.regularMarketOpen.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Previous Close</span>
				<span className="font-bold">
					{stockData.summaryDetail.previousClose.fmt
						? stockData.summaryDetail.previousClose.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Target Low Price</span>
				<span className="font-bold">
					{stockData.financialData.targetLowPrice.fmt
						? stockData.financialData.targetLowPrice.fmt
						: "N/A"}
				</span>
			</div>

			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Target Median Price</span>
				<span className="font-bold">
					{stockData.financialData.targetMedianPrice.fmt
						? stockData.financialData.targetMedianPrice.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Beta</span>
				<span className="font-bold">
					{stockData.summaryDetail.beta.fmt
						? stockData.summaryDetail.beta.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Total Cash</span>
				<span className="font-bold">
					{stockData.financialData.totalCash.fmt
						? stockData.financialData.totalCash.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Total Debt</span>
				<span className="font-bold">
					{stockData.financialData.totalDebt.fmt
						? stockData.financialData.totalDebt.fmt
						: "N/A"}
				</span>
			</div>
			<div className="p-1 px-2 rounded-md flex justify-between border-b border-blue-100 border-1">
				<span>Total Revenue</span>
				<span className=" font-bold">
					{stockData.financialData.totalRevenue.fmt
						? stockData.financialData.totalRevenue.fmt
						: "N/A"}
				</span>
			</div>
		</div>
	);
}
