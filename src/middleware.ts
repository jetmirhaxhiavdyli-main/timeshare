import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware() {
  // For now, let's allow all requests to proceed
  return NextResponse.next();
}
