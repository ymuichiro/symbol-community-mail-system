import { Input } from "@/components/ui/input";
import { login } from "./actions";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  // const { data, error } = await supabase.auth.getUser();
  // if (data?.user) {
  //   redirect("/");
  // }

  return (
    <form className="container max-w-sm min-h-screen flex justify-center items-center flex-col space-y-3">
      <div className="pb-6 w-full">
        <h1 className="w-full text-4xl font-semibold text-center">
          Symbol Mail
          <br /> Admins
        </h1>
      </div>
      <div className="flex flex-col gap-1 items-start w-full">
        <label htmlFor="email" className="text-muted-foreground">
          Email
        </label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="flex flex-col gap-1 items-start w-full">
        <label htmlFor="password" className="text-muted-foreground">
          Password:
        </label>
        <Input id="password" name="password" type="password" required />
      </div>
      <div className="pt-3 w-full">
        <Button formAction={login} className="w-full">
          Log in
        </Button>
      </div>
    </form>
  );
}
