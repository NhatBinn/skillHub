import { auth } from "@/auth";

export default async function SignIn() {
  const session = await auth();

  return <div>SignIn</div>;
}
