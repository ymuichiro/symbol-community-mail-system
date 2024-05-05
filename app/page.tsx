import Editor from "@/components/editor";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { send } from "@/app/actions";

export default async function Home() {
  // const supabase = createClient();
  // const { data, error } = await supabase.auth.getUser();
  // if (error || !data?.user) {
  //   redirect("/login");
  // }

  return (
    <main className="flex min-h-screen flex-col items-center p-3">
      <div className="w-full">
        <h1 className="text-left text-2xl font-semibold">Symbol mail</h1>
      </div>
      <Editor />
      {/* つぎここから。JS を使う要素はここではつかえない */}
      <button
        onClick={async () => {
          await send();
        }}
      >
        test
      </button>
    </main>
  );
}
