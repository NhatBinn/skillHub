import CourseList from "@/components/Course/CourseCard";
import HeroSection from "@/components/common/Root/HeroSection";
import ReviewHighlight from "@/components/common/Root/ReviewHighlight";
import { auth } from "@/lib/auth";
import { prisma } from "@skillhub/database";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  const coursesList = await prisma.course.findMany({
    where: {
      published: true,
    },
    orderBy: {
      enrollments: { _count: "desc" },
    },
    take: 6,
    include: {
      category: true,
      instructor: true,
    },
  });

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
    take: 8,
  });

  const coursesListHero = coursesList.slice(0, 2);
  return (
    <>
      <HeroSection coursesList={coursesListHero} />

      <div className="mt-10">
        <h2 className="text-[32px] font-bold mb-3">Danh mục nổi bật</h2>
        {/* chip */}
        <div className="flex flex-wrap gap-5 ">
          {categories.map((crs) => (
            <Link
              href={`/courses?category=${crs.slug}`}
              key={crs.id}
              className="inline-flex items-center rounded-full border border-slate-200 bg-[#645de6] px-4 py-2 text-[14px] text-white font-medium whitespace-nowrap transition-colors hover:bg-[#7974db]"
            >
              <span>{crs.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-[32px] font-bold">Khóa học nổi bật</h2>
          <Link href={`/courses`} className="text-sm text-[#64748B]">
            Xem tất cả →
          </Link>
        </div>
        <CourseList coursesList={coursesList} />
      </div>

      <div className="mt-10">
        <h2 className="text-[32px] font-bold mb-3">
          Học viên nói gì về SkillHub
        </h2>
        {/* hightline */}
        <ReviewHighlight />
      </div>
    </>
  );
}
