import Link from "next/link";
import { Container } from "../layout/container";
import { Button } from "../ui/button";
import { auth } from "@/auth";

async function Navbar() {
  const session = await auth();

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
            <Button
              variant="outline"
              size="lg"
              className={"text-[18px] font-semibold text-[#334155]"}
            >
              Đăng nhập
            </Button>
            <Button
              size="lg"
              className={"text-[18px] font-semibold bg-[#EF5B2C]"}
            >
              Đăng ký
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Navbar;
