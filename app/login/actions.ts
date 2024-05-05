"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  if (true) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
