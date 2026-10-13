import { useState } from "react";
import {
  TrendingUp,
  Activity,
  BrainCircuit,
  Search,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";


const marketData = [
  { symbol: "AAPL", name: "Apple Inc.", price: 227.5, change: 2.35 },
  { symbol: "MSFT", name: "Microsoft", price: 415.2, change: 1.42 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 248.75, change: -1.85 },
  { symbol: "NVDA", name: "NVIDIA", price: 142.6, change: 3.21 },
];

const recentPredictions = [
  { symbol: "AAPL", predicted: "$231.40", direction: "Bullish", date: "Today" },
  { symbol: "TSLA", predicted: "$242.80", direction: "Bearish", date: "Today" },
  { symbol: "NVDA", predicted: "$148.20", direction: "Bullish", date: "Yesterday" },
];

const chartPoints = [38, 34, 42, 31, 37, 27, 33, 21, 29, 17, 25, 13, 20, 9, 16];

const directionStyles = {
  Bullish: "bg-emerald-500/10 text-emerald-400",
  Bearish: "bg-rose-500/10 text-rose-400",
};

const panel = "rounded-2xl border border-slate-800 bg-slate-900 p-6";
const demoNote = "mt-4 text-xs text-slate-500";

const linePoints = chartPoints
  .map((y, i) => `${i * (600 / (chartPoints.length - 1))},${y * 4}`)
  .join(" ");

function Dashboard() {
  const [search, setSearch] = useState("");
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [prediction, setPrediction] = useState(null);

  const filteredStocks = marketData.filter((stock) =>
    `${stock.symbol} ${stock.name}`.toLowerCase().includes(search.toLowerCase())
  );

  const stock = marketData.find((item) => item.symbol === selectedStock);

  function selectStock(symbol) {
    setSelectedStock(symbol);
    setPrediction(null);
  }

  function handlePrediction() {
    
    setPrediction({
      symbol: stock.symbol,
      predictedPrice: (stock.price * 1.025).toFixed(2),
      direction: "Bullish",
    });
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest text-indigo-400">
              MARKET OVERVIEW
            </p>
            <h1 className="mt-1 text-3xl font-bold">Dashboard</h1>
            <p className="mt-1 text-slate-400">
              Track the market and explore stock predictions.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-300">
            <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
            Stock Prediction Portal
          </div>
        </header>

        {/* Summary cards */}
        <section className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Stocks tracked", value: "04", note: "Available in this demo", Icon: Activity },
            { label: "Market sentiment", value: "Positive", note: "Illustrative market overview", Icon: TrendingUp },
            { label: "Predictions made", value: "03", note: "Sample prediction history", Icon: BrainCircuit },
          ].map(({ label, value, note, Icon }) => (
            <article key={label} className={panel}>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>{label}</span>
                <Icon size={21} className="text-indigo-400" />
              </div>
              <h2 className="mt-3 text-3xl font-bold">{value}</h2>
              <p className="mt-1 text-sm text-slate-500">{note}</p>
            </article>
          ))}
        </section>

        {/* Chart + prediction */}
        <section className="grid gap-6 lg:grid-cols-5">
          {/* Chart panel */}
          <article className={`${panel} lg:col-span-3`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Stock price overview</h2>
                <p className="text-sm text-slate-400">
                  {stock.name} ({stock.symbol})
                </p>
              </div>

              <select
                value={selectedStock}
                onChange={(event) => selectStock(event.target.value)}
                aria-label="Select stock"
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                {marketData.map((item) => (
                  <option key={item.symbol} value={item.symbol}>
                    {item.symbol}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <strong className="text-4xl font-bold">${stock.price.toFixed(2)}</strong>
              <span
                className={`text-sm font-medium ${
                  stock.change >= 0 ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {stock.change >= 0 ? "+" : ""}
                {stock.change}% today
              </span>
            </div>

            <div className="mt-4 h-56 w-full overflow-hidden rounded-xl bg-slate-950/50">
              <svg
                viewBox="0 0 600 220"
                preserveAspectRatio="none"
                role="img"
                aria-label="Illustrative stock price trend"
                className="h-full w-full"
              >
                <defs>
                  <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity=".32" />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {[40, 85, 130, 175].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="600"
                    y2={y}
                    stroke="#29344a"
                    strokeDasharray="5 5"
                  />
                ))}

                <polygon points={`0,220 ${linePoints} 600,220`} fill="url(#chartFill)" />

                <polyline
                  points={linePoints}
                  fill="none"
                  stroke="#818cf8"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

            <div className="mt-2 flex justify-between text-xs text-slate-500">
              <span>9:00 AM</span>
              <span>11:00 AM</span>
              <span>1:00 PM</span>
              <span>3:00 PM</span>
            </div>

            <p className={demoNote}>Illustrative chart — not live market data.</p>
          </article>

          {/* Prediction panel */}
          <article className={`${panel} lg:col-span-2`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Stock prediction</h2>
                <p className="text-sm text-slate-400">
                  Explore a forecast for a selected stock.
                </p>
              </div>
              <BrainCircuit size={23} className="text-indigo-400" />
            </div>

            <label htmlFor="stock-search" className="mt-5 block text-sm text-slate-300">
              Search stocks
            </label>
            <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-3 focus-within:ring-2 focus-within:ring-indigo-400">
              <Search size={18} className="text-slate-400" />
              <input
                id="stock-search"
                placeholder="Search symbol or company"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full bg-transparent py-2.5 text-sm placeholder:text-slate-500 focus:outline-none"
              />
            </div>

            <div className="mt-4 space-y-2">
              {filteredStocks.map((item) => (
                <button
                  key={item.symbol}
                  onClick={() => selectStock(item.symbol)}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                    selectedStock === item.symbol
                      ? "border-indigo-400 bg-indigo-500/10"
                      : "border-slate-800 bg-slate-800/40 hover:border-slate-600"
                  }`}
                >
                  <span className="flex flex-col">
                    <strong className="text-sm">{item.symbol}</strong>
                    <small className="text-xs text-slate-400">{item.name}</small>
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      item.change >= 0 ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {item.change >= 0 ? "+" : ""}
                    {item.change}%
                  </span>
                </button>
              ))}

              {filteredStocks.length === 0 && (
                <p className="text-xs text-slate-500">No matching stocks found.</p>
              )}
            </div>

            <button
              onClick={handlePrediction}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-400 active:scale-[.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
            >
              <BrainCircuit size={18} />
              Generate prediction
            </button>

            {prediction && (
              <div className="mt-4 rounded-xl border border-indigo-400/30 bg-indigo-500/10 p-4">
                <span className="text-xs text-indigo-300">Demonstration forecast</span>
                <h3 className="mt-1 text-3xl font-bold">${prediction.predictedPrice}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-emerald-400">
                  <TrendingUp size={16} />
                  {prediction.direction} outlook for {prediction.symbol}
                </p>
                <small className="mt-2 block text-xs text-slate-400">
                  This is a placeholder calculation, not an actual model prediction.
                </small>
              </div>
            )}
          </article>
        </section>

        {/* Recent predictions */}
        <section className={panel}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Recent predictions</h2>
              <p className="text-sm text-slate-400">Your latest prediction records.</p>
            </div>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
              3 records
            </span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-slate-400">
                  <th className="px-4 py-3 font-medium">Stock</th>
                  <th className="px-4 py-3 font-medium">Predicted price</th>
                  <th className="px-4 py-3 font-medium">Direction</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              
              <tbody>
                {recentPredictions.map((item) => (
                  <tr
                    key={item.symbol}
                    className="border-t border-slate-800 transition hover:bg-slate-800/40"
                  >
                    <td className="px-4 py-3">
                      <strong>{item.symbol}</strong>
                    </td>
                    <td className="px-4 py-3">{item.predicted}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                          directionStyles[item.direction]
                        }`}
                      >
                        {item.direction === "Bullish" ? (
                          <ArrowUpRight size={15} />
                        ) : (
                          <ArrowDownRight size={15} />
                        )}
                        {item.direction}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className={demoNote}>
            All displayed stock prices and prediction records are sample data.
          </p>
        </section>
      </div>
    </main>
  );
}
export default Dashboard;
