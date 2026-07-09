import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client/runtime/client").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client/runtime/client").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client/runtime/client").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Account: "Account";
    readonly Session: "Session";
    readonly Verification: "Verification";
    readonly Category: "Category";
    readonly Tag: "Tag";
    readonly CourseTag: "CourseTag";
    readonly Course: "Course";
    readonly Lesson: "Lesson";
    readonly Enrollment: "Enrollment";
    readonly LessonProgress: "LessonProgress";
    readonly Payment: "Payment";
    readonly Coupon: "Coupon";
    readonly Review: "Review";
    readonly ForumPost: "ForumPost";
    readonly Comment: "Comment";
    readonly ChatMessage: "ChatMessage";
    readonly Notification: "Notification";
    readonly File: "File";
    readonly AuditLog: "AuditLog";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly password: "password";
    readonly email: "email";
    readonly emailVerified: "emailVerified";
    readonly image: "image";
    readonly avatarUrl: "avatarUrl";
    readonly bio: "bio";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly role: "role";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const AccountScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly accountId: "accountId";
    readonly providerId: "providerId";
    readonly accessToken: "accessToken";
    readonly refreshToken: "refreshToken";
    readonly accessTokenExpiresAt: "accessTokenExpiresAt";
    readonly refreshTokenExpiresAt: "refreshTokenExpiresAt";
    readonly scope: "scope";
    readonly idToken: "idToken";
    readonly password: "password";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum];
export declare const SessionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly token: "token";
    readonly expiresAt: "expiresAt";
    readonly ipAddress: "ipAddress";
    readonly userAgent: "userAgent";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];
export declare const VerificationScalarFieldEnum: {
    readonly id: "id";
    readonly identifier: "identifier";
    readonly value: "value";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum];
export declare const CategoryScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly slug: "slug";
};
export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum];
export declare const TagScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
};
export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum];
export declare const CourseTagScalarFieldEnum: {
    readonly courseId: "courseId";
    readonly tagId: "tagId";
};
export type CourseTagScalarFieldEnum = (typeof CourseTagScalarFieldEnum)[keyof typeof CourseTagScalarFieldEnum];
export declare const CourseScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly slug: "slug";
    readonly description: "description";
    readonly thumbnail: "thumbnail";
    readonly price: "price";
    readonly level: "level";
    readonly published: "published";
    readonly instructorId: "instructorId";
    readonly categoryId: "categoryId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum];
export declare const LessonScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly order: "order";
    readonly videoUrl: "videoUrl";
    readonly content: "content";
    readonly durationSec: "durationSec";
    readonly isFreePreview: "isFreePreview";
    readonly courseId: "courseId";
};
export type LessonScalarFieldEnum = (typeof LessonScalarFieldEnum)[keyof typeof LessonScalarFieldEnum];
export declare const EnrollmentScalarFieldEnum: {
    readonly id: "id";
    readonly enrolledAt: "enrolledAt";
    readonly userId: "userId";
    readonly courseId: "courseId";
};
export type EnrollmentScalarFieldEnum = (typeof EnrollmentScalarFieldEnum)[keyof typeof EnrollmentScalarFieldEnum];
export declare const LessonProgressScalarFieldEnum: {
    readonly id: "id";
    readonly completed: "completed";
    readonly lastPositionSec: "lastPositionSec";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly enrollmentId: "enrollmentId";
    readonly lessonId: "lessonId";
};
export type LessonProgressScalarFieldEnum = (typeof LessonProgressScalarFieldEnum)[keyof typeof LessonProgressScalarFieldEnum];
export declare const PaymentScalarFieldEnum: {
    readonly id: "id";
    readonly amount: "amount";
    readonly updatedAt: "updatedAt";
    readonly userId: "userId";
    readonly courseId: "courseId";
    readonly couponId: "couponId";
    readonly status: "status";
    readonly stripeSessionId: "stripeSessionId";
    readonly createdAt: "createdAt";
};
export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];
export declare const CouponScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly percentOff: "percentOff";
    readonly amountOff: "amountOff";
    readonly expiresAt: "expiresAt";
    readonly maxUses: "maxUses";
    readonly usedCount: "usedCount";
};
export type CouponScalarFieldEnum = (typeof CouponScalarFieldEnum)[keyof typeof CouponScalarFieldEnum];
export declare const ReviewScalarFieldEnum: {
    readonly id: "id";
    readonly rating: "rating";
    readonly comment: "comment";
    readonly userId: "userId";
    readonly courseId: "courseId";
    readonly createdAt: "createdAt";
};
export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum];
export declare const ForumPostScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly content: "content";
    readonly userId: "userId";
    readonly courseId: "courseId";
    readonly createdAt: "createdAt";
};
export type ForumPostScalarFieldEnum = (typeof ForumPostScalarFieldEnum)[keyof typeof ForumPostScalarFieldEnum];
export declare const CommentScalarFieldEnum: {
    readonly id: "id";
    readonly content: "content";
    readonly userId: "userId";
    readonly postId: "postId";
    readonly lessonId: "lessonId";
    readonly parentId: "parentId";
    readonly createdAt: "createdAt";
};
export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum];
export declare const ChatMessageScalarFieldEnum: {
    readonly id: "id";
    readonly content: "content";
    readonly courseId: "courseId";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
};
export type ChatMessageScalarFieldEnum = (typeof ChatMessageScalarFieldEnum)[keyof typeof ChatMessageScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly type: "type";
    readonly title: "title";
    readonly body: "body";
    readonly link: "link";
    readonly isRead: "isRead";
    readonly createdAt: "createdAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const FileScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly url: "url";
    readonly type: "type";
    readonly sizeBytes: "sizeBytes";
    readonly createdAt: "createdAt";
};
export type FileScalarFieldEnum = (typeof FileScalarFieldEnum)[keyof typeof FileScalarFieldEnum];
export declare const AuditLogScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly action: "action";
    readonly targetType: "targetType";
    readonly targetId: "targetId";
    readonly createdAt: "createdAt";
};
export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map