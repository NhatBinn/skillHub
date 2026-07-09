import { prisma } from "@skillhub/database";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>
}

export const revalidate = 300;

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const courseItem = await prisma.course.findUnique({
    where: {
      slug,
    },
    select: {
      title: true,
      description: true,
    }
  });

  if (!courseItem) return { title: 'Course Not Found' };
 
  return {
    title: `${courseItem.title} | SkillHub`,
    description: courseItem.description
  }
}


async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const courseItem = await prisma.course.findUnique({
    where: {
      slug,
    },
  });

  if (!courseItem) notFound();

  return (
    <section>
      <div>{courseItem?.title}</div>
    </section>
  );
}

export default CoursePage;
