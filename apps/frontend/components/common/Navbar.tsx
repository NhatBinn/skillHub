"use client";

import Link from "next/link";
import { Container } from "../layout/container";
import { useSession } from "@/lib/auth-client";

function Navbar() {
  const {
    data: session,
    isPending, // loading state
    error, // error object
  } = useSession();
  
  console.log(session);
  return (
    <header>
      <Container>
        <nav className="border border-[#e2e8f0] rounded-[10px] py-3 px-4 my-5 flex items-center gap-5 bg-gray-50">
          <Link
            href={"/"}
            className="flex items-center gap-2 font-extrabold text-[#4F46E5] text-2xl"
          >
            <span className="w-2.5 h-2.5 rounded-[50%] bg-[#EF5B2C]"></span>
            SkillHub
          </Link>

          <ul className="flex flex-row gap-3 items-center text-[16px] font-medium text-[#475569] mx-2">
            <li>
              <Link href={"/course"}>Khóa học</Link>
            </li>
            <li>
              {" "}
              <Link href={"/teacher"}>Giảng viên</Link>
            </li>
            <li>
              <Link href={"/community"}>Diễn đàn</Link>
            </li>
          </ul>

          <div className="flex items-center gap-3 ml-auto">
            <Link
              href="/login"
              className="rounded-xl border border-slate-300 bg-white px-5 py-2 text-base font-semibold text-slate-700 transition-all duration-200 active:scale-[0.98] hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900"
            >
              Đăng nhập
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-orange-500 px-5 py-2 text-base font-semibold text-white transition-all duration-200 active:scale-[0.98] hover:bg-orange-600 hover:shadow-md"
            >
              Đăng ký
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Navbar;
