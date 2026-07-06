/*
  Warnings:

  - The primary key for the `course_tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `courseId` on the `course_tags` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `course_tags` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `users` table. All the data in the column will be lost.
  - Added the required column `course_id` to the `course_tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag_id` to the `course_tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "course_tags" DROP CONSTRAINT "course_tags_courseId_fkey";

-- DropForeignKey
ALTER TABLE "course_tags" DROP CONSTRAINT "course_tags_tagId_fkey";

-- AlterTable
ALTER TABLE "course_tags" DROP CONSTRAINT "course_tags_pkey",
DROP COLUMN "courseId",
DROP COLUMN "tagId",
ADD COLUMN     "course_id" TEXT NOT NULL,
ADD COLUMN     "tag_id" TEXT NOT NULL,
ADD CONSTRAINT "course_tags_pkey" PRIMARY KEY ("course_id", "tag_id");

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatarUrl",
ADD COLUMN     "avatar_url" TEXT;

-- AddForeignKey
ALTER TABLE "course_tags" ADD CONSTRAINT "course_tags_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_tags" ADD CONSTRAINT "course_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
