import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, terms, privacy } = body;

    // ✅ Validate required fields
    if (!name || !terms || !privacy) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ✅ Create new lottery submission
    const newEntry = await prisma.lotterySubmission.create({
      data: {
        name,
        phone,
        accepted_terms: terms,
        accepted_privacy: privacy,
      
      },
    });

    // ✅ Set temporary cookie for access
    const res = NextResponse.json({ success: true ,uniqueId: newEntry.uniqueId});
    res.cookies.set('lottery_user', newEntry.uniqueId, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60, // 1 minute
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
