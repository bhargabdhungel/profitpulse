import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-900 text-slate-50">
      <header className="flex h-16 items-center border-b border-slate-800 px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="/">
          <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-2xl font-bold text-transparent">
            Profit Pulse
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
            <Link href="/login">Login</Link>
          </Button>
        </nav>
      </header>
      <main className="flex flex-1 items-center justify-center py-16 md:py-24">
        <div className="container flex flex-col items-center space-y-8 px-4 text-center md:px-6">
          <div className="space-y-4">
            <h1 className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-4xl font-bold tracking-tighter text-transparent sm:text-5xl md:text-6xl lg:text-7xl/none">
              Amplify Your Affiliate Success
            </h1>
            <p className="mx-auto max-w-[600px] text-slate-400 md:text-xl">
              Boost your earnings with real-time analytics and smart insights.
              Join Profit Pulse today.
            </p>
          </div>
          <div className="space-x-4">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </main>
      <section id="features" className="bg-slate-800 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
            Key Features
          </h2>
          <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
            <div className="flex max-w-sm flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-blue-900 p-3">
                <svg
                  className="h-6 w-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">
                Real-time Analytics
              </h3>
              <p className="text-slate-400">
                Track your performance in real-time with our advanced analytics
                dashboard.
              </p>
            </div>
            <div className="flex max-w-sm flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-blue-900 p-3">
                <svg
                  className="h-6 w-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Smart Insights</h3>
              <p className="text-slate-400">
                Get intelligent recommendations to optimize your affiliate
                marketing strategies.
              </p>
            </div>
            <div className="flex max-w-sm flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-blue-900 p-3">
                <svg
                  className="h-6 w-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">
                Multi-platform Support
              </h3>
              <p className="text-slate-400">
                Manage all your affiliate programs from various platforms in one
                place.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="w-full border-t border-slate-800 py-6">
        <div className="container flex flex-col items-center justify-between space-y-3 px-4 sm:flex-row sm:space-y-0 md:px-6">
          <p className="text-sm text-slate-500">
            © 2023 Profit Pulse. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              className="text-sm text-slate-500 underline-offset-4 hover:text-slate-400 hover:underline"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-sm text-slate-500 underline-offset-4 hover:text-slate-400 hover:underline"
              href="#"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
