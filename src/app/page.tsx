"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart3, PieChart, FileText, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inconsolata&display=swap");

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: "Stolzl Display", sans-serif;
        }

        body,
        p,
        a,
        button,
        input {
          font-family: "Inconsolata", monospace;
        }
      `}</style>
      <header className="flex h-14 items-center border-b-2 border-[#ffffff] bg-[#c0c0c0] px-4 shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#dfdfdf,inset_-2px_-2px_grey,inset_2px_2px_#fff] lg:px-6">
        <Link className="flex items-center justify-center" href="#">
          <Zap className="h-6 w-6" />
          <span className="sr-only">DAO Treasury</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="/explore"
          >
            Explore
          </Link>
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Sign In
          </Link>
        </nav>
      </header>
      <main className="flex-1 justify-center">
        <section className="relative w-full overflow-hidden bg-white py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=200&width=1200"
              alt="Knot tying visualization"
              width={1200}
              height={200}
              className="w-full object-cover"
            />
          </div>
          <div className="container relative px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  From disparate data to a cohesive strategy.
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Track, analyze, and report on your treasury across multiple
                  assets and platforms. Gain real-time insights, plan budgets,
                  and make data-driven governance decisions—all in one place.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="border-2 border-[#ffffff] bg-[#c0c0c0] text-black shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#dfdfdf,inset_-2px_-2px_grey,inset_2px_2px_#fff] transition-all duration-200 hover:rounded-lg hover:bg-[#d0d0d0]">
                  Explore
                </Button>
              </div>
            </div>
          </div>
        </section>
        <div className="border-t border-gray-200"></div>
        <section className="w-full bg-white py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Designed for DAOs, Built for Financial Clarity
            </h2>
            <div className="grid grid-cols-1 gap-8 border-l border-t border-gray-200 md:grid-cols-3">
              <div className="flex flex-col items-center border-b border-r border-gray-200 p-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold">
                  Centralize Treasury Data
                </h3>
                <div className="mb-2 inline-block rounded-lg bg-[#c0c0c0] px-3 py-1 text-sm">
                  Single Source of Truth
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Consolidate treasury assets, transaction history, and
                  governance proposals into a single, intuitive view. Ensure all
                  members have access to accurate, up-to-date information,
                  across multiple platforms.
                </p>
              </div>
              <div className="flex flex-col items-center border-b border-r border-gray-200 p-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <PieChart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Real-Time Monitoring</h3>
                <div className="mb-2 inline-block rounded-lg bg-[#c0c0c0] px-3 py-1 text-sm">
                  Up-to-Date Insights
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Dynamically track your treasury's financial health in
                  real-time, from asset balances to spending patterns. Stay
                  informed and react quickly to changes, ensuring smooth and
                  transparent operations.
                </p>
              </div>
              <div className="flex flex-col items-center border-b border-r border-gray-200 p-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold">
                  Enhanced Decision-Making
                </h3>
                <div className="mb-2 inline-block rounded-lg bg-[#c0c0c0] px-3 py-1 text-sm">
                  Data-Driven Decisions
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Leverage visual dashboards to clearly present your treasury
                  data. Identify trends, forecast outcomes, and optimize
                  spending with confidence—based on solid data, not guesswork.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="border-t border-gray-200"></div>
        <section className="w-full bg-white py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#c0c0c0] px-3 py-1 text-sm">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Financial Clarity. Smarter Decisions.
                </h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The platform for financial transparency. Equip your DAO with
                  real-time insights, seamless data integration, and
                  comprehensive reporting, so members can focus on driving
                  growth.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-0 border-l border-t border-gray-200 sm:max-w-4xl sm:grid-cols-2 md:gap-0 lg:max-w-5xl lg:grid-cols-2">
              <div className="grid gap-1 border-b border-r border-gray-200 p-6">
                <h3 className="text-lg font-bold">
                  Real-Time Treasury Overview
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  A live, up-to-date snapshot of the DAO's current financial
                  state. This includes total assets, token balances, categorized
                  inflows and outflows (e.g., grants, operational expenses,
                  income), and other essential financial data.
                </p>
              </div>
              <div className="grid gap-1 border-b border-r border-gray-200 p-6">
                <h3 className="text-lg font-bold">
                  Proposal Tracking & Governance Integration
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Seamlessly integrates with your DAO's governance process,
                  allowing you to track proposals, view voting outcomes, and
                  understand treasury fund allocations based on approved
                  proposals.
                </p>
              </div>
              <div className="grid gap-1 border-b border-r border-gray-200 p-6">
                <h3 className="text-lg font-bold">
                  Budgeting, Forecasting, and Dynamic Scenario Planning
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Create budgets, forecast future expenditures, and run dynamic
                  scenario models (e.g., "What if we reduce spending by 10%?" or
                  "What if token prices drop 20%?")
                </p>
              </div>
              <div className="grid gap-1 border-b border-r border-gray-200 p-6">
                <h3 className="text-lg font-bold">Reporting</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Generate custom reports on spending by category (e.g., grants,
                  operations, R&D). Display historical trends, including charts
                  of past treasury performance, inflows, and outflows over
                  customizable time frames (weekly, monthly, yearly). Track
                  spending against budgets to see if the DAO is staying on
                  target.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="border-t border-gray-200"></div>
        <section className="w-full bg-white py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:grid-cols-2 md:gap-16">
              <div className="space-y-4">
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Treasury Complexity Should Drive Growth, Not Confusion
                </h2>
                <Link
                  href="#"
                  className="inline-flex h-9 items-center justify-center rounded-md border-2 border-[#ffffff] bg-[#c0c0c0] px-4 py-2 text-sm font-medium text-black shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#dfdfdf,inset_-2px_-2px_grey,inset_2px_2px_#fff] transition-all duration-200 hover:rounded-lg hover:bg-[#d0d0d0]"
                >
                  Get Started
                </Link>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed">
                  A fully integrated platform to monitor every aspect of your
                  treasury, with real-time insights, scalable budgeting tools,
                  and the clarity needed for every member to make confident,
                  data-driven decisions.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="border-t border-gray-200"></div>
        <section className="w-full overflow-hidden bg-white py-12 md:py-24 lg:py-32">
          <div className="container relative px-4 md:px-6">
            <div className="max-w-3xl">
              <h3 className="mb-2 text-base font-semibold">ECOSYSTEM</h3>
              <h2 className="mb-4 text-4xl font-bold leading-tight">
                Supercharge your treasury with integrations
              </h2>
              <Button className="border-2 border-[#ffffff] bg-[#c0c0c0] text-black shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#dfdfdf,inset_-2px_-2px_grey,inset_2px_2px_#fff] transition-all duration-200 hover:rounded-lg hover:bg-[#d0d0d0]">
                Explore integrations
              </Button>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2">
              <div className="relative h-full w-full">
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  width={60}
                  height={60}
                  alt="App 1"
                  className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 transform"
                />
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  width={60}
                  height={60}
                  alt="App 2"
                  className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 transform"
                />
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  width={60}
                  height={60}
                  alt="App 3"
                  className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                />
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  width={60}
                  height={60}
                  alt="App 4"
                  className="absolute left-2/3 top-2/3 -translate-x-1/2 -translate-y-1/2 transform"
                />

                <Image
                  src="/placeholder.svg?height=60&width=60"
                  width={60}
                  height={60}
                  alt="App 5"
                  className="absolute left-1/4 top-3/4 -translate-x-1/2 -translate-y-1/2 transform"
                />
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  width={60}
                  height={60}
                  alt="App 6"
                  className="absolute left-3/4 top-1/4 -translate-x-1/2 -translate-y-1/2 transform"
                />
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  width={60}
                  height={60}
                  alt="App 7"
                  className="absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                />
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  width={60}
                  height={60}
                  alt="App 8"
                  className="absolute left-2/3 top-3/4 -translate-x-1/2 -translate-y-1/2 transform"
                />
              </div>
            </div>
          </div>
        </section>
        <div className="border-t border-gray-200"></div>
        <section className="w-full bg-white py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Join our beta!
                </h2>
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Be one of the first to unlock next-level DAO treasury insights
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 border-2 border-[#ffffff] bg-[#f0f0f0] shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#dfdfdf,inset_-2px_-2px_grey,inset_2px_2px_#fff]"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button
                    type="submit"
                    className="border-2 border-[#ffffff] bg-[#c0c0c0] text-black shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#dfdfdf,inset_-2px_-2px_grey,inset_2px_2px_#fff] transition-all duration-200 hover:rounded-lg hover:bg-[#d0d0d0]"
                  >
                    Sign Up
                  </Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t border-t-2 border-[#ffffff] bg-[#c0c0c0] px-4 py-6 shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#dfdfdf,inset_-2px_-2px_grey,inset_2px_2px_#fff] sm:flex-row md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 DAO Treasury. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
