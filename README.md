# MVP Features

## Real-Time Treasury Overview
#### What it does: 
Provides a live, up-to-date snapshot of the DAO’s current financial state. This includes total assets, token balances, inflows/outflows categorised by type (e.g., grants, operational expenses, income), and any other relevant financial data.

#### Why it’s important: 
DAO members and contributors need immediate visibility into the financial health of their organisation. This helps ensure that decisions are made with a full understanding of the available resources.

## Proposal Tracking & Governance Integration
#### What it does: 
This feature integrates with the DAO’s governance process, allowing users to: track proposals, see voting outcomes, and understand how treasury funds are allocated based on approved proposals.

#### Why it’s important: 
DAOs operate on community decisions. Making it easier for members to see which proposals impact the treasury and how funds are allocated increases transparency and accountability.

## Budgeting, Forecasting, and Dynamic Scenario Planning
#### What it does: 
Enables DAOs to create budgets (Runway Tracker: Automatically calculate and display how long the treasury will last based on average spending rates), forecast future expenditures, and run dynamic scenario models (e.g., “What if we cut spending by 10%?” or “What if token prices drop 20%?”). Scenario planning allows for the testing of different financial outcomes based on various inputs.

#### Why it’s important: 
With volatile markets and variable funding, DAOs need robust financial planning tools. This helps with decision-making, giving a clearer picture of runway, potential risks, and long-term sustainability. This feature is crucial for ensuring that DAOs can stay within their financial limits while planning for the future.

## Done
#### 1. Treasury Balance (Total Value of Assets)
Metric: The total value of all tokens held in the treasury wallet(s), aggregated across all assets.
http://localhost:3000/api/safe?address=0xce4a1E86a5c47CD677338f53DA22A91d85cab2c9

#### 2. Transaction History
Metric: A list of all recent transactions (inflows and outflows) from the treasury.
Data Source:
Blockchain Explorer APIs: Etherscan, tx from wallet
http://localhost:3000/api/scan/tx?address=0xce4a1E86a5c47CD677338f53DA22A91d85cab2c9&page=1&offset=10

#### 3. Asset Allocation Breakdown
Metric: Percentage breakdown of assets held in the treasury by token (e.g., 50% ETH, 30% DAI, 20% USDC).
http://localhost:3000/api/safe?address=0xce4a1E86a5c47CD677338f53DA22A91d85cab2c9

#### 4. Runway Tracker 
Metric: How many months or days the treasury can last based on current spending and recurring costs.
http://localhost:3000/api/scan/runway?address=0xce4a1E86a5c47CD677338f53DA22A91d85cab2c9

#### 5. Governance proposals tracker
Metric: Number of active, pending, and completed proposals over a specific period (e.g., past 30 days). Also track proposal success rate and average time to reach a decision - offer insights into governance efficiency and community engagement.
http://localhost:3000/api/snapshot/proposals?space=tomoondao.eth&first=10&skip=0

## Learn More
[T3 Stack](https://create.t3.gg/):
- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) 

## Deploy
[Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
