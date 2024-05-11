import { authOptions } from "@/lib/auth_options";
import { markdownToHtml } from "@/lib/markdown";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import markdownToTxt from "markdown-to-text";
import nodemailer from "nodemailer";

type Params = {
  subject: string;
  value: string;
};

const transporter = nodemailer.createTransport({
  host: process.env.AWS_SES_SMTP_ENDPOINT,
  port: 465,
  secure: true,
  auth: {
    user: process.env.AWS_SES_SMTP_USER,
    pass: process.env.AWS_SES_SMTP_PASSWORD,
  },
});

/** send email */
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const json = (await req.json()) as Params;

  if (!json.value || !json.subject) {
    return NextResponse.json({ message: "value is required" }, { status: 400 });
  }

  // メーリングリストのデータを取得
  const records = await prisma.mailingList.findMany();
  const emails = await Promise.all(records.map<string>((record) => record.email));
  console.log(`admin: ${session.user?.email}, value: ${json.value}, emails: ${emails.length}`);

  // markdown to html
  const html = markdownToHtml(json.subject, json.value);

  const mailOptions = {
    from: "noreply@mail.symbol-community.com",
    bcc: emails,
    subject: json.subject,
    text: markdownToTxt(json.value),
    html: html,
  };

  // メールを送信する
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("メールの送信中にエラーが発生しました:", error);
    } else {
      console.log("メールが正常に送信されました:", info.response);
    }
  });

  return NextResponse.json({ message: "hello from login action" });
}
