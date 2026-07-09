import { auth } from "@/lib/auth";

export default async function Register() {
  const session = await auth();

  return <div>Register</div>;
}
