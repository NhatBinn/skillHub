import { prisma } from "@skillhub/database";

async function ReviewHighlight() {
  const reviews = await prisma.review.findMany({
    orderBy: {
      rating: "desc",
    },
    take: 3,
    include: {
      user: true,
      course: true,
    },
  });
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
        >
          <div className="text-lg text-amber-400">
            {"★".repeat(review.rating)}
          </div>
          <p className="mt-4 min-h-14 flex-1 text-[16px] leading-7 text-slate-600 line-clamp-2">
            {review.comment}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
              {review.user.name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-slate-900">{review.user.name}</p>
              <p className="text-sm text-slate-500">{review.course.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewHighlight;
