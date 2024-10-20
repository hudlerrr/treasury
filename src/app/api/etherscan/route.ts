import { NextRequest, NextResponse } from 'next/server';
import { createCaller } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { env } from "@/env.js";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get('address');
  const page = searchParams.get('page');
  const offset = searchParams.get('offset');

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 });
  }

  try {
    const ctx = await createTRPCContext({ headers: request.headers });
    const caller = createCaller(ctx);
    const result = await caller.etherscan.getTransactions({ 
      address,
      page: page ? parseInt(page) : undefined,
      offset: offset ? parseInt(offset) : undefined
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error jam:', error);
    console.error('Error details jam:', JSON.stringify(error, null, 2));
    return NextResponse.json({ error: 'An error occurred', details: error.message }, { status: 500 });
  }
}

