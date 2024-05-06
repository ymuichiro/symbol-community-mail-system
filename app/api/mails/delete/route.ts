import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  email: string;
};

/** delete mail */
export async function DELETE(req: NextRequest) {
  const json = (await req.json()) as Params;
  console.log(json.email);

  if (!json.email) {
    return NextResponse.json({ message: "email is required" }, { status: 400 });
  }

  await prisma.mailingList.deleteMany({ where: { email: json.email } });
  return NextResponse.json({ message: "Delete email successfully" });
}
