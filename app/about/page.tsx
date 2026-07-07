import Link from 'next/link';

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white p-6 md:p-24">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl text-cyan-400">
          Welcome to MCTG
        </h1>
        <p className="text-xl leading-8 text-slate-300">
          The next-generation Polymarket platform. Connect your Web3 wallet, analyze top trader performance, and automatically copy or fade trades in real-time.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 shadow-md">
            <h3 className="text-lg font-semibold text-white mb-2">Sync Wallets</h3>
            <p className="text-sm text-slate-400">Seamlessly authenticate and track your portfolio securely.</p>
          </div>
          <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 shadow-md">
            <h3 className="text-lg font-semibold text-white mb-2">Track Analytics</h3>
            <p className="text-sm text-slate-400">View real-time trader rankings and historical performance data.</p>
          </div>
          <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 shadow-md">
            <h3 className="text-lg font-semibold text-white mb-2">Automate Trades</h3>
            <p className="text-sm text-slate-400">Configure replication strategies to copy or fade market moves.</p>
          </div>
        </div>

        <div className="pt-8">
          <Link 
            href="/" 
            className="rounded-md bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}