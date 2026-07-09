import { signIn } from "@/lib/auth-client";

export default async function Login() {
  console.log(process.env.AUTH_SECRET);
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  );
}
