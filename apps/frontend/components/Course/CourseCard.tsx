import { Prisma } from "@skillhub/database";
import Link from "next/link";

type CourseListPayload = Prisma.CourseGetPayload<{
  include: {
    category: true;
    instructor: true;
  };
}>;

interface CourseSectionProps {
  coursesList: CourseListPayload[];
}

function CourseCard({ coursesList }: CourseSectionProps) {
  const levelClass = {
    beginner: "text-green-400 bg-green-100",
    intermediate: "text-blue-400 bg-blue-100",
    advanced: "text-red-400 bg-red-100",
  };

  return (
    <div className="grid grid-cols-3 gap-5">
      {coursesList.map((course) => (
        <Link
          key={course.id}
          href={`/courses/${course.slug}`}
          className="block overflow-hidden rounded-xl border border-slate-200 bg-white  shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="h-40 w-full bg-green-50" />
          <div className="p-4">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${levelClass[course.level]}`}
            >
              {course.level}
            </span>
            <h3 className="mt-3 line-clamp-2 text-lg font-semibold">
              {course.title}
            </h3>
            <div className="mx-1">
              <span className="text-[12px] border rounded-[50%] p-0.5 bg-green-100 text-[#4338CA] font-medium">
                {course.instructor.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
              <span className="text-sm text-gray-500 mx-2">
                {course.instructor.name}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="font-semibold text-slate-900">
                ${Number(course.price)}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
                {course.category.name}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CourseCard;
