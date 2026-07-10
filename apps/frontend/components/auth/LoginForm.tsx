"use client";

import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

function LoginForm() {
  const route = useRouter();

  const handleSubmit = async () => {
    const { data, error } = await signIn.email({
      email: "abc@gmail.com",
      password: "12345678",
    });
    if (error) {
      console.log(error.message);
      return;
    }

    console.log(data);
    route.replace("/");
  };
  return <button onClick={handleSubmit}>Đăng nhập</button>;
}

export default LoginForm;
