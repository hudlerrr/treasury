import { NextRequest, NextResponse } from 'next/server';
import { createCaller } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const space = searchParams.get('space');
  const first = searchParams.get('first') || '10'; // Default to 10 proposals
  const skip = searchParams.get('skip') || '0';   // Default to skip 0 proposals

  if (!space) {
    return NextResponse.json({ error: 'Space parameter is required' }, { status: 400 });
  }

  try {
    const ctx = await createTRPCContext({ headers: request.headers });
    const caller = createCaller(ctx);
    const result = await caller.proposals.getProposals({
      space,
      first: parseInt(first),
      skip: parseInt(skip),
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching proposals:', error);
    return NextResponse.json({ error: 'An error occurred while fetching proposals' }, { status: 500 });
  }
}
