import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return <h1>hello {session?.user?.name}</h1>;
}
