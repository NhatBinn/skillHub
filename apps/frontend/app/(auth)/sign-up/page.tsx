import { auth } from "@/auth";

export default async function SignUp() {
  const session = await auth();

  return <div>SignUp</div>;
}
