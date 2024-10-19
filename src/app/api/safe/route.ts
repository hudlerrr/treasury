import { NextRequest, NextResponse } from 'next/server';
import { createCaller } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 });
  }

  try {
    const ctx = await createTRPCContext({ headers: request.headers });
    const caller = createCaller(ctx);
    const result = await caller.safe.getBalance({ address });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

