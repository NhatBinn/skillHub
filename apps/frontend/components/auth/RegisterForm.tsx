"use client";

import { signUp } from "@/lib/auth-client";

function RegisterForm() {
  const handleSubmit = async () => {
    const { data, error } = await signUp.email({
      email: "abc@gmail.com",
      password: "12345678",
      name: "Hoang Nhat",
    });

    if (error) {
      console.log(error.message);
      return;
    }

    console.log(data);
  };
  return <button onClick={handleSubmit}>Đăng ký</button>;
}

export default RegisterForm;
