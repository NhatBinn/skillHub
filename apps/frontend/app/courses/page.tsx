import CourseList from "@/components/common/CourseCard";
import { prisma } from "@skillhub/database";

async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const coursesList = await prisma.course.findMany({
    where: {
      published: true,
      ...(category && {
        category: {
          slug: category,
        },
      }),
    },
    orderBy: {
      enrollments: {
        _count: "desc",
      },
    },
    // skip:10,
    take: 12,
    include: {
      category: true,
      instructor: true,
    },
  });

  return (
    <section className="mx-auto w-7xl p-5">
      <h1 className="mb-8 text-center text-4xl font-bold">Courses</h1>
      <div className="mx-7">
        <h2 className="mb-4 text-xl font-semibold">List</h2>
        <CourseList coursesList={coursesList} />
      </div>
    </section>
  );
}

export default CoursesPage;
