export declare const Role: {
    readonly student: "student";
    readonly instructor: "instructor";
    readonly admin: "admin";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const Level: {
    readonly beginner: "beginner";
    readonly intermediate: "intermediate";
    readonly advanced: "advanced";
};
export type Level = (typeof Level)[keyof typeof Level];
export declare const Status: {
    readonly pending: "pending";
    readonly succeeded: "succeeded";
    readonly failed: "failed";
    readonly refunded: "refunded";
};
export type Status = (typeof Status)[keyof typeof Status];
export declare const NotificationType: {
    readonly enrollment: "enrollment";
    readonly payment: "payment";
    readonly comment_reply: "comment_reply";
    readonly new_lesson: "new_lesson";
    readonly system: "system";
};
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
export declare const FileType: {
    readonly avatar: "avatar";
    readonly thumbnail: "thumbnail";
    readonly video: "video";
    readonly attachment: "attachment";
};
export type FileType = (typeof FileType)[keyof typeof FileType];
//# sourceMappingURL=enums.d.ts.map