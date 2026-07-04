# 📘 SkillHub — Design Document

### Full-combo project luyện Next.js (frontend) + Node.js (backend)

> Tài liệu này là bản thiết kế đầy đủ để code thẳng theo: kiến trúc, data
> model, đặc tả yêu cầu từng trang (UI, functional requirements, validation,
> edge case), đặc tả từng API, và roadmap triển khai chia nhỏ theo từng bước
> kèm hướng dẫn cách học/code (không phải code có sẵn để copy — mục tiêu là
> bạn tự viết, tài liệu chỉ dẫn đường).

**Cách dùng tài liệu này để học:** mỗi bước nhỏ ở mục 8 có 4 phần —
_Kiến thức cần đọc trước_ (từ khóa để bạn tự tra doc chính thức),
_Các bước thực hiện_ (checklist việc phải làm, có gợi ý pattern/signature
nhưng không viết sẵn logic), _Lưu ý_ (pitfall hay gặp), và _DoD_ (tiêu chí để
biết mình đã xong, chưa xong thì chưa qua bước tiếp). Làm đúng thứ tự, đừng
nhảy cóc — các bước sau phụ thuộc bước trước.

---

## Mục lục

1. [Tổng quan & Mục tiêu](#1-tổng-quan--mục-tiêu)
2. [Vai trò & Phân quyền](#2-vai-trò--phân-quyền)
3. [Kiến trúc hệ thống](#3-kiến-trúc-hệ-thống)
4. [Data Model — Database Schema](#4-data-model--database-schema)
5. [Tính năng & Trang (Feature Spec)](#5-tính-năng--trang-feature-spec)
6. [API Specification](#6-api-specification)
7. [Yêu cầu phi chức năng](#7-yêu-cầu-phi-chức-năng)
8. [Kế hoạch triển khai chi tiết theo từng bước](#8-kế-hoạch-triển-khai-chi-tiết-theo-từng-bước)
9. [Phụ lục: Tổng hợp công nghệ & kiến thức học được](#9-phụ-lục-tổng-hợp-công-nghệ--kiến-thức-học-được)

---

## 1. Tổng quan & Mục tiêu

**Ý tưởng sản phẩm:** SkillHub — nền tảng học online kết hợp cộng đồng (kiểu
mini Udemy + forum + chat theo khóa học). Học viên mua khóa học, học bài, thảo
luận; giảng viên tạo/quản lý khóa học; admin quản trị toàn hệ thống.

**Mục tiêu của project (với vai trò là bài luyện tập):** đi qua gần như toàn
bộ kỹ thuật quan trọng của Next.js App Router và Node.js trong **một** codebase
duy nhất, thay vì làm nhiều project nhỏ rời rạc.

**Trong phạm vi (in-scope):**

- CRUD đầy đủ (course, lesson, forum, review...)
- Auth + phân quyền 3 vai trò
- Thanh toán (Stripe), enroll, theo dõi tiến độ học
- Real-time (chat, notification) qua Node.js/Express riêng
- Background job (email, reminder) qua BullMQ
- Search, cache, admin panel, testing, deploy

**Ngoài phạm vi (out-of-scope, không làm để tránh phình dự án):**

- Mobile app riêng (chỉ web, responsive là đủ)
- Multi-tenant / đa ngôn ngữ (i18n)
- Video streaming adaptive bitrate (chỉ cần link video phát thẳng là đủ)
- Thanh toán nội địa (Momo/VNPay) — chỉ Stripe cho đơn giản, có thể thêm sau

---

## 2. Vai trò & Phân quyền

| Tính năng                                              | Guest (chưa login)        | Student                | Instructor               | Admin              |
| ------------------------------------------------------ | ------------------------- | ---------------------- | ------------------------ | ------------------ |
| Xem `/courses`, `/courses/[slug]`                      | ✅                        | ✅                     | ✅                       | ✅                 |
| Xem lesson `isFreePreview`                             | ✅                        | ✅                     | ✅                       | ✅                 |
| Học full lesson                                        | ❌ (bị redirect `/login`) | ✅ nếu đã `enrollment` | ✅ khóa của mình         | ✅                 |
| Mua khóa học / Checkout                                | ❌                        | ✅                     | ✅ (mua khóa người khác) | ✅                 |
| Review, comment, forum, chat                           | ❌                        | ✅                     | ✅                       | ✅                 |
| Tạo/sửa/xóa khóa học của mình                          | ❌                        | ❌                     | ✅                       | ✅ (mọi khóa)      |
| Xem doanh thu khóa học                                 | ❌                        | ❌                     | ✅ (khóa của mình)       | ✅ (toàn hệ thống) |
| `/admin/*` (quản lý user, duyệt course, xem audit log) | ❌                        | ❌                     | ❌                       | ✅                 |

**Cách hiện thực:** field `users.role` (enum `student` / `instructor` / `admin`).
Check quyền ở 2 lớp — bắt buộc cả hai, không chỉ 1:

1. **`proxy.ts`** (middleware, Next.js 16 đổi tên từ `middleware.ts`) chặn ở
   tầng route trước khi render trang — dùng cho UX (redirect sớm).
2. **Trong từng Server Action / Route Handler** kiểm tra lại session + role
   trước khi query/update DB — đây là lớp bảo mật thật sự, không được bỏ qua
   dù `proxy.ts` đã chặn (vì Server Action có thể bị gọi trực tiếp).

---

## 3. Kiến trúc hệ thống

1. File base:

```
skillhub/
│
├── apps/
│   │
│   ├── frontend/                    # Next.js 15
│   │   ├── app/
│   │   ├── components/
│   │   ├── actions/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── middleware.ts
│   │   ├── next.config.ts
│   │   └── package.json
│   │
│   └── backend/                     # Express
│       ├── src/
│       │   ├── sockets/
│       │   ├── queues/
│       │   ├── webhooks/
│       │   ├── services/
│       │   ├── jobs/
│       │   ├── middlewares/
│       │   ├── routes/
│       │   ├── config/
│       │   ├── utils/
│       │   └── server.ts
│       │
│       └── package.json
│
├── packages/
│   │
│   ├── database/
│   │   ├── prisma/
│   │   │    ├── schema.prisma
│   │   │    └── migrations/
│   │   │
│   │   ├── client.ts
│   │   └── package.json
│   │
│   ├── shared/
│   │   ├── dto/
│   │   ├── schemas/
│   │   ├── constants/
│   │   ├── types/
│   │   ├── validators/
│   │   ├── utils/
│   │   └── package.json
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       └── package.json
│
├── docker/
│   ├── postgres/
│   ├── redis/
│   └── nginx/
│
├── docker-compose.yml
├── package.json
├── pnpm-workspace.yaml
├── .env
└── README.md
```

2. Kiến trúc cuối cùng:

```
Browser
        │
        ▼
Next.js
        │
        ├───────────────┐
        │               │
Server Action      Route Handler
        │               │
        ▼               ▼
        Prisma      Express API
             │            │
             ├────────────┤
             ▼
      PostgreSQL
             ▲
             │
      Socket.io
             ▲
             │
         Express
             ▲
             │
      Queue / Worker
```

**Nguyên tắc phân chia (quan trọng nhất của cả kiến trúc):**

| Việc cần làm                                                      | Đặt ở đâu                                  | Vì sao                                                                      |
| ----------------------------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------- |
| CRUD thông thường (course, lesson, comment, review...)            | Server Actions (Next.js)                   | Không cần round-trip REST, code gọn, cùng process với UI                    |
| Cần `fetch()` từ client (search debounce, polling, presigned URL) | Route Handlers (`app/api/*`)               | Server Actions không hợp với pattern gọi tự do từ client-side JS            |
| Giữ kết nối lâu (chat, notification real-time)                    | Node.js/Express riêng (Socket.io)          | Next.js serverless function không giữ connection được                       |
| Chạy nền, không phản hồi ngay cho user (gửi email, cron)          | Node.js/Express riêng (BullMQ)             | Server Action phải trả response nhanh, không hợp để chạy job dài            |
| Nhận callback từ bên thứ 3 (Stripe)                               | Node.js/Express riêng (`/webhooks/stripe`) | Tách khỏi Next.js để không phụ thuộc cold-start serverless khi Stripe retry |

**Tech stack tổng hợp:**

| Layer                           | Công nghệ                                                       |
| ------------------------------- | --------------------------------------------------------------- |
| Frontend framework              | Next.js 15+ (App Router, TypeScript)                            |
| UI                              | Tailwind CSS + shadcn/ui                                        |
| Form & validate                 | React Hook Form (tuỳ chọn) + Zod                                |
| Auth                            | NextAuth.js (Auth.js) — Credentials + Google Provider           |
| ORM                             | Prisma                                                          |
| Database                        | PostgreSQL                                                      |
| Cache / session store cho queue | Redis                                                           |
| Real-time                       | Socket.io                                                       |
| Background job                  | BullMQ                                                          |
| Thanh toán                      | Stripe                                                          |
| Upload file                     | AWS S3 (hoặc Cloudinary) qua presigned URL                      |
| Email                           | Resend hoặc Nodemailer                                          |
| Testing                         | Jest + Supertest (backend), Playwright (E2E)                    |
| Deploy                          | Vercel (frontend) + Railway/Render (backend + Postgres + Redis) |

---

## 4. Data Model — Database Schema

Nhóm theo domain để dễ hình dung quan hệ, thay vì liệt kê rời rạc.

### 4.1 Domain: Auth & User

**`users`**
| Field | Type | Ghi chú |
|---|---|---|
| id | String (cuid) | PK |
| email | String, unique | |
| password | String? | null nếu login bằng Google OAuth |
| name | String | |
| avatarUrl | String? | |
| role | Enum: `student`\|`instructor`\|`admin` | default `student` |
| bio | String? | dùng ở trang instructor công khai |
| emailVerified | DateTime? | field bắt buộc của NextAuth |
| createdAt / updatedAt | DateTime | |

**`accounts`, `sessions`, `verification_tokens`** — bảng chuẩn của NextAuth
Prisma Adapter, copy nguyên mẫu từ `@auth/prisma-adapter`, không tự thiết kế.

### 4.2 Domain: Catalog (Khóa học)

**`categories`**
| Field | Type |
|---|---|
| id | String, PK |
| name | String, unique |
| slug | String, unique |

**`tags`**
| Field | Type |
|---|---|
| id | String, PK |
| name | String, unique |

**`course_tags`** (bảng nối n-n)
| Field | Type |
|---|---|
| courseId | FK → courses |
| tagId | FK → tags |

**`courses`**
| Field | Type | Ghi chú |
|---|---|---|
| id | String | PK |
| title | String | |
| slug | String, unique | |
| description | Text | |
| thumbnail | String? | |
| price | Decimal(10,2) | 0 = miễn phí |
| level | Enum: `beginner`\|`intermediate`\|`advanced` | |
| published | Boolean | default false |
| instructorId | FK → users | |
| categoryId | FK → categories | |
| createdAt / updatedAt | DateTime | |

**`lessons`**
| Field | Type | Ghi chú |
|---|---|---|
| id | String | PK |
| courseId | FK → courses | |
| title | String | |
| order | Int | thứ tự trong khóa |
| videoUrl | String? | |
| content | Text? | markdown bổ sung |
| durationSec | Int? | |
| isFreePreview | Boolean | default false |

### 4.3 Domain: Learning (Học & tiến độ)

**`enrollments`**
| Field | Type | Ghi chú |
|---|---|---|
| id | String | PK |
| userId | FK → users | |
| courseId | FK → courses | |
| enrolledAt | DateTime | |
| _unique_ | (userId, courseId) | |

**`lesson_progress`**
| Field | Type | Ghi chú |
|---|---|---|
| id | String | PK |
| enrollmentId | FK → enrollments | |
| lessonId | FK → lessons | |
| completed | Boolean | |
| lastPositionSec | Int | để resume video |
| updatedAt | DateTime | |

### 4.4 Domain: Commerce (Thanh toán)

**`payments`**
| Field | Type | Ghi chú |
|---|---|---|
| id | String | PK |
| userId | FK → users | |
| courseId | FK → courses | |
| amount | Decimal(10,2) | |
| couponId | FK → coupons? | |
| status | Enum: `pending`\|`succeeded`\|`failed`\|`refunded` | |
| stripeSessionId | String? | đối chiếu webhook |
| createdAt | DateTime | |

**`coupons`**
| Field | Type | Ghi chú |
|---|---|---|
| id | String | PK |
| code | String, unique | |
| percentOff | Int? | |
| amountOff | Decimal? | |
| expiresAt | DateTime? | |
| maxUses | Int? | |
| usedCount | Int | default 0 |

### 4.5 Domain: Community (Cộng đồng)

**`reviews`**
| Field | Type | Ghi chú |
|---|---|---|
| id | String | PK |
| userId | FK → users | |
| courseId | FK → courses | |
| rating | Int | 1-5 |
| comment | Text? | |
| createdAt | DateTime | |
| _unique_ | (userId, courseId) | |

**`forum_posts`**
| Field | Type | Ghi chú |
|---|---|---|
| id | String | PK |
| userId | FK → users | |
| title | String | |
| content | Text | |
| courseId | FK → courses? | null = bài chung |
| createdAt | DateTime | |

**`comments`**
| Field | Type | Ghi chú |
|---|---|---|
| id | String | PK |
| userId | FK → users | |
| postId | FK → forum_posts? | |
| lessonId | FK → lessons? | comment dưới bài học |
| parentId | FK → comments? | reply lồng nhau |
| content | Text | |
| createdAt | DateTime | |

**`chat_messages`**
| Field | Type | Ghi chú |
|---|---|---|
| id | String | PK |
| courseId | FK → courses | mỗi khóa = 1 room |
| userId | FK → users | |
| content | Text | |
| createdAt | DateTime | |

### 4.6 Domain: System

**`notifications`**
| Field | Type | Ghi chú |
|---|---|---|
| id | String | PK |
| userId | FK → users | người nhận |
| type | Enum: `enrollment`\|`payment`\|`comment_reply`\|`new_lesson`\|`system` | |
| title | String | |
| body | String | |
| link | String? | |
| isRead | Boolean | default false |
| createdAt | DateTime | |

**`files`**
| Field | Type | Ghi chú |
|---|---|---|
| id | String | PK |
| userId | FK → users | người upload |
| url | String | |
| type | Enum: `avatar`\|`thumbnail`\|`video`\|`attachment` | |
| sizeBytes | Int | |
| createdAt | DateTime | |

**`audit_logs`**
| Field | Type | Ghi chú |
|---|---|---|
| id | String | PK |
| userId | FK → users | ai thực hiện |
| action | String | vd `"delete_course"` |
| targetType | String | vd `"course"` |
| targetId | String | |
| createdAt | DateTime | |

### 4.7 Quan hệ tổng quan (ERD rút gọn)

```
users ──< courses (instructorId)
users ──< enrollments >── courses
courses ──< lessons
enrollments ──< lesson_progress >── lessons
users ──< payments >── courses
users ──< reviews >── courses
users ──< forum_posts
forum_posts ──< comments >── users
lessons ──< comments (song song với forum_posts)
comments ──< comments (self, parentId = reply)
courses ──< chat_messages >── users
users ──< notifications
users ──< files
users ──< audit_logs
```

---

## 5. Tính năng & Trang (Feature Spec)

Mỗi trang được đặc tả đầy đủ theo cùng 1 khuôn: **Route**, **Quyền truy cập**,
**Mục đích**, **UI Components**, **Yêu cầu chức năng (FR)**, **Validation /
Quy tắc nghiệp vụ**, **Trạng thái Empty/Error**, **Data fetch**, **API dùng**.

**Quy ước trạng thái chung (áp dụng mọi trang, không lặp lại từng trang trừ
khi có ngoại lệ):**

- _Loading:_ dùng `loading.tsx` cùng cấp — skeleton, không cần code thủ công.
- _Lỗi runtime (500):_ dùng `error.tsx` — hiển thị nút "Thử lại".
- _Không có quyền truy cập:_ redirect `/login` (nếu Guest) hoặc trang
  `403 Forbidden` tuỳ biến (nếu sai role).

### 5.1 Nhóm Public

#### `/` — Landing page

- **Quyền:** Guest
- **Mục đích:** giới thiệu sản phẩm, dẫn traffic vào `/courses`.
- **UI Components:** Hero banner (headline + CTA "Khám phá khóa học"), lưới 6-8
  `CourseCard`, dải `CategoryChip` (bấm vào điều hướng `/courses?category=`),
  khối `ReviewHighlight` (3 review rating cao nhất toàn hệ thống).
- **Yêu cầu chức năng:**
  1. Chỉ hiển thị khóa học có `published = true`.
  2. Sắp xếp theo số lượng `enrollments` giảm dần (khóa "hot" lên trước).
  3. Click vào `CourseCard` điều hướng `/courses/[slug]`.
- **Trạng thái Empty:** nếu chưa có khóa nào `published` → ẩn hẳn section
  "Khóa học nổi bật", không hiển thị khung trống.
- **Data:** `course.findMany({ where: {published:true}, orderBy: {enrollments:{_count:"desc"}}, take: 8, include: {category, instructor} })`
- **API:** không có action, chỉ fetch trực tiếp trong Server Component.
- **Tech:** SSG (không `revalidate`, chỉ rebuild khi deploy hoặc gọi thủ công), `next/image`, Metadata API.

#### `/courses` — Danh sách khóa học

- **Quyền:** Guest
- **Mục đích:** duyệt & lọc toàn bộ khóa học published.
- **UI Components:** `FilterSidebar` (checkbox category, radio level, range
  giá), `SearchInput`, `SortDropdown` (mới nhất / giá tăng / giá giảm / phổ
  biến), lưới `CourseCard`, `Pagination`.
- **Yêu cầu chức năng:**
  1. Đọc filter từ `searchParams`: `?category=&level=&minPrice=&maxPrice=&q=&sort=&page=`.
  2. Đổi filter → cập nhật URL (dùng `useRouter().push` với `scroll:false`) để
     giữ được khi share link/back button.
  3. Mặc định `sort=newest`, `page=1`, page size 12.
  4. Filter kết hợp AND với nhau (category AND level AND khoảng giá).
- **Validation:** `minPrice <= maxPrice`; nếu sai, tự hoán đổi hoặc bỏ qua filter giá, không throw lỗi UI.
- **Trạng thái Empty:** không có khóa nào khớp filter → hiển thị illustration +
  text "Không tìm thấy khóa học phù hợp" + nút "Xóa bộ lọc".
- **Data:** `course.findMany` với `where` động theo `searchParams`, `include: {category, instructor}`, `_count: {reviews, enrollments}`.
- **API:** đọc trực tiếp; nếu sau này search nặng (fuzzy) → chuyển sang `GET /api/search` (§6.2, giai đoạn 8).
- **Tech:** ISR `revalidate=60`, `searchParams` là `Promise` (Next 16), `<Suspense>` bọc phần lưới kết quả để filter đổi không reload cả trang.

#### `/courses/[slug]` — Chi tiết khóa học

- **Quyền:** Guest xem thông tin; Student/Instructor/Admin học full nếu có `enrollment`.
- **Mục đích:** thuyết phục mua + là entry point vào học bài.
- **UI Components:** Header (thumbnail, title, rating trung bình, số học viên,
  giá), `LessonListPreview` (accordion, khóa icon 🔒 nếu chưa mua trừ
  `isFreePreview`), nút CTA (`"Học ngay"` nếu free/đã mua, `"Mua khóa học"`
  nếu chưa), `Tabs` (Mô tả / Reviews / Q&A).
- **Yêu cầu chức năng:**
  1. Nếu `!published` và người xem không phải instructor sở hữu/admin →
     `notFound()` (ẩn hoàn toàn, không lộ khóa nháp).
  2. CTA đổi động theo trạng thái: Guest → "Đăng nhập để mua"; đã enroll →
     "Vào học"; chưa enroll & có phí → "Mua khóa học"; chưa enroll & free →
     "Học miễn phí".
  3. Tab Reviews: hiển thị rating trung bình + phân bố sao (1-5), mỗi user chỉ
     review được 1 lần/khóa (đã ràng buộc unique ở DB, UI ẩn form review nếu
     user đã review rồi, cho phép sửa thay vì tạo mới).
  4. Tab Q&A hiển thị `forum_posts` lọc theo `courseId`.
- **Trạng thái Empty:** chưa có review → text "Chưa có đánh giá nào, hãy là người đầu tiên".
- **Data:** `course.findUnique({ where:{slug}, include: {lessons:{orderBy:{order:"asc"}}, reviews:{include:{user}}, category, instructor, _count:{enrollments}} })`.
- **API:** `createReview`/`updateReview` (§6.1), `createCheckoutSession` hoặc `enrollFreeCourse` (§6.1).
- **Tech:** `generateStaticParams` (build sẵn khóa published), `generateMetadata` (SEO), `notFound()`.

#### `/instructors/[id]` — Trang công khai giảng viên

- **Quyền:** Guest
- **UI Components:** avatar + bio, lưới khóa học của giảng viên đó (chỉ `published`), tổng số học viên.
- **Yêu cầu chức năng:** chỉ hiển thị nếu `users.role === "instructor"`; nếu id là student/admin → `notFound()`.
- **Data:** `user.findUnique` include `courses` (`where: {published:true}`).
- **API:** đọc trực tiếp. **Tech:** Dynamic route + ISR.

#### `/forum`, `/forum/[postId]`

- **Quyền:** Guest xem; Student+ đăng bài/comment.
- **UI Components:** danh sách `PostCard` (title, tác giả, số comment, thời gian), nút "Đăng bài" (ẩn nếu Guest), chi tiết bài + `CommentTree` (đệ quy render `parentId`), form reply dưới mỗi comment.
- **Yêu cầu chức năng:**
  1. `/forum` mặc định hiển thị bài không gắn `courseId` (forum chung); có filter xem theo khóa học cụ thể.
  2. Comment lồng tối đa 3 cấp trên UI (cấp 4 trở đi flatten về cấp 3 để tránh UI vỡ layout), nhưng DB không giới hạn `parentId` sâu bao nhiêu.
  3. Reply vào comment → tạo `notification` type `comment_reply` cho chủ comment cha (không tự thông báo cho chính mình).
- **Validation:** `title` 5-150 ký tự, `content` tối thiểu 10 ký tự cho post; `comment.content` tối thiểu 1 ký tự, tối đa 2000.
- **Trạng thái Empty:** chưa có bài viết → "Chưa có thảo luận nào, bắt đầu chủ đề đầu tiên".
- **API:** `createPost`, `createComment` (§6.1). **Tech:** render comment tree đệ quy, infinite scroll hoặc pagination cho `/forum`.

#### `/search`

- **Quyền:** Guest
- **UI Components:** ô input lớn ở giữa, tab kết quả (Khóa học / Bài viết), `CourseCard`/`PostCard` gộp chung danh sách kết quả.
- **Yêu cầu chức năng:**
  1. Debounce 400ms trước khi gọi API, không gọi khi input rỗng.
  2. Search cả `title` lẫn `description`/`content` (full-text, không chỉ `LIKE`).
  3. Hiển thị số lượng kết quả tìm được.
- **Trạng thái Empty:** không có kết quả → gợi ý "Thử từ khóa khác" + hiển thị vài khóa học phổ biến thay thế.
- **API:** `GET /api/search` (§6.2). **Tech:** debounce client-side (`useDeferredValue` hoặc custom hook).

#### `/login`, `/register`

- **Quyền:** Guest (nếu đã login → redirect `/dashboard`)
- **UI Components:** form email/password, nút "Đăng nhập với Google", link chuyển qua lại giữa login/register.
- **Yêu cầu chức năng:**
  1. `/register`: sau khi tạo user thành công → tự động `signIn()` luôn, không bắt đăng nhập lại thủ công.
  2. Sai email/password → hiển thị lỗi chung chung "Email hoặc mật khẩu không đúng" (KHÔNG nói rõ "email không tồn tại" — tránh lộ thông tin email nào đã đăng ký).
  3. Nếu email đã tồn tại khi register → báo lỗi field email cụ thể.
- **Validation:** `email` đúng format; `password` tối thiểu 8 ký tự, có ít nhất 1 số; `name` 2-50 ký tự.
- **API:** `registerUser` (§6.1), NextAuth `signIn()` (§6.2).

### 5.2 Nhóm Student (cần đăng nhập)

#### `/dashboard`

- **Quyền:** Student, Instructor, Admin (nội dung khác nhau theo role — instructor/admin có thêm shortcut sang trang quản trị của họ).
- **UI Components:** danh sách `EnrolledCourseCard` (có progress bar %), khối "Thông báo gần đây" (5 notification mới nhất), khối "Gợi ý khóa học" (cùng category với khóa đang học).
- **Yêu cầu chức năng:**
  1. Progress % = (`lesson_progress.completed = true` / tổng `lessons` của khóa) × 100.
  2. Click vào `EnrolledCourseCard` → vào thẳng lesson đang học dở (lesson đầu tiên chưa `completed`), không phải lesson 1.
- **Trạng thái Empty:** chưa enroll khóa nào → CTA "Khám phá khóa học ngay" dẫn `/courses`.
- **Tech:** `proxy.ts` chặn nếu chưa login, `auth()` đọc session.

#### `/learn/[courseId]/[lessonId]` — Trang học bài

- **Quyền:** chỉ user có `enrollment` với `courseId` đó (trừ lesson `isFreePreview` — Guest cũng xem được).
- **UI Components:** `VideoPlayer` (custom hoặc `<video>` native), `LessonSidebar` (danh sách lesson kèm icon ✅ hoàn thành / ▶️ đang xem), nút "Đánh dấu hoàn thành", nút "Bài tiếp theo", khối comment dưới video.
- **Yêu cầu chức năng:**
  1. Nếu chưa `enrollment` và lesson không phải `isFreePreview` → redirect `/courses/[slug]` kèm thông báo "Bạn cần mua khóa học để xem bài này".
  2. Video tự lưu `lastPositionSec` mỗi 10 giây (throttle, không gọi action mỗi frame).
  3. Khi video chạy hết (hoặc user bấm "Đánh dấu hoàn thành") → set `completed = true`.
  4. Mở lại trang sau này → video tự resume tại `lastPositionSec`.
  5. Nút "Bài tiếp theo" disable nếu đang ở lesson cuối cùng của khóa.
- **Data:** check `enrollment` tồn tại trước khi trả nội dung lesson đầy đủ.
- **API:** `updateLessonProgress` (§6.1). **Tech:** Client Component cho video player, theo dõi `onTimeUpdate` (throttle).

#### `/learn/[courseId]/chat`

- **Quyền:** chỉ user có `enrollment` với `courseId`.
- **UI Components:** khung tin nhắn (auto-scroll xuống cuối khi có tin mới), input gửi tin nhắn, danh sách avatar người đang online trong room.
- **Yêu cầu chức năng:**
  1. Khi mount → load 50 tin nhắn gần nhất từ DB (lịch sử), sau đó mới connect WebSocket để nhận tin real-time tiếp theo.
  2. Nếu mất kết nối WebSocket → hiển thị badge "Đang kết nối lại..." thay vì im lặng mất tin nhắn.
  3. Giới hạn độ dài tin nhắn 1000 ký tự.
- **API:** WebSocket `join-room`, `chat:send` (§6.3). **Tech:** `socket.io-client`.

#### `/profile`

- **Quyền:** mọi user đã login (chỉ sửa của chính mình).
- **UI Components:** form đổi tên/avatar/bio, form đổi mật khẩu (2 form tách riêng), khối "Vai trò hiện tại" (readonly, chỉ admin đổi được qua `/admin/users`).
- **Yêu cầu chức năng:**
  1. Đổi avatar: gọi presign trước → upload S3 → mới `updateProfile` với url mới (không lưu url tạm nếu upload thất bại giữa chừng).
  2. Đổi mật khẩu bắt buộc nhập đúng mật khẩu cũ trước.
  3. Nếu user login bằng Google (không có `password`) → ẩn hẳn form đổi mật khẩu, hiện note "Tài khoản đăng nhập qua Google".
- **Validation:** `bio` tối đa 300 ký tự; `newPassword` tối thiểu 8 ký tự và khác `oldPassword`.
- **API:** `updateProfile`, `changePassword` (§6.1), `POST /api/uploads/presign` (§6.2).

#### `/orders`

- **Quyền:** mọi user đã login, chỉ thấy đơn của chính mình.
- **UI Components:** bảng `payments` (khóa học, số tiền, trạng thái badge màu, ngày), nút "Xem hóa đơn" (mở modal chi tiết).
- **Yêu cầu chức năng:** trạng thái `pending` hiển thị màu vàng, `succeeded` xanh, `failed`/`refunded` đỏ/xám.
- **Trạng thái Empty:** chưa có giao dịch nào → "Bạn chưa mua khóa học nào" + CTA `/courses`.
- **Tech:** cursor pagination (không dùng offset để tránh lệch trang khi có giao dịch mới).

#### `/checkout/[courseId]`

- **Quyền:** Student+ (Guest bị redirect `/login?callbackUrl=/checkout/[courseId]`, quay lại đúng trang sau khi login).
- **UI Components:** tóm tắt khóa học (thumbnail, title, giá gốc), ô nhập mã coupon + nút "Áp dụng", tổng tiền sau giảm, nút "Thanh toán qua Stripe".
- **Yêu cầu chức năng:**
  1. Nếu user đã `enrollment` khóa này rồi → redirect thẳng `/learn/[courseId]/...`, không cho checkout lại.
  2. Áp coupon: validate `expiresAt` chưa qua, `usedCount < maxUses`, hiển thị lỗi cụ thể ("Mã đã hết lượt sử dụng" / "Mã đã hết hạn" / "Mã không tồn tại").
  3. Nếu khóa `price = 0` → không vào trang này, dùng thẳng `enrollFreeCourse` từ `/courses/[slug]`.
- **API:** `createCheckoutSession` (§6.1) → redirect Stripe → Stripe gọi ngược `POST /webhooks/stripe` (§6.3) → redirect về `/checkout/success` hoặc `/checkout/cancel`.

#### Component `Notifications` (global, trong layout, mọi trang đã login đều thấy)

- **UI Components:** icon chuông + badge số chưa đọc, dropdown 10 notification gần nhất, nút "Đánh dấu đã đọc tất cả".
- **Yêu cầu chức năng:**
  1. Badge chỉ đếm `isRead = false`.
  2. Click vào 1 notification → `markAsRead` + điều hướng theo `link` của nó.
  3. Nhận real-time qua WebSocket; nếu socket rớt, tự động fallback polling `/api/notifications` mỗi 30s cho tới khi socket reconnect.
- **API:** WebSocket `notification:new` (§6.3), fallback `GET /api/notifications` (§6.2), action `markAsRead`/`markAllAsRead` (§6.1).

### 5.3 Nhóm Instructor

#### `/instructor` — Dashboard giảng viên

- **Quyền:** `role === "instructor"` hoặc `admin`.
- **UI Components:** bảng danh sách khóa đã tạo (title, published/draft badge, số học viên, doanh thu), thẻ tổng doanh thu + tổng học viên, biểu đồ đăng ký theo ngày (7/30 ngày gần nhất).
- **Yêu cầu chức năng:** doanh thu tính từ `payments` có `status = succeeded` của các khóa thuộc `instructorId` hiện tại.
- **Tech:** Route Group `(instructor)`, `proxy.ts` check role.

#### `/instructor/courses/new`, `/instructor/courses/[id]/edit`

- **Quyền:** `role === "instructor"`; khi edit, chỉ sửa khóa của chính mình — **check `instructorId === session.user.id` NGAY TRONG Server Action**, không chỉ ẩn nút ở UI.
- **UI Components:** form thông tin khóa (title, description, price, level, category, thumbnail upload), danh sách lesson dạng bảng kéo-thả đổi `order`, nút thêm/sửa/xóa lesson (mở modal), toggle "Xem thử miễn phí" trên từng lesson, toggle "Published".
- **Yêu cầu chức năng:**
  1. Không cho `published = true` nếu khóa chưa có ít nhất 1 lesson.
  2. Xóa course chỉ cho phép nếu **chưa có `enrollments`** nào (tránh xóa mất quyền truy cập của học viên đã mua) — nếu đã có học viên, chỉ cho phép `unpublish`, không cho xóa.
  3. Thêm lesson mới vào khóa đã có học viên → tạo `notification` type `new_lesson` cho toàn bộ user đang `enrollment` khóa đó.
  4. Video/thumbnail upload dùng presigned URL, hiển thị progress bar upload %.
- **Validation:** `title` 5-150 ký tự, `price >= 0`, phải chọn `categoryId`.
- **API:** `createCourse`, `updateCourse`, `deleteCourse`, `createLesson`, `updateLesson`, `deleteLesson`, `reorderLessons` (§6.1), `POST /api/uploads/presign` (§6.2).

### 5.4 Nhóm Admin

| Trang               | UI chính                                                       | Yêu cầu chức năng chính                                                                                                                                  | API                                  |
| ------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `/admin`            | Thẻ số liệu tổng (user/course/doanh thu) + biểu đồ tăng trưởng | Số liệu realtime tại thời điểm load trang, không cache quá 5 phút                                                                                        | đọc trực tiếp                        |
| `/admin/users`      | Bảng user, filter theo role, search email/tên                  | Nút "Ban" đổi trạng thái user thành không login được (field `banned: Boolean`); đổi role phải xác nhận (dialog) trước khi submit vì ảnh hưởng quyền lớn  | `banUser`, `changeUserRole`          |
| `/admin/courses`    | Bảng course, filter published/draft, cột số report (nếu có)    | Duyệt/xóa khóa vi phạm; xóa course từ admin bỏ qua ràng buộc "phải có enrollment=0" (admin có toàn quyền, nhưng hành động này bắt buộc ghi `audit_logs`) | `approveCourse`, `adminDeleteCourse` |
| `/admin/payments`   | Bảng giao dịch, filter status + khoảng ngày                    | Tổng doanh thu theo khoảng thời gian chọn                                                                                                                | đọc trực tiếp                        |
| `/admin/audit-logs` | Bảng log: ai, hành động gì, lúc nào, trên đối tượng nào        | Read-only, không sửa/xóa được log (đảm bảo tính toàn vẹn audit trail)                                                                                    | đọc trực tiếp                        |

Tech chung: `proxy.ts` check `role === "admin"`, pagination + filter qua `searchParams`, mọi hành động ghi (`banUser`, `changeUserRole`, `approveCourse`, `adminDeleteCourse`) đều tạo 1 dòng `audit_logs` tương ứng.

### 5.5 File hệ thống (convention của Next.js)

| File            | Vai trò                                                                                               |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| `not-found.tsx` | 404 tuỳ biến theo route segment                                                                       |
| `error.tsx`     | Error Boundary, có nút "Thử lại"                                                                      |
| `loading.tsx`   | skeleton tự động khi Server Component đang fetch                                                      |
| `proxy.ts`      | check session + role trước `/dashboard`, `/instructor`, `/admin` (Next 16 đổi tên từ `middleware.ts`) |

---

## 6. API Specification

3 loại "API" khác nhau — không gộp chung khi code:

1. **Server Actions** — hàm `"use server"`, KHÔNG phải REST endpoint, gọi
   trực tiếp từ component, không cần `fetch()`.
2. **Route Handlers** (`app/api/*/route.ts`) — REST thật của Next.js, dùng khi
   bắt buộc phải `fetch()` từ client, hoặc bên ngoài cần gọi vào.
3. **Node.js/Express backend riêng** (port `:4000`) — chỉ WebSocket + Webhook,
   không chứa CRUD.

### 6.1 Server Actions

| File                           | Action                                                            | Input                                              | Việc làm                                                                   | Trang gọi                       |
| ------------------------------ | ----------------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------- |
| `app/courses/actions.ts`       | `createCourse`                                                    | FormData                                           | Zod validate → `prisma.course.create` → `revalidatePath`                   | `/instructor/courses/new`       |
|                                | `updateCourse`                                                    | id + FormData                                      | check `instructorId` khớp session → update                                 | `/instructor/courses/[id]/edit` |
|                                | `deleteCourse`                                                    | id                                                 | check quyền + check `enrollments.count === 0` → delete                     | `/instructor/courses`           |
| `app/lessons/actions.ts`       | `createLesson`                                                    | courseId + FormData                                | tạo lesson, tự tính `order` cuối, tạo notification nếu khóa đã có học viên | trang edit course               |
|                                | `updateLesson` / `deleteLesson`                                   | lessonId                                           | CRUD                                                                       | trang edit course               |
|                                | `reorderLessons`                                                  | `{id, order}[]`                                    | update transaction                                                         | kéo-thả list lesson             |
|                                | `updateLessonProgress`                                            | enrollmentId, lessonId, completed, lastPositionSec | upsert `lesson_progress`                                                   | `/learn/[courseId]/[lessonId]`  |
| `app/auth/actions.ts`          | `registerUser`                                                    | email, password, name                              | hash bcrypt → `user.create` → auto `signIn()`                              | `/register`                     |
|                                | `updateProfile`                                                   | name, bio, avatarUrl                               | `user.update`                                                              | `/profile`                      |
|                                | `changePassword`                                                  | oldPassword, newPassword                           | verify + update                                                            | `/profile`                      |
| `app/reviews/actions.ts`       | `createReview` / `updateReview`                                   | courseId, rating, comment                          | upsert unique(userId,courseId)                                             | tab Review                      |
|                                | `deleteReview`                                                    | reviewId                                           | chỉ owner/admin                                                            | review của mình                 |
| `app/forum/actions.ts`         | `createPost`                                                      | title, content, courseId?                          | `forumPost.create`                                                         | `/forum`                        |
|                                | `createComment`                                                   | content, postId?, lessonId?, parentId?             | `comment.create` + tạo `notification` cho chủ comment cha                  | dưới post/lesson                |
| `app/checkout/actions.ts`      | `createCheckoutSession`                                           | courseId, couponCode?                              | validate coupon → Stripe SDK → redirect                                    | `/checkout/[courseId]`          |
|                                | `enrollFreeCourse`                                                | courseId                                           | nếu `price===0` tạo `enrollment` thẳng                                     | nút "Học ngay"                  |
| `app/notifications/actions.ts` | `markAsRead` / `markAllAsRead`                                    | notificationId?                                    | update `isRead`                                                            | dropdown chuông                 |
| `app/admin/actions.ts`         | `banUser`, `changeUserRole`, `approveCourse`, `adminDeleteCourse` | id + giá trị mới                                   | update + ghi `audit_logs`                                                  | `/admin/*`                      |

### 6.2 Route Handlers (`app/api/*/route.ts`)

| Endpoint                  | Method                      | Việc làm                                                     | Trang gọi                                                          |
| ------------------------- | --------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------ |
| `/api/auth/[...nextauth]` | GET/POST                    | NextAuth xử lý login/logout/session (bắt buộc route handler) | `signIn()`/`signOut()`/`useSession()` tự gọi                       |
| `/api/search`             | GET `?q=`                   | full-text search course + forum_posts                        | `/search` (debounce)                                               |
| `/api/uploads/presign`    | POST `{fileType, fileName}` | sinh presigned URL S3                                        | `/profile`, `/instructor/courses/[id]/edit` — gọi TRƯỚC khi upload |
| `/api/notifications`      | GET                         | fallback khi WebSocket rớt                                   | component `Notifications`, polling 30s                             |

> Tối giản (không muốn chạy 2 server): có thể gộp toàn bộ §6.3 vào Route
> Handlers, TRỪ WebSocket (bắt buộc cần server giữ connection). Ở đây tách
> riêng để bạn luyện Express đúng tinh thần "full combo".

### 6.3 Node.js + Express backend riêng (`/backend`, port `:4000`)

| Endpoint / Event                   | Loại       | Việc làm                                                                                                                | Gọi từ                              |
| ---------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `connection` → `join-room`         | WebSocket  | client join room theo `courseId`                                                                                        | `/learn/[courseId]/chat`            |
| `chat:send` (client→server)        | WebSocket  | lưu `chat_messages` → broadcast lại room                                                                                | ô nhập chat                         |
| `chat:message` (server→client)     | WebSocket  | đẩy tin nhắn mới tới room                                                                                               | tự động nhận                        |
| `notification:new` (server→client) | WebSocket  | đẩy notification realtime tới đúng `userId`                                                                             | component `Notifications`           |
| `POST /webhooks/stripe`            | REST       | verify chữ ký → update `payments.status` → tạo `enrollment` → emit `notification:new` → push job `send-payment-receipt` | Stripe gọi ngược (server-to-server) |
| `GET /health`                      | REST       | health check                                                                                                            | Docker healthcheck                  |
| _(không HTTP)_ BullMQ Workers      | Background | consume `send-welcome-email`, `send-payment-receipt`, `process-video-thumbnail`, `daily-learning-reminder` (cron)       | job khác `queue.add()`, hoặc cron   |

### 6.4 Sơ đồ ai-gọi-ai

```
Browser (Next.js pages)
   │
   ├─ Form submit ─────────────► Server Actions (§6.1, cùng process)
   │                                   └─► Prisma ─► PostgreSQL
   │
   ├─ fetch() debounce/polling ─► Route Handlers (§6.2, app/api/*)
   │                                   └─► Prisma / S3 SDK
   │
   ├─ socket.io-client ─────────► Node.js/Express backend :4000 (§6.3)
   │                                   ├─► Prisma (lưu chat_messages)
   │                                   └─► broadcast tới client khác
   │
   └─ redirect Stripe ──────────► Stripe ─(webhook)─► :4000 /webhooks/stripe
                                                             └─► BullMQ (Redis) ─► Worker gửi email
```

---

## 7. Yêu cầu phi chức năng

**Bảo mật**

- Mọi Server Action / Route Handler đều validate input bằng Zod, KHÔNG tin
  dữ liệu từ client kể cả khi UI đã ẩn nút.
- Check quyền (role, ownership) lại trong action, không chỉ dựa vào `proxy.ts`.
- Hash password bằng bcrypt (chưa từng lưu plaintext).
- Rate limit `/api/search`, `/webhooks/stripe`, `/api/auth/*` chống spam/brute-force.
- CORS chỉ cho phép domain frontend gọi vào backend `:4000`.

**Hiệu năng**

- ISR cho `/courses`, `/courses/[slug]` — tránh query DB mỗi request.
- Redis cache cho danh sách khóa học nổi bật (TTL 5-10 phút).
- Index DB: `courses.slug`, `courses.categoryId`, `enrollments(userId, courseId)`.

**Testing (tối thiểu để coi là "xong" một tính năng)**

- Unit test: các hàm business logic thuần (tính giá sau coupon, tính progress %).
- Integration test (Supertest): API backend Express (`/webhooks/stripe`, `/health`).
- E2E (Playwright): flow chính — đăng ký → mua khóa học → học bài → hoàn thành.

---

## 8. Kế hoạch triển khai chi tiết theo từng bước

10 giai đoạn lớn được chia thành **35 bước nhỏ** để mỗi lần ngồi code chỉ cần
tập trung 1 việc cụ thể, không bị ngợp. Mỗi bước có: **Mục tiêu**, **Kiến thức
cần đọc trước** (từ khóa tự tra doc chính thức — đọc trước khi code, đừng vừa
code vừa đoán), **Các bước thực hiện** (checklist, có gợi ý pattern/signature
nhưng KHÔNG viết sẵn logic — bạn tự viết mới nhớ), **Lưu ý**, và **DoD**.

---

### 🧩 GIAI ĐOẠN 1 — CRUD cơ bản (chưa auth)

#### Bước 1.1 — Khởi tạo project & môi trường

- **Mục tiêu:** có project Next.js chạy được, kết nối được Postgres.
- **Đọc trước:** Next.js App Router quickstart, Docker Compose cơ bản, Prisma "Getting Started".
- **Các bước thực hiện:**
  1. `npx create-next-app@latest` với TypeScript, Tailwind, App Router.
  2. Viết `docker-compose.yml` chạy Postgres 16, chạy `docker compose up -d`.
  3. `npm install prisma @prisma/client zod` → `npx prisma init`.
  4. Tạo `.env` với `DATABASE_URL` trỏ vào Postgres vừa chạy.
- **Lưu ý:** đừng dùng Postgres cài trực tiếp trên máy — Docker giúp xóa/tạo lại DB sạch dễ dàng khi schema sai.
- **DoD:** `npx prisma db pull` hoặc `npx prisma studio` kết nối DB thành công, không lỗi.

#### Bước 1.2 — Schema & migration (Category, Course)

- **Mục tiêu:** có bảng `categories`, `courses` trong DB.
- **Đọc trước:** Prisma schema syntax (`model`, `@relation`, `@unique`, enum).
- **Các bước thực hiện:**
  1. Viết `model Category` và `model Course` theo đúng field ở mục 4.2 (bản Giai đoạn 1 chưa cần `instructorId`, thêm sau ở Giai đoạn 2).
  2. `npx prisma migrate dev --name init`.
  3. Viết `prisma/seed.ts` tạo sẵn 2-3 category + 2-3 course mẫu, chạy `npx prisma db seed`.
- **Lưu ý:** `slug` phải `@unique`, nghĩ trước công thức tạo slug từ title (bỏ dấu, lowercase, thay space bằng `-`).
- **DoD:** `npx prisma studio` thấy đúng data seed, đúng field.

#### Bước 1.3 — Trang danh sách & chi tiết (read-only)

- **Mục tiêu:** `/courses` và `/courses/[slug]` hiển thị data thật từ DB.
- **Đọc trước:** Server Components fetch data, `generateMetadata`, `notFound()`, ISR (`revalidate`).
- **Các bước thực hiện:**
  1. Tạo `lib/prisma.ts` — Prisma Client singleton (tự tra "Prisma Next.js best practice" để hiểu vì sao cần singleton, đừng chỉ copy).
  2. `app/courses/page.tsx`: `await prisma.course.findMany()`, render list.
  3. `app/courses/[slug]/page.tsx`: `await params` (Promise trong Next 16!) → `findUnique` → `notFound()` nếu null.
  4. Thêm `generateMetadata` cho trang detail.
- **Lưu ý:** đừng quên `export const revalidate = 60` ở trang list, không thì mỗi request đều query DB.
- **DoD:** vào `/courses` thấy đúng data seed, click vào 1 course ra đúng trang detail, sửa slug sai → thấy trang 404.

#### Bước 1.4 — Server Actions: tạo/sửa/xóa

- **Mục tiêu:** CRUD đầy đủ qua UI, không cần vào Prisma Studio nữa.
- **Đọc trước:** Server Actions (`"use server"`), `useActionState` hook, `revalidatePath`, Zod `safeParse`.
- **Các bước thực hiện:**
  1. `app/courses/actions.ts`: viết `createCourse(prevState, formData)` — chú ý signature này để dùng được với `useActionState`.
  2. Validate bằng Zod trước khi `prisma.course.create`, trả lỗi field-by-field nếu sai.
  3. Component `CourseForm` (Client Component) dùng `useActionState(action, initialState)`.
  4. Viết tương tự `updateCourse`, `deleteCourse` (có `confirm()` trước khi xóa).
- **Lưu ý:** sau `create`/`update`/`delete` nhớ `revalidatePath("/courses")` — quên bước này là nguyên nhân phổ biến nhất khiến "sao data không tự cập nhật".
- **DoD:** tạo/sửa/xóa course qua UI, lỗi validate hiện đúng trên form, data đúng sau khi reload.

---

### 🧩 GIAI ĐOẠN 2 — Auth & phân quyền

#### Bước 2.1 — NextAuth với Credentials Provider

- **Mục tiêu:** đăng ký/đăng nhập bằng email-password.
- **Đọc trước:** NextAuth.js (Auth.js) v5 App Router setup, Prisma Adapter, JWT session strategy, bcrypt.
- **Các bước thực hiện:**
  1. `npm install next-auth @auth/prisma-adapter bcryptjs`.
  2. Thêm `model User/Account/Session/VerificationToken` chuẩn NextAuth vào schema, migrate.
  3. Cấu hình `auth.ts` (hoặc `lib/auth.ts`) với `CredentialsProvider`, `authorize()` verify bcrypt.
  4. `app/api/auth/[...nextauth]/route.ts` export `GET`/`POST` từ config.
  5. Viết `registerUser` Server Action (§6.1) → hash password → tạo user → `signIn()`.
- **Lưu ý:** KHÔNG bao giờ trả lỗi khác nhau giữa "email không tồn tại" và "sai password" — gộp chung 1 message.
- **DoD:** đăng ký được, tự động login sau đăng ký, đăng xuất/đăng nhập lại đúng.

#### Bước 2.2 — Google OAuth Provider

- **Mục tiêu:** thêm nút "Đăng nhập với Google".
- **Đọc trước:** Google OAuth Console setup (tạo Client ID/Secret), NextAuth `GoogleProvider`.
- **Các bước thực hiện:**
  1. Tạo OAuth Client trên Google Cloud Console, set redirect URI đúng domain dev.
  2. Thêm `GoogleProvider` vào config NextAuth, thêm `GOOGLE_CLIENT_ID/SECRET` vào `.env`.
  3. Test đăng nhập Google → kiểm tra user tự tạo trong bảng `users` với `password = null`.
- **Lưu ý:** field `password` phải optional (`String?`) trong schema vì user Google không có password.
- **DoD:** login Google thành công, user mới xuất hiện đúng trong DB.

#### Bước 2.3 — Middleware/Proxy bảo vệ route theo role

- **Mục tiêu:** chặn truy cập trái phép ở tầng route.
- **Đọc trước:** Next.js Middleware (Next 16 gọi là `proxy.ts`), cách đọc session trong middleware.
- **Các bước thực hiện:**
  1. Viết `proxy.ts` ở root: nếu path bắt đầu `/dashboard`, `/instructor`, `/admin` → check session.
  2. Chưa login → redirect `/login?callbackUrl=<path hiện tại>`.
  3. Có login nhưng sai role (vd student vào `/admin`) → redirect trang chủ hoặc trang 403.
- **Lưu ý:** middleware chỉ là lớp UX, PHẢI check lại quyền trong Server Action nữa (đã nói ở mục 2) — đừng tin middleware là đủ.
- **DoD:** student truy cập thẳng URL `/admin` bằng cách gõ tay → bị chặn/redirect, không thấy nội dung dù chỉ 1 giây.

#### Bước 2.4 — Gắn quyền sở hữu vào Course

- **Mục tiêu:** course có chủ, chỉ instructor tạo ra mới sửa được.
- **Đọc trước:** không cần đọc thêm, áp dụng lại kiến thức Server Actions đã học.
- **Các bước thực hiện:**
  1. Thêm field `instructorId` vào `Course`, migrate (nhớ update seed script gán instructor cho course cũ).
  2. Sửa `createCourse` tự gán `instructorId = session.user.id`.
  3. Sửa `updateCourse`/`deleteCourse` throw lỗi nếu `course.instructorId !== session.user.id` (trừ admin).
- **DoD:** đăng nhập bằng 2 tài khoản instructor khác nhau, A không sửa được course của B (kể cả cố tình gọi action với id course của B).

---

### 🧩 GIAI ĐOẠN 3 — Học & tiến độ

#### Bước 3.1 — Schema Lesson & trang quản lý cơ bản

- **Mục tiêu:** course có nhiều lesson, xem được danh sách.
- **Đọc trước:** Prisma nested writes (`create: { lessons: { create: [...] } }`), quan hệ 1-n.
- **Các bước thực hiện:**
  1. Thêm `model Lesson` (mục 4.2), migrate.
  2. Trang `/courses/[slug]` hiển thị `LessonListPreview` (chưa cần khóa/mở, chỉ hiển thị tên).
  3. Form thêm lesson đơn giản (chưa cần kéo-thả) trong trang instructor.
- **DoD:** thêm được lesson vào course, thấy đúng thứ tự theo `order`.

#### Bước 3.2 — Enrollment (đăng ký học miễn phí)

- **Mục tiêu:** học viên "sở hữu" 1 khóa học.
- **Đọc trước:** Prisma `@@unique` composite key, upsert pattern.
- **Các bước thực hiện:**
  1. Thêm `model Enrollment` với `@@unique([userId, courseId])`.
  2. Viết `enrollFreeCourse` Server Action — chỉ cho phép nếu `course.price === 0`.
  3. Trang `/courses/[slug]`: đổi CTA động theo có `enrollment` hay chưa (FR #2 ở mục 5.1).
- **DoD:** bấm "Học miễn phí" → có record `enrollment` → CTA đổi thành "Vào học".

#### Bước 3.3 — Trang học bài & video player

- **Mục tiêu:** vào xem được nội dung lesson thật.
- **Đọc trước:** thẻ `<video>` HTML5 events (`onTimeUpdate`, `onEnded`), nested dynamic routes `[courseId]/[lessonId]`.
- **Các bước thực hiện:**
  1. `app/learn/[courseId]/[lessonId]/page.tsx` — check `enrollment` tồn tại trước khi render (trừ `isFreePreview`).
  2. `VideoPlayer` (Client Component) nhận `videoUrl`, render `<video controls src={videoUrl} />`.
  3. `LessonSidebar` liệt kê lesson, link sang lesson khác trong cùng khóa.
- **DoD:** vào được lesson nếu đã enroll; chưa enroll mà cố vào URL trực tiếp → bị redirect kèm thông báo.

#### Bước 3.4 — Lesson progress tracking

- **Mục tiêu:** lưu tiến độ xem, resume đúng vị trí.
- **Đọc trước:** throttle/debounce function (viết tay hoặc dùng `lodash.throttle`), Prisma `upsert`.
- **Các bước thực hiện:**
  1. Thêm `model LessonProgress`.
  2. `updateLessonProgress` Server Action — `upsert` theo `(enrollmentId, lessonId)`.
  3. Trong `VideoPlayer`, `onTimeUpdate` throttle 10s gọi action lưu `lastPositionSec`.
  4. `onEnded` hoặc nút "Đánh dấu hoàn thành" → set `completed: true`.
  5. Khi load lại trang, set `video.currentTime = lastPositionSec` đã lưu.
- **Lưu ý:** gọi Server Action từ Client Component quá dày (mỗi giây) sẽ tạo rất nhiều request — bắt buộc throttle.
- **DoD:** xem dở 1 video, rời trang, quay lại → video tự nhảy đúng vị trí cũ; progress % ở `/dashboard` (đã làm tạm ở Giai đoạn 1, giờ có data thật) hiển thị đúng.

---

### 🧩 GIAI ĐOẠN 4 — Thanh toán

#### Bước 4.1 — Schema Payment, Coupon & trang checkout (chưa tích hợp Stripe)

- **Mục tiêu:** UI checkout hoàn chỉnh, validate coupon hoạt động, thanh toán tạm thời giả lập.
- **Đọc trước:** không cần đọc thêm về Stripe ở bước này, tập trung UI + validate logic.
- **Các bước thực hiện:**
  1. Thêm `model Payment`, `model Coupon`, migrate, seed vài coupon mẫu.
  2. Trang `/checkout/[courseId]`: hiển thị tóm tắt, ô nhập coupon.
  3. Viết hàm thuần (không phải action) `calculateFinalPrice(price, coupon)` — đây là ứng viên tốt cho unit test sau này (mục 7).
  4. Validate coupon: hết hạn / hết lượt / không tồn tại → lỗi cụ thể.
- **DoD:** nhập đúng mã coupon → tổng tiền cập nhật đúng; nhập mã sai/hết hạn → báo lỗi đúng loại.

#### Bước 4.2 — Tích hợp Stripe Checkout Session

- **Mục tiêu:** bấm "Thanh toán" → sang trang Stripe thật (test mode).
- **Đọc trước:** Stripe Checkout Session docs, Stripe test card `4242 4242 4242 4242`.
- **Các bước thực hiện:**
  1. Tạo tài khoản Stripe (test mode), lấy API key, `npm install stripe`.
  2. `createCheckoutSession` Server Action: tạo `payment` với `status: pending` → gọi `stripe.checkout.sessions.create` (line item = course, `success_url`/`cancel_url`) → `redirect(session.url)`.
- **Lưu ý:** lưu `stripeSessionId` vào `payment` ngay lúc tạo để webhook đối chiếu lại được ở bước sau.
- **DoD:** bấm thanh toán → sang trang Stripe thật, nhập test card → về lại `success_url` (dù chưa có enrollment tự động — bước tiếp theo mới làm).

#### Bước 4.3 — Dựng Express server & Stripe webhook

- **Mục tiêu:** webhook nhận sự kiện thanh toán, tự động tạo `enrollment`.
- **Đọc trước:** Express cơ bản (route, middleware), Stripe Webhook signature verification, `stripe listen` (Stripe CLI) để test local.
- **Các bước thực hiện:**
  1. `mkdir backend && npm init` → `npm install express stripe dotenv`.
  2. Viết `POST /webhooks/stripe` — verify chữ ký bằng `stripe.webhooks.constructEvent` (route này KHÔNG dùng `express.json()` mặc định, cần raw body).
  3. Xử lý event `checkout.session.completed`: tìm `payment` theo `stripeSessionId` → set `status: succeeded` → tạo `enrollment`.
  4. Cài Stripe CLI, chạy `stripe listen --forward-to localhost:4000/webhooks/stripe` để test local.
- **Lưu ý:** đây là lỗi hay gặp nhất khi học Stripe — quên raw body sẽ khiến verify signature luôn fail.
- **DoD:** thanh toán test xong → `enrollment` tự xuất hiện trong DB → vào học được ngay không cần thao tác thủ công.

---

### 🧩 GIAI ĐOẠN 5 — Upload file

#### Bước 5.1 — Setup S3 & Route Handler presign

- **Mục tiêu:** sinh được presigned URL để client upload thẳng lên S3.
- **Đọc trước:** AWS S3 bucket + IAM user (hoặc dùng Cloudinary cho đơn giản hơn nếu ngại setup AWS), khái niệm presigned URL.
- **Các bước thực hiện:**
  1. Tạo bucket S3 (hoặc tài khoản Cloudinary), lấy credentials, set CORS cho bucket cho phép PUT từ domain dev.
  2. `npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner`.
  3. `app/api/uploads/presign/route.ts`: `POST` nhận `{fileType, fileName}` → check session → trả `{uploadUrl, publicUrl}`.
  4. Thêm `model File`.
- **DoD:** gọi thử endpoint bằng Postman/curl, nhận được URL, `PUT` file lên URL đó thành công (kiểm tra thấy file trong bucket).

#### Bước 5.2 — Upload avatar ở `/profile`

- **Mục tiêu:** áp dụng presign vào 1 use case cụ thể trước, dễ debug hơn làm nhiều chỗ cùng lúc.
- **Đọc trước:** `fetch` với `PUT` method, đọc `File` object trong browser (`<input type="file">`), progress upload (`XMLHttpRequest` vì `fetch` không hỗ trợ progress event).
- **Các bước thực hiện:**
  1. Component chọn ảnh → gọi `/api/uploads/presign` → nhận `uploadUrl` → `PUT` file thẳng lên S3.
  2. Sau upload xong → gọi `updateProfile` với `avatarUrl` mới.
  3. Lưu record vào `files`.
- **Lưu ý:** không upload qua Server Action (giới hạn body size), phải upload thẳng từ browser lên S3.
- **DoD:** đổi avatar thành công, ảnh hiển thị đúng ngay không cần reload.

#### Bước 5.3 — Upload thumbnail & video ở trang Instructor

- **Mục tiêu:** áp dụng lại pattern ở bước 5.2 cho course thumbnail + lesson video (file lớn hơn nhiều).
- **Đọc trước:** không cần đọc thêm, tái sử dụng logic bước 5.2 — thử tự tách thành 1 hook `useFileUpload()` dùng chung.
- **Các bước thực hiện:**
  1. Refactor logic upload bước 5.2 thành hook tái sử dụng.
  2. Áp dụng cho ô thumbnail course và ô video lesson, thêm progress bar % (video thường vài chục MB, cần thấy tiến trình).
- **DoD:** upload thumbnail + video từ trang edit course thành công, cả 2 chỗ dùng chung 1 hook không copy-paste code.

---

### 🧩 GIAI ĐOẠN 6 — Real-time

#### Bước 6.1 — Socket.io server cơ bản

- **Mục tiêu:** client và server Express giao tiếp real-time được (test bằng log trước khi làm tính năng thật).
- **Đọc trước:** Socket.io docs (server + client), khái niệm room/namespace.
- **Các bước thực hiện:**
  1. `npm install socket.io` (backend), `socket.io-client` (frontend).
  2. Backend: gắn Socket.io vào Express server đã có (bước 4.3), log mỗi khi có `connection`/`disconnect`.
  3. Frontend: tạo 1 component test đơn giản connect vào server, log ra console.
- **Lưu ý:** nhớ cấu hình CORS cho Socket.io (khác CORS của Express REST route thường).
- **DoD:** mở web, thấy log "user connected" ở backend; đóng tab, thấy log "disconnected".

#### Bước 6.2 — Chat theo room courseId

- **Mục tiêu:** chat thật giữa nhiều học viên trong cùng khóa.
- **Đọc trước:** `socket.join(room)`, `io.to(room).emit()`.
- **Các bước thực hiện:**
  1. Thêm `model ChatMessage`.
  2. Client emit `join-room` với `courseId` khi vào trang `/learn/[courseId]/chat`.
  3. Server nhận `chat:send` → lưu DB → `io.to(courseId).emit("chat:message", ...)`.
  4. Trang chat: load 50 tin nhắn cũ từ DB trước (Server Component/action), sau đó mới lắng nghe socket cho tin mới.
- **DoD:** mở 2 tab trình duyệt (2 user khác nhau, cùng enroll 1 khóa) → chat qua lại thấy nhau real-time.

#### Bước 6.3 — Notification real-time

- **Mục tiêu:** thông báo đẩy tức thời không cần reload.
- **Đọc trước:** map `userId → socket.id` để emit đúng người (không broadcast toàn bộ).
- **Các bước thực hiện:**
  1. Thêm `model Notification`.
  2. Khi client connect, emit kèm `userId`, server lưu mapping (Map hoặc dùng room riêng theo `user:${userId}`).
  3. Khi có sự kiện cần thông báo (payment thành công, comment reply...) → emit `notification:new` vào đúng room `user:${userId}`.
  4. Component `Notifications`: lắng nghe event, cập nhật badge + dropdown; fallback polling `/api/notifications` nếu socket disconnect.
- **DoD:** thanh toán xong ở tab A → chuông thông báo ở tab A tự bật ngay, không cần F5.

---

### 🧩 GIAI ĐOẠN 7 — Background job

#### Bước 7.1 — Setup Redis & BullMQ cơ bản

- **Mục tiêu:** chạy được 1 job đơn giản để hiểu cơ chế trước khi làm job thật.
- **Đọc trước:** BullMQ docs (Queue, Worker, Job), Redis cơ bản.
- **Các bước thực hiện:**
  1. Thêm Redis vào `docker-compose.yml`.
  2. `npm install bullmq ioredis`.
  3. Tạo 1 queue test (`test-queue`), 1 worker log ra `job.data`, thử `queue.add()` từ 1 route tạm.
- **DoD:** gọi route tạm → thấy log ở worker (chạy ở process khác/terminal khác), chứng minh job chạy nền thật sự.

#### Bước 7.2 — Job gửi email

- **Mục tiêu:** gửi email chào mừng + hóa đơn không block request chính.
- **Đọc trước:** Resend hoặc Nodemailer setup, Mailtrap (hộp thư test, không gửi email thật khi dev).
- **Các bước thực hiện:**
  1. Setup Resend/Nodemailer + Mailtrap.
  2. Viết job `send-welcome-email`: trigger từ `registerUser` bằng `queue.add()` (KHÔNG `await` gửi email trực tiếp trong action).
  3. Viết job `send-payment-receipt`: trigger từ webhook Stripe (bước 4.3) sau khi `payment.status = succeeded`.
- **DoD:** đăng ký tài khoản mới → response trả về ngay lập tức (không đợi email) → vài giây sau thấy email trong Mailtrap.

#### Bước 7.3 — Cron job nhắc học

- **Mục tiêu:** job tự chạy định kỳ, không cần trigger thủ công.
- **Đọc trước:** BullMQ repeatable jobs (cron pattern).
- **Các bước thực hiện:**
  1. Viết job `daily-learning-reminder`: query user có `enrollment` nhưng `lesson_progress.updatedAt` quá 3 ngày chưa cập nhật.
  2. Đăng ký job này chạy lặp lại (`repeat: { pattern: "0 9 * * *" }` — 9h sáng mỗi ngày, hoặc rút ngắn để test).
  3. Trigger job `process-video-thumbnail` (giả lập) sau khi upload video ở Giai đoạn 5.
- **DoD:** rút ngắn lịch chạy xuống 1 phút để test thấy job tự kích hoạt đúng giờ mà không cần gọi tay.

---

### 🧩 GIAI ĐOẠN 8 — Search & cache

#### Bước 8.1 — Full-text search Postgres

- **Mục tiêu:** search nhanh và "thông minh" hơn `LIKE %keyword%`.
- **Đọc trước:** Postgres `tsvector`/`tsquery`, Prisma raw query (`$queryRaw`) khi ORM chưa hỗ trợ tốt full-text search.
- **Các bước thực hiện:**
  1. Thêm cột `tsvector` (generated column hoặc trigger) cho `courses.title + description` và `forum_posts.title + content`.
  2. Tạo GIN index trên cột đó.
  3. Viết hàm query bằng `prisma.$queryRaw` với `to_tsquery`.
- **DoD:** search 1 từ khóa xuất hiện giữa câu mô tả (không phải đầu chuỗi) vẫn ra kết quả đúng — đây là điều `LIKE` thường yếu.

#### Bước 8.2 — Route Handler `/api/search` & trang `/search`

- **Mục tiêu:** ghép full-text search (8.1) vào UI thật.
- **Đọc trước:** không cần đọc thêm, áp dụng lại Route Handler đã học ở Giai đoạn 5.
- **Các bước thực hiện:**
  1. `app/api/search/route.ts`: nhận `?q=`, gọi hàm ở bước 8.1, trả JSON gộp course + post.
  2. Trang `/search`: input debounce 400ms → `fetch('/api/search?q=...')`.
- **DoD:** gõ từ khóa → sau debounce thấy kết quả đúng cả course lẫn forum post, không gọi API khi input rỗng.

#### Bước 8.3 — Redis cache cho course list nổi bật

- **Mục tiêu:** giảm tải DB cho phần dữ liệu hay được đọc, ít khi đổi.
- **Đọc trước:** cache-aside pattern (đọc cache trước, miss thì query DB rồi ghi lại cache).
- **Các bước thực hiện:**
  1. Viết hàm `getFeaturedCourses()`: check Redis key `featured-courses` trước, có thì trả luôn; không có thì query DB rồi `SET` vào Redis với `EX 300` (TTL 5 phút).
  2. Áp dụng hàm này ở trang `/` (Landing page).
  3. Invalidate cache (xóa key) trong `updateCourse`/`deleteCourse` nếu muốn cập nhật ngay thay vì đợi TTL hết hạn.
- **DoD:** bật log Prisma, thấy request thứ 2 trở đi trong 5 phút KHÔNG query DB (chỉ query lần đầu).

---

### 🧩 GIAI ĐOẠN 9 — Admin panel

#### Bước 9.1 — Schema AuditLog & dashboard tổng quan

- **Mục tiêu:** trang `/admin` hiển thị số liệu thật.
- **Đọc trước:** Prisma aggregate (`count`, `sum`, `groupBy`).
- **Các bước thực hiện:**
  1. Thêm `model AuditLog`.
  2. `proxy.ts` thêm check `role === "admin"` cho `/admin/*`.
  3. Trang `/admin`: `prisma.user.count()`, `prisma.course.count()`, `prisma.payment.aggregate({_sum:{amount:true}, where:{status:"succeeded"}})`.
- **DoD:** số liệu khớp với data thật trong DB (đối chiếu thủ công qua Prisma Studio).

#### Bước 9.2 — Quản lý user (ban, đổi role)

- **Mục tiêu:** admin thao tác được trên user khác.
- **Đọc trước:** không cần đọc thêm, áp dụng lại Server Actions + audit log pattern.
- **Các bước thực hiện:**
  1. Trang `/admin/users`: bảng + filter role + search.
  2. `banUser`, `changeUserRole` Server Actions — mỗi action đều `prisma.auditLog.create()` kèm.
  3. Dialog xác nhận trước khi đổi role (vì ảnh hưởng quyền lớn).
  4. Sửa NextAuth `authorize()`/`session` callback: chặn login nếu `user.banned === true`.
- **DoD:** ban 1 user → user đó login lại thất bại; xem `/admin/audit-logs` thấy đúng dòng log vừa tạo.

#### Bước 9.3 — Quản lý course & payments

- **Mục tiêu:** hoàn thiện nốt các trang admin còn lại.
- **Đọc trước:** không cần đọc thêm.
- **Các bước thực hiện:**
  1. `/admin/courses`: bảng course + `approveCourse`/`adminDeleteCourse`.
  2. `/admin/payments`: bảng payment + filter status/khoảng ngày + tổng doanh thu.
  3. `/admin/audit-logs`: bảng read-only, filter theo user/action.
- **DoD:** cả 3 trang hoạt động đúng filter/pagination, mọi hành động ghi đều xuất hiện trong audit log.

---

### 🧩 GIAI ĐOẠN 10 — Testing & Deploy

#### Bước 10.1 — Unit & Integration test

- **Mục tiêu:** có test bảo vệ phần logic quan trọng nhất.
- **Đọc trước:** Jest cơ bản, Supertest cho test API Express.
- **Các bước thực hiện:**
  1. `npm install -D jest @types/jest ts-jest` (hoặc `vitest` nếu muốn nhẹ hơn).
  2. Unit test cho `calculateFinalPrice` (bước 4.1) — test đủ case: không coupon, percentOff, amountOff, coupon hết hạn.
  3. Supertest cho `GET /health` và `POST /webhooks/stripe` (mock Stripe event).
- **DoD:** `npm test` chạy xanh hết, coverage tối thiểu bao được các hàm business logic chính.

#### Bước 10.2 — E2E test với Playwright

- **Mục tiêu:** test toàn bộ flow người dùng thật, tự động hóa được.
- **Đọc trước:** Playwright test cơ bản (`page.goto`, `page.click`, `expect`).
- **Các bước thực hiện:**
  1. `npm install -D @playwright/test`, `npx playwright install`.
  2. Viết test flow: đăng ký → mua khóa học (Stripe test mode) → học bài → đánh dấu hoàn thành.
- **DoD:** `npx playwright test` chạy pass toàn bộ flow chính trên trình duyệt headless.

#### Bước 10.3 — Dockerize backend & CI

- **Mục tiêu:** build được image chạy độc lập, tự động test mỗi khi push code.
- **Đọc trước:** Dockerfile cơ bản cho Node.js, GitHub Actions workflow syntax.
- **Các bước thực hiện:**
  1. Viết `Dockerfile` cho `/backend`.
  2. `.github/workflows/ci.yml`: chạy lint + test (10.1, 10.2) mỗi khi có PR.
- **DoD:** push 1 PR thử, thấy CI chạy xanh trên GitHub.

#### Bước 10.4 — Deploy production

- **Mục tiêu:** app truy cập được qua domain thật.
- **Đọc trước:** Vercel deploy Next.js, Railway/Render deploy Docker container + managed Postgres/Redis.
- **Các bước thực hiện:**
  1. Deploy frontend lên Vercel, set toàn bộ env vars (DATABASE_URL, NEXTAUTH_SECRET, STRIPE keys...).
  2. Deploy backend + Postgres + Redis lên Railway/Render.
  3. Đổi webhook URL trong Stripe Dashboard sang domain backend thật.
  4. Test lại toàn bộ flow chính trên production với Stripe test mode.
- **DoD:** flow mua khóa học chạy được end-to-end trên domain thật, không lỗi CORS/env.

---

## 9. Phụ lục: Tổng hợp công nghệ & kiến thức học được

| Công nghệ                             | Dùng ở giai đoạn | Học được gì                                  |
| ------------------------------------- | ---------------- | -------------------------------------------- |
| App Router (Next.js)                  | 1                | Layouts, nested/dynamic routes, route groups |
| Server Components / Client Components | 1, 3, 6          | Khi nào dùng cái nào, tối ưu bundle          |
| Server Actions                        | 1-9              | Mutate data không cần viết REST riêng        |
| Zod                                   | 1-9              | Schema validation dùng chung                 |
| ISR / SSG                             | 1, 5, 8          | Chiến lược render theo use-case              |
| NextAuth.js                           | 2                | Session, OAuth, Credentials provider         |
| Middleware/Proxy                      | 2, 5, 9          | Auth check tầng route                        |
| Stripe                                | 4                | Checkout Session, webhook signature          |
| Express.js                            | 4, 6, 7          | Routing, middleware pattern của Node.js      |
| S3 Presigned URL                      | 5                | Upload file lớn không qua server chính       |
| Socket.io                             | 6                | Room, namespace, real-time broadcast         |
| Redis                                 | 6, 7, 8          | Cache, pub/sub cho queue                     |
| BullMQ                                | 7                | Queue, worker, retry, cron job               |
| Postgres full-text search             | 8                | `tsvector`, index tìm kiếm                   |
| Docker + GitHub Actions               | 10               | Container hóa, CI/CD                         |
| Jest / Supertest / Playwright         | 10               | Unit, integration, E2E testing               |

---

_Hết tài liệu. Mục 8 là kim chỉ nam khi code — làm đúng thứ tự 1.1 → 10.4, mỗi
bước xong đủ DoD mới qua bước tiếp theo. Mục 5 là nguồn tham chiếu chi tiết
khi cần biết chính xác 1 trang phải làm gì; mục 6 là nguồn tham chiếu khi cần
biết 1 hành động cụ thể nên đặt ở Server Action, Route Handler, hay backend
Express._
