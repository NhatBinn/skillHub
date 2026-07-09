import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class.js";
import * as Prisma from "./internal/prismaNamespace.js";
export * as $Enums from './enums.js';
export * from "./enums.js";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model Account
 *
 */
export type Account = Prisma.AccountModel;
/**
 * Model Session
 *
 */
export type Session = Prisma.SessionModel;
/**
 * Model VerificationToken
 *
 */
export type VerificationToken = Prisma.VerificationTokenModel;
/**
 * Model Category
 *
 */
export type Category = Prisma.CategoryModel;
/**
 * Model Tag
 *
 */
export type Tag = Prisma.TagModel;
/**
 * Model CourseTag
 *
 */
export type CourseTag = Prisma.CourseTagModel;
/**
 * Model Course
 *
 */
export type Course = Prisma.CourseModel;
/**
 * Model Lesson
 *
 */
export type Lesson = Prisma.LessonModel;
/**
 * Model Enrollment
 *
 */
export type Enrollment = Prisma.EnrollmentModel;
/**
 * Model LessonProgress
 *
 */
export type LessonProgress = Prisma.LessonProgressModel;
/**
 * Model Payment
 *
 */
export type Payment = Prisma.PaymentModel;
/**
 * Model Coupon
 *
 */
export type Coupon = Prisma.CouponModel;
/**
 * Model Review
 *
 */
export type Review = Prisma.ReviewModel;
/**
 * Model ForumPost
 *
 */
export type ForumPost = Prisma.ForumPostModel;
/**
 * Model Comment
 *
 */
export type Comment = Prisma.CommentModel;
/**
 * Model ChatMessage
 *
 */
export type ChatMessage = Prisma.ChatMessageModel;
/**
 * Model Notification
 *
 */
export type Notification = Prisma.NotificationModel;
/**
 * Model File
 *
 */
export type File = Prisma.FileModel;
/**
 * Model AuditLog
 *
 */
export type AuditLog = Prisma.AuditLogModel;
//# sourceMappingURL=client.d.ts.map