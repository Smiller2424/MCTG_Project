type TransactionStatus = "Completed" | "Pending" | "Failed";
type TradeSide = "Buy" | "Sell";

const user = {
  name: "Carter Griffin",
  username: "cartergriffin22",
  email: "cartergriffin22@gmail.com",
  memberSince: "Jan 2026",
  accountType: "Copy Trader",
};

const wallet = {
  walletId: "wallet_8F39A2",
  address: "0xA91B...42F8",
  balance: 2480.75,
  availableBalance: 1340.25,
  activeTradeValue: 1140.5,
  totalDeposited: 3500,
};

const portfolioStats = [
  {
    label: "Portfolio Value",
    value: "$2,480.75",
    detail: "+$310.42 all time",
  },
  {
    label: "Active Copy Trades",
    value: "6",
    detail: "Across 3 traders",
  },
  {
    label: "Total Transactions",
    value: "28",
    detail: "23 completed",
  },
  {
    label: "Available Balance",
    value: "$1,340.25",
    detail: "Ready to allocate",
  },
];

const activeCopies = [
  {
    trader: "ElectionEdge",
    username: "@electionedge",
    copiedSince: "Jun 12, 2026",
    activeTrades: 3,
    allocatedAmount: 600,
    currentValue: 735.2,
    pnl: 135.2,
    strategy: "Politics / election markets",
  },
  {
    trader: "MacroMax",
    username: "@macromax",
    copiedSince: "Jun 18, 2026",
    activeTrades: 2,
    allocatedAmount: 400,
    currentValue: 382.8,
    pnl: -17.2,
    strategy: "Fed / inflation markets",
  },
  {
    trader: "SportsSharp",
    username: "@sportssharp",
    copiedSince: "Jun 22, 2026",
    activeTrades: 1,
    allocatedAmount: 140.5,
    currentValue: 158.5,
    pnl: 18,
    strategy: "Sports prediction markets",
  },
];

