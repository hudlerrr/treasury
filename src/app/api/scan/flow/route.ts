import { NextRequest, NextResponse } from 'next/server';
import { createCaller } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get('address');
  const dateRange = searchParams.get('dateRange');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  if (!address || !dateRange) {
    return NextResponse.json({ error: 'Address and dateRange are required' }, { status: 400 });
  }

  try {
    const ctx = await createTRPCContext({ headers: request.headers });
    const caller = createCaller(ctx);
    const result = await caller.transactionSummary.getSummary({
      address,
      dateRange: dateRange as 'week' | 'month' | 'year' | 'custom',
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

