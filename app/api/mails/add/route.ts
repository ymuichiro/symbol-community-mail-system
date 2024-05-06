import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  email: string;
};

/** add email */
export async function POST(req: NextRequest) {
  const json = (await req.json()) as Params;

  if (!json.email) {
    return NextResponse.json({ message: "email is required" }, { status: 400 });
  }

  // 正規表現により email の形式が正しいかチェック
  const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!emailPattern.test(json.email)) {
    return NextResponse.json({ message: "email is invalid" }, { status: 400 });
  }

  // 書き込み
  await prisma.mailingList.upsert({
    create: { email: json.email },
    update: { email: json.email },
    where: { email: json.email },
  });

  return NextResponse.json({ message: "Register email successfully" });
}

export async function GET() {
  const emails = await prisma.mailingList.findMany();
  return NextResponse.json(emails);
}