const transactions = [
  {
    id: "txn_001",
    date: "2026-06-29",
    traderCopied: "ElectionEdge",
    traderHandle: "@electionedge",
    tradeCopied: "Will Candidate A win the 2028 election?",
    outcome: "Yes",
    side: "Buy" as TradeSide,
    amount: 250,
    shares: 384.62,
    avgPrice: "$0.65",
    status: "Completed" as TransactionStatus,
  },
  {
    id: "txn_002",
    date: "2026-06-28",
    traderCopied: "MacroMax",
    traderHandle: "@macromax",
    tradeCopied: "Will the Fed cut rates by September?",
    outcome: "No",
    side: "Buy" as TradeSide,
    amount: 150,
    shares: 300,
    avgPrice: "$0.50",
    status: "Completed" as TransactionStatus,
  },
  {
    id: "txn_003",
    date: "2026-06-27",
    traderCopied: "SportsSharp",
    traderHandle: "@sportssharp",
    tradeCopied: "Will Atlanta win tonight?",
    outcome: "Yes",
    side: "Buy" as TradeSide,
    amount: 75,
    shares: 125,
    avgPrice: "$0.60",
    status: "Pending" as TransactionStatus,
  },
  {
    id: "txn_004",
    date: "2026-06-24",
    traderCopied: "ElectionEdge",
    traderHandle: "@electionedge",
    tradeCopied: "Will turnout exceed 65%?",
    outcome: "Yes",
    side: "Sell" as TradeSide,
    amount: 120,
    shares: 200,
    avgPrice: "$0.60",
    status: "Completed" as TransactionStatus,
  },
  {
    id: "txn_005",
    date: "2026-06-21",
    traderCopied: "MacroMax",
    traderHandle: "@macromax",
    tradeCopied: "Will CPI come in under expectations?",
    outcome: "No",
    side: "Buy" as TradeSide,
    amount: 200,
    shares: 350.88,
    avgPrice: "$0.57",
    status: "Failed" as TransactionStatus,
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: TransactionStatus }) {
  const styles = {
    Completed: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
    Pending: "bg-yellow-500/10 text-yellow-400 ring-yellow-500/20",
    Failed: "bg-red-500/10 text-red-400 ring-red-500/20",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function PnlText({ value }: { value: number }) {
  const isPositive = value >= 0;

  return (
    <span className={isPositive ? "text-emerald-400" : "text-red-400"}>
      {isPositive ? "+" : ""}
      {formatCurrency(value)}
    </span>
  );
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <section className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/20 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-cyan-400">User Portfolio</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Welcome back, {user.name}
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Track your copied traders, active positions, wallet balance, and
              full transaction history.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Account Type
            </p>
            <p className="mt-1 text-lg font-semibold text-white">
              {user.accountType}
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {portfolioStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-2 text-2xl font-bold text-white">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-slate-500">{stat.detail}</p>
            </div>
          ))}
        </section>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <section className="space-y-8 lg:col-span-1">
            {/* User Info */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-lg font-semibold text-white">
                User Information
              </h2>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-sm text-slate-500">Full Name</p>
                  <p className="font-medium text-slate-100">{user.name}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Username</p>
                  <p className="font-medium text-slate-100">
                    @{user.username}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-medium text-slate-100">{user.email}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Member Since</p>
                  <p className="font-medium text-slate-100">
                    {user.memberSince}
                  </p>
                </div>
              </div>
            </div>

            {/* Wallet Info */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                  Wallet Information
                </h2>
                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400 ring-1 ring-cyan-500/20">
                  Connected
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-sm text-slate-500">Wallet ID</p>
                  <p className="font-mono text-sm text-slate-100">
                    {wallet.walletId}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Wallet Address</p>
                  <p className="font-mono text-sm text-slate-100">
                    {wallet.address}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="rounded-xl bg-slate-950 p-4">
                    <p className="text-xs text-slate-500">Balance</p>
                    <p className="mt-1 font-semibold text-white">
                      {formatCurrency(wallet.balance)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-950 p-4">
                    <p className="text-xs text-slate-500">Available</p>
                    <p className="mt-1 font-semibold text-white">
                      {formatCurrency(wallet.availableBalance)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-950 p-4">
                    <p className="text-xs text-slate-500">In Trades</p>
                    <p className="mt-1 font-semibold text-white">
                      {formatCurrency(wallet.activeTradeValue)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-950 p-4">
                    <p className="text-xs text-slate-500">Deposited</p>
                    <p className="mt-1 font-semibold text-white">
                      {formatCurrency(wallet.totalDeposited)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Right Column */}
          <section className="space-y-8 lg:col-span-2">
            {/* Active Trades */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Active Copied Traders
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Users currently being copied by this account.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {activeCopies.map((copy) => (
                  <article
                    key={copy.username}
                    className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-white">
                          {copy.trader}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {copy.username}
                        </p>
                      </div>

                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20">
                        Active
                      </span>
                    </div>

                    <p className="mt-4 text-sm text-slate-400">
                      {copy.strategy}
                    </p>

                    <div className="mt-5 space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Copied Since</span>
                        <span className="text-slate-200">
                          {copy.copiedSince}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-slate-500">Active Trades</span>
                        <span className="text-slate-200">
                          {copy.activeTrades}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-slate-500">Allocated</span>
                        <span className="text-slate-200">
                          {formatCurrency(copy.allocatedAmount)}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-slate-500">Current Value</span>
                        <span className="text-slate-200">
                          {formatCurrency(copy.currentValue)}
                        </span>
                      </div>

                      <div className="flex justify-between border-t border-slate-800 pt-3">
                        <span className="text-slate-500">P/L</span>
                        <PnlText value={copy.pnl} />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Transactions */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Past Transactions
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    History of copied trades, copied users, amounts, outcomes,
                    and status.
                  </p>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border border-slate-800">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-800">
                    <thead className="bg-slate-950">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                          Trader Copied
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                          Trade Copied
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                          Side
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-slate-500">
                          Amount
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-slate-500">
                          Shares
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-800 bg-slate-900">
                      {transactions.map((transaction) => (
                        <tr
                          key={transaction.id}
                          className="transition hover:bg-slate-800/60"
                        >
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-300">
                            {formatDate(transaction.date)}
                          </td>

                          <td className="whitespace-nowrap px-4 py-4">
                            <div>
                              <p className="text-sm font-medium text-white">
                                {transaction.traderCopied}
                              </p>
                              <p className="text-xs text-slate-500">
                                {transaction.traderHandle}
                              </p>
                            </div>
                          </td>

                          <td className="min-w-[280px] px-4 py-4">
                            <p className="text-sm font-medium text-slate-100">
                              {transaction.tradeCopied}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              Outcome copied: {transaction.outcome} · Avg price:{" "}
                              {transaction.avgPrice}
                            </p>
                          </td>

                          <td className="whitespace-nowrap px-4 py-4">
                            <span
                              className={
                                transaction.side === "Buy"
                                  ? "rounded-full bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-400 ring-1 ring-cyan-500/20"
                                  : "rounded-full bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-400 ring-1 ring-purple-500/20"
                              }
                            >
                              {transaction.side}
                            </span>
                          </td>

                          <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium text-white">
                            {formatCurrency(transaction.amount)}
                          </td>

                          <td className="whitespace-nowrap px-4 py-4 text-right text-sm text-slate-300">
                            {transaction.shares.toLocaleString()}
                          </td>

                          <td className="whitespace-nowrap px-4 py-4">
                            <StatusBadge status={transaction.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}