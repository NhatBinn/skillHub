import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Prisma } from "@skillhub/database";

type HeroCourse = Prisma.CourseGetPayload<Prisma.CourseDefaultArgs>;;

interface HeroSectionProps {
  coursesList: HeroCourse[];
}

function HeroSection({ coursesList }: HeroSectionProps) {
  const positions = [
    {
      position: "left-6 top-0 rotate-[-6deg]",
      bg: "bg-indigo-400",
    },
    {
      position: "right-4 top-24 rotate-3",
      bg: "bg-orange-400",
    },
  ];
  return (
    <section className="py-14 px-10 bg-[#EEF2FF] rounded-[16px]">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <h1 className="text-[38px] font-bold leading-tight text-slate-900">
            Học kỹ năng mới,
            <br />
            tiến xa hơn trong sự nghiệp
          </h1>
          <p className="mt-6 max-w-xl text-[20px] leading-8 text-slate-600">
            Hàng trăm khóa học lập trình, thiết kế và dữ liệu từ giảng viên thực
            chiến — học theo tốc độ của riêng bạn, mọi lúc mọi nơi.
          </p>
          <div className="mt-8">
            <Button
              size="xl"
              className="bg-orange-500 hover:bg-orange-600 font-bold text-[20px]"
            >
              <Link href="/courses">Khám phá khóa học</Link>
            </Button>
          </div>

          <div className="mt-12 flex gap-10">
            <div>
              <p className="text-3xl font-bold text-[#4338CA]">1.240+</p>
              <p className="mt-1 text-[16px] text-[#64748B]">Học viên</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#4338CA]">42</p>
              <p className="mt-1 text-[16px] text-[#64748B]">Khóa học</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#4338CA]">15</p>
              <p className="mt-1 text-[16px] text-[#64748B]">Giảng viên</p>
            </div>
          </div>
        </div>

        <div className="relative hidden h-105 lg:block">
          {coursesList.map((course, idx) => (
            <div
              key={course.id}
              className={`absolute w-72 rounded-2xl bg-white p-4 shadow-2xl ${positions[idx].position}`}
            >
              <div className={`h-36 rounded-xl ${positions[idx].bg}`} />
              <h3 className="mt-4 font-semibold text-slate-900">
                {course.title}
              </h3>
              <p className="mt-1 text-sm text-slate-500">⭐ 4.5 · $49.99</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
