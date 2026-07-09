import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { config } from "dotenv";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const envPaths = [
  resolve(process.cwd(), ".env"),
  resolve(process.cwd(), "../../.env"),
];

const envPath = envPaths.find((p) => existsSync(p));
if (envPath) {
  config({ path: envPath });
}

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seed() {
  // ──────────────────────────────────────────────
  // 1. Users (5 users)
  // ──────────────────────────────────────────────
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "john.doe@example.com" },
      update: {},
      create: {
        email: "john.doe@example.com",
        name: "John Doe",
        password: "hashed_password_1",
        avatarUrl: "https://example.com/avatars/john.jpg",
        bio: "Experienced software engineer and instructor.",
        role: "instructor",
        emailVerified: false,
        createdAt: new Date("2026-01-15T08:00:00.000Z"),
        updatedAt: new Date("2026-06-20T10:30:00.000Z"),
      },
    }),
    prisma.user.upsert({
      where: { email: "jane.smith@example.com" },
      update: {},
      create: {
        email: "jane.smith@example.com",
        name: "Jane Smith",
        password: "hashed_password_2",
        avatarUrl: "https://example.com/avatars/jane.jpg",
        bio: "Full-stack developer passionate about teaching.",
        role: "instructor",
        emailVerified: false,
        createdAt: new Date("2026-02-20T09:00:00.000Z"),
        updatedAt: new Date("2026-06-18T14:00:00.000Z"),
      },
    }),
    prisma.user.upsert({
      where: { email: "alice.wong@example.com" },
      update: {},
      create: {
        email: "alice.wong@example.com",
        name: "Alice Wong",
        password: "hashed_password_3",
        avatarUrl: "https://example.com/avatars/alice.jpg",
        bio: "Eager student learning web development.",
        role: "student",
        emailVerified: false,
        createdAt: new Date("2026-03-10T10:00:00.000Z"),
        updatedAt: new Date("2026-06-15T09:00:00.000Z"),
      },
    }),
    prisma.user.upsert({
      where: { email: "bob.johnson@example.com" },
      update: {},
      create: {
        email: "bob.johnson@example.com",
        name: "Bob Johnson",
        password: "hashed_password_4",
        avatarUrl: "https://example.com/avatars/bob.jpg",
        bio: "Data science enthusiast.",
        role: "student",
        emailVerified: false,
        createdAt: new Date("2026-03-25T11:00:00.000Z"),
        updatedAt: new Date("2026-06-10T08:00:00.000Z"),
      },
    }),
    prisma.user.upsert({
      where: { email: "admin@skillhub.com" },
      update: {},
      create: {
        email: "admin@skillhub.com",
        name: "Admin",
        password: "hashed_password_admin",
        avatarUrl: "https://example.com/avatars/admin.jpg",
        bio: "Platform administrator.",
        role: "admin",
        emailVerified: false,
        createdAt: new Date("2026-01-01T00:00:00.000Z"),
        updatedAt: new Date("2026-07-01T12:00:00.000Z"),
      },
    }),
    prisma.user.upsert({
      where: { email: "mike.brown@example.com" },
      update: {},
      create: {
        email: "mike.brown@example.com",
        name: "Mike Brown",
        password: "hashed_password_6",
        avatarUrl: "https://example.com/avatars/mike.jpg",
        bio: "Senior DevOps engineer and cloud architect.",
        role: "instructor",
        emailVerified: false,
        createdAt: new Date("2026-04-01T08:00:00.000Z"),
        updatedAt: new Date("2026-06-25T10:00:00.000Z"),
      },
    }),
    prisma.user.upsert({
      where: { email: "sarah.lee@example.com" },
      update: {},
      create: {
        email: "sarah.lee@example.com",
        name: "Sarah Lee",
        password: "hashed_password_7",
        avatarUrl: "https://example.com/avatars/sarah.jpg",
        bio: "UI/UX designer turned frontend developer.",
        role: "instructor",
        emailVerified: false,
        createdAt: new Date("2026-04-10T09:00:00.000Z"),
        updatedAt: new Date("2026-06-22T11:00:00.000Z"),
      },
    }),
    prisma.user.upsert({
      where: { email: "david.chen@example.com" },
      update: {},
      create: {
        email: "david.chen@example.com",
        name: "David Chen",
        password: "hashed_password_8",
        avatarUrl: "https://example.com/avatars/david.jpg",
        bio: "Computer science student exploring AI.",
        role: "student",
        emailVerified: false,
        createdAt: new Date("2026-04-15T10:00:00.000Z"),
        updatedAt: new Date("2026-06-20T09:00:00.000Z"),
      },
    }),
    prisma.user.upsert({
      where: { email: "emma.wilson@example.com" },
      update: {},
      create: {
        email: "emma.wilson@example.com",
        name: "Emma Wilson",
        password: "hashed_password_9",
        avatarUrl: "https://example.com/avatars/emma.jpg",
        bio: "Marketing professional learning web development.",
        role: "student",
        emailVerified: false,
        createdAt: new Date("2026-04-20T11:00:00.000Z"),
        updatedAt: new Date("2026-06-18T08:00:00.000Z"),
      },
    }),
    prisma.user.upsert({
      where: { email: "james.taylor@example.com" },
      update: {},
      create: {
        email: "james.taylor@example.com",
        name: "James Taylor",
        password: "hashed_password_10",
        avatarUrl: "https://example.com/avatars/james.jpg",
        bio: "Backend developer specializing in microservices.",
        role: "instructor",
        emailVerified: false,
        createdAt: new Date("2026-05-01T08:00:00.000Z"),
        updatedAt: new Date("2026-06-15T10:00:00.000Z"),
      },
    }),
    prisma.user.upsert({
      where: { email: "olivia.martin@example.com" },
      update: {},
      create: {
        email: "olivia.martin@example.com",
        name: "Olivia Martin",
        password: "hashed_password_11",
        avatarUrl: "https://example.com/avatars/olivia.jpg",
        bio: "Mobile app developer learning Flutter and Swift.",
        role: "student",
        emailVerified: false,
        createdAt: new Date("2026-05-05T09:00:00.000Z"),
        updatedAt: new Date("2026-06-12T11:00:00.000Z"),
      },
    }),
    prisma.user.upsert({
      where: { email: "liam.garcia@example.com" },
      update: {},
      create: {
        email: "liam.garcia@example.com",
        name: "Liam Garcia",
        password: "hashed_password_12",
        avatarUrl: "https://example.com/avatars/liam.jpg",
        bio: "Data analyst transitioning to data engineering.",
        role: "student",
        emailVerified: false,
        createdAt: new Date("2026-05-10T10:00:00.000Z"),
        updatedAt: new Date("2026-06-10T09:00:00.000Z"),
      },
    }),
    prisma.user.upsert({
      where: { email: "sophia.rodriguez@example.com" },
      update: {},
      create: {
        email: "sophia.rodriguez@example.com",
        name: "Sophia Rodriguez",
        password: "hashed_password_13",
        avatarUrl: "https://example.com/avatars/sophia.jpg",
        bio: "Full-stack developer and tech blogger.",
        role: "instructor",
        emailVerified: false,
        createdAt: new Date("2026-05-15T08:00:00.000Z"),
        updatedAt: new Date("2026-06-08T10:00:00.000Z"),
      },
    }),
    prisma.user.upsert({
      where: { email: "ethan.anderson@example.com" },
      update: {},
      create: {
        email: "ethan.anderson@example.com",
        name: "Ethan Anderson",
        password: "hashed_password_14",
        avatarUrl: "https://example.com/avatars/ethan.jpg",
        bio: "Cybersecurity enthusiast and penetration tester.",
        role: "student",
        emailVerified: false,
        createdAt: new Date("2026-05-20T11:00:00.000Z"),
        updatedAt: new Date("2026-06-05T08:00:00.000Z"),
      },
    }),
    prisma.user.upsert({
      where: { email: "ava.thompson@example.com" },
      update: {},
      create: {
        email: "ava.thompson@example.com",
        name: "Ava Thompson",
        password: "hashed_password_15",
        avatarUrl: "https://example.com/avatars/ava.jpg",
        bio: "Product manager learning technical skills.",
        role: "student",
        emailVerified: false,
        createdAt: new Date("2026-05-25T09:00:00.000Z"),
        updatedAt: new Date("2026-06-03T10:00:00.000Z"),
      },
    }),
    prisma.user.upsert({
      where: { email: "noah.white@example.com" },
      update: {},
      create: {
        email: "noah.white@example.com",
        name: "Noah White",
        password: "hashed_password_16",
        avatarUrl: "https://example.com/avatars/noah.jpg",
        bio: "Recent graduate looking to break into tech.",
        role: "student",
        emailVerified: false,
        createdAt: new Date("2026-06-01T10:00:00.000Z"),
        updatedAt: new Date("2026-06-01T10:00:00.000Z"),
      },
    }),
    prisma.user.upsert({
      where: { email: "mia.harris@example.com" },
      update: {},
      create: {
        email: "mia.harris@example.com",
        name: "Mia Harris",
        password: "hashed_password_17",
        avatarUrl: "https://example.com/avatars/mia.jpg",
        bio: "Experienced instructor teaching cloud technologies.",
        role: "instructor",
        emailVerified: false,
        createdAt: new Date("2026-06-05T08:00:00.000Z"),
        updatedAt: new Date("2026-06-05T08:00:00.000Z"),
      },
    }),
    prisma.user.upsert({
      where: { email: "lucas.clark@example.com" },
      update: {},
      create: {
        email: "lucas.clark@example.com",
        name: "Lucas Clark",
        password: "hashed_password_18",
        avatarUrl: "https://example.com/avatars/lucas.jpg",
        bio: "Game developer learning AI and machine learning.",
        role: "student",
        emailVerified: false,
        createdAt: new Date("2026-06-10T09:00:00.000Z"),
        updatedAt: new Date("2026-06-10T09:00:00.000Z"),
      },
    }),
    prisma.user.upsert({
      where: { email: "isabella.lewis@example.com" },
      update: {},
      create: {
        email: "isabella.lewis@example.com",
        name: "Isabella Lewis",
        password: "hashed_password_19",
        avatarUrl: "https://example.com/avatars/isabella.jpg",
        bio: "Freelance web designer expanding into development.",
        role: "student",
        emailVerified: false,
        createdAt: new Date("2026-06-15T10:00:00.000Z"),
        updatedAt: new Date("2026-06-15T10:00:00.000Z"),
      },
    }),
  ]);

  // ──────────────────────────────────────────────
  // 2. Categories (5 categories)
  // ──────────────────────────────────────────────
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "web-development" },
      update: {},
      create: { name: "Web Development", slug: "web-development" },
    }),
    prisma.category.upsert({
      where: { slug: "data-science" },
      update: {},
      create: { name: "Data Science", slug: "data-science" },
    }),
    prisma.category.upsert({
      where: { slug: "mobile-development" },
      update: {},
      create: { name: "Mobile Development", slug: "mobile-development" },
    }),
    prisma.category.upsert({
      where: { slug: "devops" },
      update: {},
      create: { name: "DevOps", slug: "devops" },
    }),
    prisma.category.upsert({
      where: { slug: "design" },
      update: {},
      create: { name: "Design", slug: "design" },
    }),
    prisma.category.upsert({
      where: { slug: "artificial-intelligence" },
      update: {},
      create: { name: "Artificial Intelligence", slug: "artificial-intelligence" },
    }),
    prisma.category.upsert({
      where: { slug: "cybersecurity" },
      update: {},
      create: { name: "Cybersecurity", slug: "cybersecurity" },
    }),
    prisma.category.upsert({
      where: { slug: "cloud-computing" },
      update: {},
      create: { name: "Cloud Computing", slug: "cloud-computing" },
    }),
    prisma.category.upsert({
      where: { slug: "blockchain" },
      update: {},
      create: { name: "Blockchain", slug: "blockchain" },
    }),
    prisma.category.upsert({
      where: { slug: "game-development" },
      update: {},
      create: { name: "Game Development", slug: "game-development" },
    }),
    prisma.category.upsert({
      where: { slug: "software-testing" },
      update: {},
      create: { name: "Software Testing", slug: "software-testing" },
    }),
  ]);

  // ──────────────────────────────────────────────
  // 3. Tags (5 tags)
  // ──────────────────────────────────────────────
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { name: "JavaScript" },
      update: {},
      create: { name: "JavaScript" },
    }),
    prisma.tag.upsert({
      where: { name: "Python" },
      update: {},
      create: { name: "Python" },
    }),
    prisma.tag.upsert({
      where: { name: "React" },
      update: {},
      create: { name: "React" },
    }),
    prisma.tag.upsert({
      where: { name: "Node.js" },
      update: {},
      create: { name: "Node.js" },
    }),
    prisma.tag.upsert({
      where: { name: "TypeScript" },
      update: {},
      create: { name: "TypeScript" },
    }),
    prisma.tag.upsert({
      where: { name: "Next.js" },
      update: {},
      create: { name: "Next.js" },
    }),
    prisma.tag.upsert({
      where: { name: "Docker" },
      update: {},
      create: { name: "Docker" },
    }),
    prisma.tag.upsert({
      where: { name: "SQL" },
      update: {},
      create: { name: "SQL" },
    }),
    prisma.tag.upsert({
      where: { name: "GraphQL" },
      update: {},
      create: { name: "GraphQL" },
    }),
    prisma.tag.upsert({
      where: { name: "AWS" },
      update: {},
      create: { name: "AWS" },
    }),
    prisma.tag.upsert({
      where: { name: "Flutter" },
      update: {},
      create: { name: "Flutter" },
    }),
    prisma.tag.upsert({
      where: { name: "Go" },
      update: {},
      create: { name: "Go" },
    }),
    prisma.tag.upsert({
      where: { name: "Rust" },
      update: {},
      create: { name: "Rust" },
    }),
    prisma.tag.upsert({
      where: { name: "Kubernetes" },
      update: {},
      create: { name: "Kubernetes" },
    }),
  ]);

  // ──────────────────────────────────────────────
  // 4. Courses (5 courses)
  // ──────────────────────────────────────────────
  const courses = await Promise.all([
    prisma.course.upsert({
      where: { slug: "react-for-beginners" },
      update: {},
      create: {
        title: "React for Beginners",
        slug: "react-for-beginners",
        description:
          "Learn React from scratch. Build modern web applications with hooks, context, and more.",
        thumbnail: "https://example.com/thumbnails/react-beginners.jpg",
        price: 49.99,
        level: "beginner",
        published: true,
        instructorId: users[0].id,
        categoryId: categories[0].id,
      },
    }),
    prisma.course.upsert({
      where: { slug: "python-data-science" },
      update: {},
      create: {
        title: "Python for Data Science",
        slug: "python-data-science",
        description:
          "Master data analysis, visualization, and machine learning with Python.",
        thumbnail: "https://example.com/thumbnails/python-data-science.jpg",
        price: 59.99,
        level: "intermediate",
        published: true,
        instructorId: users[1].id,
        categoryId: categories[1].id,
      },
    }),
    prisma.course.upsert({
      where: { slug: "node-js-masterclass" },
      update: {},
      create: {
        title: "Node.js Masterclass",
        slug: "node-js-masterclass",
        description:
          "Build scalable backend services and APIs with Node.js and Express.",
        thumbnail: "https://example.com/thumbnails/nodejs-masterclass.jpg",
        price: 69.99,
        level: "advanced",
        published: true,
        instructorId: users[0].id,
        categoryId: categories[0].id,
      },
    }),
    prisma.course.upsert({
      where: { slug: "flutter-mobile-apps" },
      update: {},
      create: {
        title: "Flutter Mobile Apps",
        slug: "flutter-mobile-apps",
        description:
          "Create beautiful cross-platform mobile applications with Flutter and Dart.",
        thumbnail: "https://example.com/thumbnails/flutter-apps.jpg",
        price: 39.99,
        level: "beginner",
        published: false,
        instructorId: users[1].id,
        categoryId: categories[2].id,
      },
    }),
    prisma.course.upsert({
      where: { slug: "docker-kubernetes-devops" },
      update: {},
      create: {
        title: "Docker & Kubernetes for DevOps",
        slug: "docker-kubernetes-devops",
        description:
          "Learn containerization and orchestration with Docker and Kubernetes.",
        thumbnail: "https://example.com/thumbnails/docker-k8s.jpg",
        price: 79.99,
        level: "intermediate",
        published: true,
        instructorId: users[0].id,
        categoryId: categories[3].id,
      },
    }),
    prisma.course.upsert({
      where: { slug: "nextjs-fullstack" },
      update: {},
      create: {
        title: "Next.js Full-Stack Development",
        slug: "nextjs-fullstack",
        description:
          "Build production-ready full-stack applications with Next.js, Prisma, and PostgreSQL.",
        thumbnail: "https://example.com/thumbnails/nextjs-fullstack.jpg",
        price: 59.99,
        level: "intermediate",
        published: true,
        instructorId: users[5].id,
        categoryId: categories[0].id,
      },
    }),
    prisma.course.upsert({
      where: { slug: "machine-learning-101" },
      update: {},
      create: {
        title: "Machine Learning 101",
        slug: "machine-learning-101",
        description:
          "Understand the fundamentals of machine learning with scikit-learn and TensorFlow.",
        thumbnail: "https://example.com/thumbnails/ml-101.jpg",
        price: 69.99,
        level: "beginner",
        published: true,
        instructorId: users[1].id,
        categoryId: categories[5].id,
      },
    }),
    prisma.course.upsert({
      where: { slug: "aws-cloud-practitioner" },
      update: {},
      create: {
        title: "AWS Cloud Practitioner",
        slug: "aws-cloud-practitioner",
        description:
          "Prepare for the AWS Certified Cloud Practitioner exam with hands-on labs.",
        thumbnail: "https://example.com/thumbnails/aws-cloud.jpg",
        price: 89.99,
        level: "beginner",
        published: true,
        instructorId: users[5].id,
        categoryId: categories[7].id,
      },
    }),
    prisma.course.upsert({
      where: { slug: "typescript-design-patterns" },
      update: {},
      create: {
        title: "TypeScript Design Patterns",
        slug: "typescript-design-patterns",
        description:
          "Master GoF design patterns and modern TypeScript programming techniques.",
        thumbnail: "https://example.com/thumbnails/ts-patterns.jpg",
        price: 49.99,
        level: "advanced",
        published: true,
        instructorId: users[6].id,
        categoryId: categories[0].id,
      },
    }),
    prisma.course.upsert({
      where: { slug: "cybersecurity-fundamentals" },
      update: {},
      create: {
        title: "Cybersecurity Fundamentals",
        slug: "cybersecurity-fundamentals",
        description:
          "Learn network security, cryptography, and ethical hacking basics.",
        thumbnail: "https://example.com/thumbnails/cybersecurity.jpg",
        price: 74.99,
        level: "beginner",
        published: true,
        instructorId: users[9].id,
        categoryId: categories[6].id,
      },
    }),
    prisma.course.upsert({
      where: { slug: "go-programming-language" },
      update: {},
      create: {
        title: "Go Programming Language",
        slug: "go-programming-language",
        description:
          "Learn Go from scratch. Build concurrent, scalable backend services.",
        thumbnail: "https://example.com/thumbnails/go-lang.jpg",
        price: 54.99,
        level: "intermediate",
        published: true,
        instructorId: users[9].id,
        categoryId: categories[0].id,
      },
    }),
    prisma.course.upsert({
      where: { slug: "react-native-mobile" },
      update: {},
      create: {
        title: "React Native Mobile Development",
        slug: "react-native-mobile",
        description:
          "Build cross-platform mobile apps for iOS and Android with React Native.",
        thumbnail: "https://example.com/thumbnails/react-native.jpg",
        price: 64.99,
        level: "intermediate",
        published: true,
        instructorId: users[6].id,
        categoryId: categories[2].id,
      },
    }),
    prisma.course.upsert({
      where: { slug: "sql-database-design" },
      update: {},
      create: {
        title: "SQL & Database Design",
        slug: "sql-database-design",
        description:
          "Master SQL queries, database normalization, and data modeling.",
        thumbnail: "https://example.com/thumbnails/sql-design.jpg",
        price: 44.99,
        level: "beginner",
        published: true,
        instructorId: users[1].id,
        categoryId: categories[1].id,
      },
    }),
    prisma.course.upsert({
      where: { slug: "graphql-api-development" },
      update: {},
      create: {
        title: "GraphQL API Development",
        slug: "graphql-api-development",
        description:
          "Build flexible and efficient APIs with GraphQL, Apollo, and Node.js.",
        thumbnail: "https://example.com/thumbnails/graphql-api.jpg",
        price: 59.99,
        level: "advanced",
        published: true,
        instructorId: users[12].id,
        categoryId: categories[0].id,
      },
    }),
    prisma.course.upsert({
      where: { slug: "ui-ux-design-principles" },
      update: {},
      create: {
        title: "UI/UX Design Principles",
        slug: "ui-ux-design-principles",
        description:
          "Learn user research, wireframing, prototyping, and visual design.",
        thumbnail: "https://example.com/thumbnails/ui-ux-design.jpg",
        price: 39.99,
        level: "beginner",
        published: true,
        instructorId: users[6].id,
        categoryId: categories[4].id,
      },
    }),
    prisma.course.upsert({
      where: { slug: "blockchain-development" },
      update: {},
      create: {
        title: "Blockchain Development",
        slug: "blockchain-development",
        description:
          "Build decentralized applications with Solidity, Ethereum, and Web3.",
        thumbnail: "https://example.com/thumbnails/blockchain.jpg",
        price: 84.99,
        level: "advanced",
        published: false,
        instructorId: users[12].id,
        categoryId: categories[8].id,
      },
    }),
    prisma.course.upsert({
      where: { slug: "unity-game-development" },
      update: {},
      create: {
        title: "Unity Game Development",
        slug: "unity-game-development",
        description:
          "Create 2D and 3D games with Unity engine and C# scripting.",
        thumbnail: "https://example.com/thumbnails/unity-games.jpg",
        price: 74.99,
        level: "beginner",
        published: true,
        instructorId: users[12].id,
        categoryId: categories[9].id,
      },
    }),
    prisma.course.upsert({
      where: { slug: "software-testing-automation" },
      update: {},
      create: {
        title: "Software Testing & Automation",
        slug: "software-testing-automation",
        description:
          "Learn unit testing, integration testing, and CI/CD pipeline automation.",
        thumbnail: "https://example.com/thumbnails/testing-auto.jpg",
        price: 49.99,
        level: "intermediate",
        published: true,
        instructorId: users[5].id,
        categoryId: categories[10].id,
      },
    }),
    prisma.course.upsert({
      where: { slug: "rust-systems-programming" },
      update: {},
      create: {
        title: "Rust Systems Programming",
        slug: "rust-systems-programming",
        description:
          "Master memory safety, concurrency, and systems programming with Rust.",
        thumbnail: "https://example.com/thumbnails/rust-systems.jpg",
        price: 79.99,
        level: "advanced",
        published: false,
        instructorId: users[9].id,
        categoryId: categories[0].id,
      },
    }),
    prisma.course.upsert({
      where: { slug: "vue-3-composition-api" },
      update: {},
      create: {
        title: "Vue 3 Composition API",
        slug: "vue-3-composition-api",
        description:
          "Learn Vue 3 with Composition API, Pinia, and Vite for modern frontend development.",
        thumbnail: "https://example.com/thumbnails/vue3.jpg",
        price: 44.99,
        level: "intermediate",
        published: true,
        instructorId: users[12].id,
        categoryId: categories[0].id,
      },
    }),
  ]);

  // ──────────────────────────────────────────────
  // 5. CourseTags (5 associations)
  // ──────────────────────────────────────────────
  const courseTags = await Promise.all([
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[0].id, tagId: tags[0].id } },
      update: {},
      create: { courseId: courses[0].id, tagId: tags[0].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[0].id, tagId: tags[2].id } },
      update: {},
      create: { courseId: courses[0].id, tagId: tags[2].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[1].id, tagId: tags[1].id } },
      update: {},
      create: { courseId: courses[1].id, tagId: tags[1].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[2].id, tagId: tags[3].id } },
      update: {},
      create: { courseId: courses[2].id, tagId: tags[3].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[4].id, tagId: tags[4].id } },
      update: {},
      create: { courseId: courses[4].id, tagId: tags[4].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[0].id, tagId: tags[5].id } },
      update: {},
      create: { courseId: courses[0].id, tagId: tags[5].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[1].id, tagId: tags[7].id } },
      update: {},
      create: { courseId: courses[1].id, tagId: tags[7].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[2].id, tagId: tags[4].id } },
      update: {},
      create: { courseId: courses[2].id, tagId: tags[4].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[3].id, tagId: tags[10].id } },
      update: {},
      create: { courseId: courses[3].id, tagId: tags[10].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[4].id, tagId: tags[6].id } },
      update: {},
      create: { courseId: courses[4].id, tagId: tags[6].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[4].id, tagId: tags[13].id } },
      update: {},
      create: { courseId: courses[4].id, tagId: tags[13].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[5].id, tagId: tags[0].id } },
      update: {},
      create: { courseId: courses[5].id, tagId: tags[0].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[5].id, tagId: tags[4].id } },
      update: {},
      create: { courseId: courses[5].id, tagId: tags[4].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[5].id, tagId: tags[5].id } },
      update: {},
      create: { courseId: courses[5].id, tagId: tags[5].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[6].id, tagId: tags[1].id } },
      update: {},
      create: { courseId: courses[6].id, tagId: tags[1].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[6].id, tagId: tags[7].id } },
      update: {},
      create: { courseId: courses[6].id, tagId: tags[7].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[7].id, tagId: tags[9].id } },
      update: {},
      create: { courseId: courses[7].id, tagId: tags[9].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[7].id, tagId: tags[6].id } },
      update: {},
      create: { courseId: courses[7].id, tagId: tags[6].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[8].id, tagId: tags[4].id } },
      update: {},
      create: { courseId: courses[8].id, tagId: tags[4].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[8].id, tagId: tags[0].id } },
      update: {},
      create: { courseId: courses[8].id, tagId: tags[0].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[9].id, tagId: tags[1].id } },
      update: {},
      create: { courseId: courses[9].id, tagId: tags[1].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[9].id, tagId: tags[6].id } },
      update: {},
      create: { courseId: courses[9].id, tagId: tags[6].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[10].id, tagId: tags[11].id } },
      update: {},
      create: { courseId: courses[10].id, tagId: tags[11].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[10].id, tagId: tags[4].id } },
      update: {},
      create: { courseId: courses[10].id, tagId: tags[4].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[11].id, tagId: tags[2].id } },
      update: {},
      create: { courseId: courses[11].id, tagId: tags[2].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[11].id, tagId: tags[0].id } },
      update: {},
      create: { courseId: courses[11].id, tagId: tags[0].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[12].id, tagId: tags[7].id } },
      update: {},
      create: { courseId: courses[12].id, tagId: tags[7].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[12].id, tagId: tags[1].id } },
      update: {},
      create: { courseId: courses[12].id, tagId: tags[1].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[13].id, tagId: tags[8].id } },
      update: {},
      create: { courseId: courses[13].id, tagId: tags[8].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[13].id, tagId: tags[3].id } },
      update: {},
      create: { courseId: courses[13].id, tagId: tags[3].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[14].id, tagId: tags[0].id } },
      update: {},
      create: { courseId: courses[14].id, tagId: tags[0].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[14].id, tagId: tags[2].id } },
      update: {},
      create: { courseId: courses[14].id, tagId: tags[2].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[15].id, tagId: tags[1].id } },
      update: {},
      create: { courseId: courses[15].id, tagId: tags[1].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[16].id, tagId: tags[0].id } },
      update: {},
      create: { courseId: courses[16].id, tagId: tags[0].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[17].id, tagId: tags[1].id } },
      update: {},
      create: { courseId: courses[17].id, tagId: tags[1].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[18].id, tagId: tags[12].id } },
      update: {},
      create: { courseId: courses[18].id, tagId: tags[12].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[19].id, tagId: tags[12].id } },
      update: {},
      create: { courseId: courses[19].id, tagId: tags[12].id },
    }),
    prisma.courseTag.upsert({
      where: { courseId_tagId: { courseId: courses[19].id, tagId: tags[11].id } },
      update: {},
      create: { courseId: courses[19].id, tagId: tags[11].id },
    }),
  ]);

  // ──────────────────────────────────────────────
  // 6. Lessons (5 lessons)
  // ──────────────────────────────────────────────
  const lessons = await Promise.all([
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[0].id, order: 1 } },
      update: {},
      create: {
        title: "Introduction to React",
        order: 1,
        videoUrl: "https://example.com/videos/react-intro.mp4",
        content: "In this lesson we cover the basics of React and JSX.",
        durationSec: 1200,
        isFreePreview: true,
        courseId: courses[0].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[0].id, order: 2 } },
      update: {},
      create: {
        title: "Components and Props",
        order: 2,
        videoUrl: "https://example.com/videos/react-components.mp4",
        content: "Learn how to create reusable components and pass props.",
        durationSec: 1500,
        isFreePreview: false,
        courseId: courses[0].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[1].id, order: 1 } },
      update: {},
      create: {
        title: "NumPy Fundamentals",
        order: 1,
        videoUrl: "https://example.com/videos/numpy.mp4",
        content: "Get started with NumPy arrays and basic operations.",
        durationSec: 1800,
        isFreePreview: true,
        courseId: courses[1].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[2].id, order: 1 } },
      update: {},
      create: {
        title: "Setting Up Node.js",
        order: 1,
        videoUrl: "https://example.com/videos/node-setup.mp4",
        content: "Install Node.js and set up your first project.",
        durationSec: 900,
        isFreePreview: true,
        courseId: courses[2].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[4].id, order: 1 } },
      update: {},
      create: {
        title: "Docker Basics",
        order: 1,
        videoUrl: "https://example.com/videos/docker-basics.mp4",
        content: "Understand Docker containers, images, and Dockerfiles.",
        durationSec: 2100,
        isFreePreview: false,
        courseId: courses[4].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[0].id, order: 3 } },
      update: {},
      create: {
        title: "State Management with Hooks",
        order: 3,
        videoUrl: "https://example.com/videos/react-state.mp4",
        content: "Learn useState, useEffect, and custom hooks.",
        durationSec: 1800,
        isFreePreview: false,
        courseId: courses[0].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[0].id, order: 4 } },
      update: {},
      create: {
        title: "React Router and Navigation",
        order: 4,
        videoUrl: "https://example.com/videos/react-router.mp4",
        content: "Implement client-side routing with React Router.",
        durationSec: 1500,
        isFreePreview: false,
        courseId: courses[0].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[1].id, order: 2 } },
      update: {},
      create: {
        title: "Pandas Data Manipulation",
        order: 2,
        videoUrl: "https://example.com/videos/pandas.mp4",
        content: "Explore data frames, filtering, and aggregation with Pandas.",
        durationSec: 2400,
        isFreePreview: false,
        courseId: courses[1].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[1].id, order: 3 } },
      update: {},
      create: {
        title: "Data Visualization with Matplotlib",
        order: 3,
        videoUrl: "https://example.com/videos/matplotlib.mp4",
        content: "Create stunning visualizations using Matplotlib and Seaborn.",
        durationSec: 2000,
        isFreePreview: true,
        courseId: courses[1].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[2].id, order: 2 } },
      update: {},
      create: {
        title: "Express.js REST API",
        order: 2,
        videoUrl: "https://example.com/videos/express-api.mp4",
        content: "Build RESTful APIs with Express.js and middleware.",
        durationSec: 2200,
        isFreePreview: false,
        courseId: courses[2].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[2].id, order: 3 } },
      update: {},
      create: {
        title: "Database Integration with Prisma",
        order: 3,
        videoUrl: "https://example.com/videos/prisma.mp4",
        content: "Connect Node.js to PostgreSQL using Prisma ORM.",
        durationSec: 1900,
        isFreePreview: false,
        courseId: courses[2].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[3].id, order: 1 } },
      update: {},
      create: {
        title: "Flutter Widgets Overview",
        order: 1,
        videoUrl: "https://example.com/videos/flutter-widgets.mp4",
        content: "Understand Flutter's widget tree and basic widgets.",
        durationSec: 1600,
        isFreePreview: true,
        courseId: courses[3].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[3].id, order: 2 } },
      update: {},
      create: {
        title: "State Management in Flutter",
        order: 2,
        videoUrl: "https://example.com/videos/flutter-state.mp4",
        content: "Learn Provider and Riverpod for state management.",
        durationSec: 2100,
        isFreePreview: false,
        courseId: courses[3].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[4].id, order: 2 } },
      update: {},
      create: {
        title: "Docker Compose and Multi-Container Apps",
        order: 2,
        videoUrl: "https://example.com/videos/docker-compose.mp4",
        content: "Orchestrate multi-container applications with Docker Compose.",
        durationSec: 2500,
        isFreePreview: true,
        courseId: courses[4].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[4].id, order: 3 } },
      update: {},
      create: {
        title: "Kubernetes Pods and Deployments",
        order: 3,
        videoUrl: "https://example.com/videos/k8s-pods.mp4",
        content: "Deploy and manage containerized apps on Kubernetes.",
        durationSec: 2800,
        isFreePreview: false,
        courseId: courses[4].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[5].id, order: 1 } },
      update: {},
      create: {
        title: "Next.js Project Setup",
        order: 1,
        videoUrl: "https://example.com/videos/nextjs-setup.mp4",
        content: "Initialize a Next.js project with TypeScript and Tailwind.",
        durationSec: 1100,
        isFreePreview: true,
        courseId: courses[5].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[5].id, order: 2 } },
      update: {},
      create: {
        title: "Pages and Layouts",
        order: 2,
        videoUrl: "https://example.com/videos/nextjs-pages.mp4",
        content: "Create pages, layouts, and navigation in Next.js.",
        durationSec: 1400,
        isFreePreview: false,
        courseId: courses[5].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[5].id, order: 3 } },
      update: {},
      create: {
        title: "API Routes and Server Actions",
        order: 3,
        videoUrl: "https://example.com/videos/nextjs-api.mp4",
        content: "Build API endpoints and use server actions in Next.js.",
        durationSec: 1700,
        isFreePreview: false,
        courseId: courses[5].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[6].id, order: 1 } },
      update: {},
      create: {
        title: "Introduction to Machine Learning",
        order: 1,
        videoUrl: "https://example.com/videos/ml-intro.mp4",
        content: "Understand supervised vs unsupervised learning.",
        durationSec: 1300,
        isFreePreview: true,
        courseId: courses[6].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[6].id, order: 2 } },
      update: {},
      create: {
        title: "Linear Regression with scikit-learn",
        order: 2,
        videoUrl: "https://example.com/videos/ml-regression.mp4",
        content: "Implement linear regression models for prediction.",
        durationSec: 2000,
        isFreePreview: false,
        courseId: courses[6].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[6].id, order: 3 } },
      update: {},
      create: {
        title: "Neural Networks with TensorFlow",
        order: 3,
        videoUrl: "https://example.com/videos/ml-tensorflow.mp4",
        content: "Build and train neural networks using TensorFlow.",
        durationSec: 2600,
        isFreePreview: false,
        courseId: courses[6].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[7].id, order: 1 } },
      update: {},
      create: {
        title: "AWS Cloud Concepts",
        order: 1,
        videoUrl: "https://example.com/videos/aws-concepts.mp4",
        content: "Learn AWS global infrastructure and core services.",
        durationSec: 1500,
        isFreePreview: true,
        courseId: courses[7].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[7].id, order: 2 } },
      update: {},
      create: {
        title: "EC2 and Compute Services",
        order: 2,
        videoUrl: "https://example.com/videos/aws-ec2.mp4",
        content: "Launch and manage EC2 instances for applications.",
        durationSec: 1900,
        isFreePreview: false,
        courseId: courses[7].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[7].id, order: 3 } },
      update: {},
      create: {
        title: "S3 and Storage Solutions",
        order: 3,
        videoUrl: "https://example.com/videos/aws-s3.mp4",
        content: "Store and retrieve data using Amazon S3.",
        durationSec: 1600,
        isFreePreview: false,
        courseId: courses[7].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[8].id, order: 1 } },
      update: {},
      create: {
        title: "TypeScript Advanced Types",
        order: 1,
        videoUrl: "https://example.com/videos/ts-advanced.mp4",
        content: "Explore generics, conditional types, and mapped types.",
        durationSec: 1800,
        isFreePreview: true,
        courseId: courses[8].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[8].id, order: 2 } },
      update: {},
      create: {
        title: "Creational Design Patterns",
        order: 2,
        videoUrl: "https://example.com/videos/ts-creational.mp4",
        content: "Implement Singleton, Factory, and Builder patterns.",
        durationSec: 2100,
        isFreePreview: false,
        courseId: courses[8].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[8].id, order: 3 } },
      update: {},
      create: {
        title: "Structural and Behavioral Patterns",
        order: 3,
        videoUrl: "https://example.com/videos/ts-structural.mp4",
        content: "Apply Decorator, Observer, and Strategy patterns.",
        durationSec: 2300,
        isFreePreview: false,
        courseId: courses[8].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[9].id, order: 1 } },
      update: {},
      create: {
        title: "Network Security Basics",
        order: 1,
        videoUrl: "https://example.com/videos/cyber-network.mp4",
        content: "Understand firewalls, VPNs, and network segmentation.",
        durationSec: 1700,
        isFreePreview: true,
        courseId: courses[9].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[9].id, order: 2 } },
      update: {},
      create: {
        title: "Cryptography Fundamentals",
        order: 2,
        videoUrl: "https://example.com/videos/cyber-crypto.mp4",
        content: "Learn symmetric and asymmetric encryption techniques.",
        durationSec: 2200,
        isFreePreview: false,
        courseId: courses[9].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[9].id, order: 3 } },
      update: {},
      create: {
        title: "Ethical Hacking and Penetration Testing",
        order: 3,
        videoUrl: "https://example.com/videos/cyber-hacking.mp4",
        content: "Conduct penetration tests and vulnerability assessments.",
        durationSec: 3000,
        isFreePreview: false,
        courseId: courses[9].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[10].id, order: 1 } },
      update: {},
      create: {
        title: "Go Syntax and Fundamentals",
        order: 1,
        videoUrl: "https://example.com/videos/go-syntax.mp4",
        content: "Learn Go syntax, variables, and control structures.",
        durationSec: 1400,
        isFreePreview: true,
        courseId: courses[10].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[10].id, order: 2 } },
      update: {},
      create: {
        title: "Concurrency in Go",
        order: 2,
        videoUrl: "https://example.com/videos/go-concurrency.mp4",
        content: "Master goroutines, channels, and sync primitives.",
        durationSec: 2500,
        isFreePreview: false,
        courseId: courses[10].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[11].id, order: 1 } },
      update: {},
      create: {
        title: "React Native Environment Setup",
        order: 1,
        videoUrl: "https://example.com/videos/rn-setup.mp4",
        content: "Set up React Native development environment.",
        durationSec: 1200,
        isFreePreview: true,
        courseId: courses[11].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[11].id, order: 2 } },
      update: {},
      create: {
        title: "Building Native Components",
        order: 2,
        videoUrl: "https://example.com/videos/rn-components.mp4",
        content: "Create reusable native components for mobile apps.",
        durationSec: 1800,
        isFreePreview: false,
        courseId: courses[11].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[12].id, order: 1 } },
      update: {},
      create: {
        title: "SQL SELECT Queries",
        order: 1,
        videoUrl: "https://example.com/videos/sql-select.mp4",
        content: "Write efficient SELECT queries with JOINs and subqueries.",
        durationSec: 1600,
        isFreePreview: true,
        courseId: courses[12].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[12].id, order: 2 } },
      update: {},
      create: {
        title: "Database Normalization",
        order: 2,
        videoUrl: "https://example.com/videos/sql-normalization.mp4",
        content: "Design normalized databases up to 3NF.",
        durationSec: 2000,
        isFreePreview: false,
        courseId: courses[12].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[13].id, order: 1 } },
      update: {},
      create: {
        title: "GraphQL Schema Design",
        order: 1,
        videoUrl: "https://example.com/videos/gql-schema.mp4",
        content: "Design type definitions and resolvers for GraphQL.",
        durationSec: 1900,
        isFreePreview: true,
        courseId: courses[13].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[14].id, order: 1 } },
      update: {},
      create: {
        title: "User Research Methods",
        order: 1,
        videoUrl: "https://example.com/videos/uiux-research.mp4",
        content: "Conduct user interviews, surveys, and usability tests.",
        durationSec: 1500,
        isFreePreview: true,
        courseId: courses[14].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[16].id, order: 1 } },
      update: {},
      create: {
        title: "Unity Editor Basics",
        order: 1,
        videoUrl: "https://example.com/videos/unity-editor.mp4",
        content: "Navigate the Unity editor and understand game objects.",
        durationSec: 1300,
        isFreePreview: true,
        courseId: courses[16].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[17].id, order: 1 } },
      update: {},
      create: {
        title: "Unit Testing with Jest",
        order: 1,
        videoUrl: "https://example.com/videos/testing-jest.mp4",
        content: "Write unit tests using Jest and testing best practices.",
        durationSec: 1700,
        isFreePreview: true,
        courseId: courses[17].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[18].id, order: 1 } },
      update: {},
      create: {
        title: "Rust Ownership and Borrowing",
        order: 1,
        videoUrl: "https://example.com/videos/rust-ownership.mp4",
        content: "Understand Rust's ownership model, borrowing, and lifetimes.",
        durationSec: 2200,
        isFreePreview: true,
        courseId: courses[18].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[18].id, order: 2 } },
      update: {},
      create: {
        title: "Rust Concurrency",
        order: 2,
        videoUrl: "https://example.com/videos/rust-concurrency.mp4",
        content: "Master Rust concurrency with threads, async/await, and channels.",
        durationSec: 2600,
        isFreePreview: false,
        courseId: courses[18].id,
      },
    }),
    prisma.lesson.upsert({
      where: { courseId_order: { courseId: courses[19].id, order: 1 } },
      update: {},
      create: {
        title: "Vue 3 Reactivity System",
        order: 1,
        videoUrl: "https://example.com/videos/vue-reactivity.mp4",
        content: "Learn Vue 3's reactivity system with ref, reactive, and computed.",
        durationSec: 1800,
        isFreePreview: true,
        courseId: courses[19].id,
      },
    }),
  ]);

  // ──────────────────────────────────────────────
  // 7. Enrollments (5 enrollments)
  // ──────────────────────────────────────────────
  const enrollments = await Promise.all([
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[2].id, courseId: courses[0].id } },
      update: {},
      create: { userId: users[2].id, courseId: courses[0].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[2].id, courseId: courses[1].id } },
      update: {},
      create: { userId: users[2].id, courseId: courses[1].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[3].id, courseId: courses[0].id } },
      update: {},
      create: { userId: users[3].id, courseId: courses[0].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[3].id, courseId: courses[2].id } },
      update: {},
      create: { userId: users[3].id, courseId: courses[2].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[2].id, courseId: courses[4].id } },
      update: {},
      create: { userId: users[2].id, courseId: courses[4].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[7].id, courseId: courses[5].id } },
      update: {},
      create: { userId: users[7].id, courseId: courses[5].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[7].id, courseId: courses[6].id } },
      update: {},
      create: { userId: users[7].id, courseId: courses[6].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[8].id, courseId: courses[7].id } },
      update: {},
      create: { userId: users[8].id, courseId: courses[7].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[8].id, courseId: courses[8].id } },
      update: {},
      create: { userId: users[8].id, courseId: courses[8].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[10].id, courseId: courses[9].id } },
      update: {},
      create: { userId: users[10].id, courseId: courses[9].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[10].id, courseId: courses[10].id } },
      update: {},
      create: { userId: users[10].id, courseId: courses[10].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[11].id, courseId: courses[11].id } },
      update: {},
      create: { userId: users[11].id, courseId: courses[11].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[11].id, courseId: courses[12].id } },
      update: {},
      create: { userId: users[11].id, courseId: courses[12].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[13].id, courseId: courses[13].id } },
      update: {},
      create: { userId: users[13].id, courseId: courses[13].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[13].id, courseId: courses[14].id } },
      update: {},
      create: { userId: users[13].id, courseId: courses[14].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[14].id, courseId: courses[15].id } },
      update: {},
      create: { userId: users[14].id, courseId: courses[15].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[14].id, courseId: courses[16].id } },
      update: {},
      create: { userId: users[14].id, courseId: courses[16].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[15].id, courseId: courses[17].id } },
      update: {},
      create: { userId: users[15].id, courseId: courses[17].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[15].id, courseId: courses[18].id } },
      update: {},
      create: { userId: users[15].id, courseId: courses[18].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[16].id, courseId: courses[19].id } },
      update: {},
      create: { userId: users[16].id, courseId: courses[19].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[17].id, courseId: courses[5].id } },
      update: {},
      create: { userId: users[17].id, courseId: courses[5].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[17].id, courseId: courses[6].id } },
      update: {},
      create: { userId: users[17].id, courseId: courses[6].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[18].id, courseId: courses[7].id } },
      update: {},
      create: { userId: users[18].id, courseId: courses[7].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[18].id, courseId: courses[8].id } },
      update: {},
      create: { userId: users[18].id, courseId: courses[8].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[7].id, courseId: courses[9].id } },
      update: {},
      create: { userId: users[7].id, courseId: courses[9].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[8].id, courseId: courses[10].id } },
      update: {},
      create: { userId: users[8].id, courseId: courses[10].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[10].id, courseId: courses[11].id } },
      update: {},
      create: { userId: users[10].id, courseId: courses[11].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[11].id, courseId: courses[13].id } },
      update: {},
      create: { userId: users[11].id, courseId: courses[13].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[13].id, courseId: courses[17].id } },
      update: {},
      create: { userId: users[13].id, courseId: courses[17].id },
    }),
    prisma.enrollment.upsert({
      where: { userId_courseId: { userId: users[16].id, courseId: courses[19].id } },
      update: {},
      create: { userId: users[16].id, courseId: courses[19].id },
    }),
  ]);

  // ──────────────────────────────────────────────
  // 8. LessonProgress (5 progress records)
  // ──────────────────────────────────────────────
  const lessonProgresses = await Promise.all([
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[0].id,
          lessonId: lessons[0].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 1200,
        enrollmentId: enrollments[0].id,
        lessonId: lessons[0].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[0].id,
          lessonId: lessons[1].id,
        },
      },
      update: {},
      create: {
        completed: false,
        lastPositionSec: 600,
        enrollmentId: enrollments[0].id,
        lessonId: lessons[1].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[1].id,
          lessonId: lessons[2].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 1800,
        enrollmentId: enrollments[1].id,
        lessonId: lessons[2].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[2].id,
          lessonId: lessons[0].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 1200,
        enrollmentId: enrollments[2].id,
        lessonId: lessons[0].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[3].id,
          lessonId: lessons[3].id,
        },
      },
      update: {},
      create: {
        completed: false,
        lastPositionSec: 300,
        enrollmentId: enrollments[3].id,
        lessonId: lessons[3].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[4].id,
          lessonId: lessons[4].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 2100,
        enrollmentId: enrollments[4].id,
        lessonId: lessons[4].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[5].id,
          lessonId: lessons[5].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 1800,
        enrollmentId: enrollments[5].id,
        lessonId: lessons[5].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[5].id,
          lessonId: lessons[6].id,
        },
      },
      update: {},
      create: {
        completed: false,
        lastPositionSec: 500,
        enrollmentId: enrollments[5].id,
        lessonId: lessons[6].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[6].id,
          lessonId: lessons[7].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 2400,
        enrollmentId: enrollments[6].id,
        lessonId: lessons[7].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[6].id,
          lessonId: lessons[8].id,
        },
      },
      update: {},
      create: {
        completed: false,
        lastPositionSec: 800,
        enrollmentId: enrollments[6].id,
        lessonId: lessons[8].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[7].id,
          lessonId: lessons[9].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 2200,
        enrollmentId: enrollments[7].id,
        lessonId: lessons[9].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[7].id,
          lessonId: lessons[10].id,
        },
      },
      update: {},
      create: {
        completed: false,
        lastPositionSec: 400,
        enrollmentId: enrollments[7].id,
        lessonId: lessons[10].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[8].id,
          lessonId: lessons[11].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 1600,
        enrollmentId: enrollments[8].id,
        lessonId: lessons[11].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[8].id,
          lessonId: lessons[12].id,
        },
      },
      update: {},
      create: {
        completed: false,
        lastPositionSec: 700,
        enrollmentId: enrollments[8].id,
        lessonId: lessons[12].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[9].id,
          lessonId: lessons[13].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 2500,
        enrollmentId: enrollments[9].id,
        lessonId: lessons[13].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[9].id,
          lessonId: lessons[14].id,
        },
      },
      update: {},
      create: {
        completed: false,
        lastPositionSec: 900,
        enrollmentId: enrollments[9].id,
        lessonId: lessons[14].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[10].id,
          lessonId: lessons[15].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 1100,
        enrollmentId: enrollments[10].id,
        lessonId: lessons[15].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[10].id,
          lessonId: lessons[16].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 1400,
        enrollmentId: enrollments[10].id,
        lessonId: lessons[16].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[11].id,
          lessonId: lessons[17].id,
        },
      },
      update: {},
      create: {
        completed: false,
        lastPositionSec: 600,
        enrollmentId: enrollments[11].id,
        lessonId: lessons[17].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[12].id,
          lessonId: lessons[18].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 1300,
        enrollmentId: enrollments[12].id,
        lessonId: lessons[18].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[12].id,
          lessonId: lessons[19].id,
        },
      },
      update: {},
      create: {
        completed: false,
        lastPositionSec: 300,
        enrollmentId: enrollments[12].id,
        lessonId: lessons[19].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[13].id,
          lessonId: lessons[20].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 2600,
        enrollmentId: enrollments[13].id,
        lessonId: lessons[20].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[14].id,
          lessonId: lessons[21].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 1500,
        enrollmentId: enrollments[14].id,
        lessonId: lessons[21].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[14].id,
          lessonId: lessons[22].id,
        },
      },
      update: {},
      create: {
        completed: false,
        lastPositionSec: 500,
        enrollmentId: enrollments[14].id,
        lessonId: lessons[22].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[15].id,
          lessonId: lessons[23].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 1900,
        enrollmentId: enrollments[15].id,
        lessonId: lessons[23].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[15].id,
          lessonId: lessons[24].id,
        },
      },
      update: {},
      create: {
        completed: false,
        lastPositionSec: 200,
        enrollmentId: enrollments[15].id,
        lessonId: lessons[24].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[16].id,
          lessonId: lessons[25].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 1800,
        enrollmentId: enrollments[16].id,
        lessonId: lessons[25].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[16].id,
          lessonId: lessons[26].id,
        },
      },
      update: {},
      create: {
        completed: false,
        lastPositionSec: 600,
        enrollmentId: enrollments[16].id,
        lessonId: lessons[26].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[17].id,
          lessonId: lessons[27].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 1700,
        enrollmentId: enrollments[17].id,
        lessonId: lessons[27].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[17].id,
          lessonId: lessons[28].id,
        },
      },
      update: {},
      create: {
        completed: false,
        lastPositionSec: 400,
        enrollmentId: enrollments[17].id,
        lessonId: lessons[28].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[18].id,
          lessonId: lessons[29].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 3000,
        enrollmentId: enrollments[18].id,
        lessonId: lessons[29].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[19].id,
          lessonId: lessons[30].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 1400,
        enrollmentId: enrollments[19].id,
        lessonId: lessons[30].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[19].id,
          lessonId: lessons[31].id,
        },
      },
      update: {},
      create: {
        completed: false,
        lastPositionSec: 800,
        enrollmentId: enrollments[19].id,
        lessonId: lessons[31].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[20].id,
          lessonId: lessons[32].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 1200,
        enrollmentId: enrollments[20].id,
        lessonId: lessons[32].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[20].id,
          lessonId: lessons[33].id,
        },
      },
      update: {},
      create: {
        completed: false,
        lastPositionSec: 300,
        enrollmentId: enrollments[20].id,
        lessonId: lessons[33].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[21].id,
          lessonId: lessons[34].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 1600,
        enrollmentId: enrollments[21].id,
        lessonId: lessons[34].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[22].id,
          lessonId: lessons[35].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 2000,
        enrollmentId: enrollments[22].id,
        lessonId: lessons[35].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[23].id,
          lessonId: lessons[36].id,
        },
      },
      update: {},
      create: {
        completed: false,
        lastPositionSec: 500,
        enrollmentId: enrollments[23].id,
        lessonId: lessons[36].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[24].id,
          lessonId: lessons[37].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 1900,
        enrollmentId: enrollments[24].id,
        lessonId: lessons[37].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[25].id,
          lessonId: lessons[38].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 1500,
        enrollmentId: enrollments[25].id,
        lessonId: lessons[38].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[26].id,
          lessonId: lessons[39].id,
        },
      },
      update: {},
      create: {
        completed: false,
        lastPositionSec: 700,
        enrollmentId: enrollments[26].id,
        lessonId: lessons[39].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[27].id,
          lessonId: lessons[40].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 1700,
        enrollmentId: enrollments[27].id,
        lessonId: lessons[40].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[28].id,
          lessonId: lessons[41].id,
        },
      },
      update: {},
      create: {
        completed: false,
        lastPositionSec: 600,
        enrollmentId: enrollments[28].id,
        lessonId: lessons[41].id,
      },
    }),
    prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollments[29].id,
          lessonId: lessons[42].id,
        },
      },
      update: {},
      create: {
        completed: true,
        lastPositionSec: 1300,
        enrollmentId: enrollments[29].id,
        lessonId: lessons[42].id
      },
    }),
  ]);

  // ──────────────────────────────────────────────
  // 9. Coupons (5 coupons)
  // ──────────────────────────────────────────────
  const coupons = await Promise.all([
    prisma.coupon.upsert({
      where: { code: "WELCOME10" },
      update: {},
      create: {
        code: "WELCOME10",
        percentOff: 10,
        expiresAt: new Date("2027-12-31"),
        maxUses: 100,
        usedCount: 5,
      },
    }),
    prisma.coupon.upsert({
      where: { code: "SUMMER50" },
      update: {},
      create: {
        code: "SUMMER50",
        percentOff: 50,
        expiresAt: new Date("2026-09-30"),
        maxUses: 50,
        usedCount: 20,
      },
    }),
    prisma.coupon.upsert({
      where: { code: "FLAT15" },
      update: {},
      create: {
        code: "FLAT15",
        amountOff: 15.0,
        expiresAt: new Date("2026-12-31"),
        maxUses: 200,
        usedCount: 10,
      },
    }),
    prisma.coupon.upsert({
      where: { code: "BLACKFRIDAY" },
      update: {},
      create: {
        code: "BLACKFRIDAY",
        percentOff: 70,
        expiresAt: new Date("2026-11-30"),
        maxUses: 500,
        usedCount: 120,
      },
    }),
    prisma.coupon.upsert({
      where: { code: "STUDENT20" },
      update: {},
      create: {
        code: "STUDENT20",
        percentOff: 20,
        expiresAt: new Date("2027-06-30"),
        maxUses: 300,
        usedCount: 45,
      },
    }),
    prisma.coupon.upsert({
      where: { code: "NEWYEAR2026" },
      update: {},
      create: {
        code: "NEWYEAR2026",
        percentOff: 30,
        expiresAt: new Date("2026-02-28"),
        maxUses: 150,
        usedCount: 78,
      },
    }),
    prisma.coupon.upsert({
      where: { code: "FLAT10" },
      update: {},
      create: {
        code: "FLAT10",
        amountOff: 10.0,
        expiresAt: new Date("2026-12-31"),
        maxUses: 500,
        usedCount: 200,
      },
    }),
    prisma.coupon.upsert({
      where: { code: "DEVOPS25" },
      update: {},
      create: {
        code: "DEVOPS25",
        percentOff: 25,
        expiresAt: new Date("2026-08-31"),
        maxUses: 100,
        usedCount: 33,
      },
    }),
    prisma.coupon.upsert({
      where: { code: "LEARN15" },
      update: {},
      create: {
        code: "LEARN15",
        percentOff: 15,
        expiresAt: new Date("2027-03-31"),
        maxUses: 250,
        usedCount: 12,
      },
    }),
    prisma.coupon.upsert({
      where: { code: "VIP50" },
      update: {},
      create: {
        code: "VIP50",
        percentOff: 50,
        expiresAt: new Date("2026-06-30"),
        maxUses: 20,
        usedCount: 8,
      },
    }),
    prisma.coupon.upsert({
      where: { code: "FLAT25" },
      update: {},
      create: {
        code: "FLAT25",
        amountOff: 25.0,
        expiresAt: new Date("2026-10-31"),
        maxUses: 75,
        usedCount: 15,
      },
    }),
    prisma.coupon.upsert({
      where: { code: "MOBILE20" },
      update: {},
      create: {
        code: "MOBILE20",
        percentOff: 20,
        expiresAt: new Date("2026-09-30"),
        maxUses: 120,
        usedCount: 42,
      },
    }),
    prisma.coupon.upsert({
      where: { code: "AI30" },
      update: {},
      create: {
        code: "AI30",
        percentOff: 30,
        expiresAt: new Date("2026-12-31"),
        maxUses: 80,
        usedCount: 25,
      },
    }),
    prisma.coupon.upsert({
      where: { code: "WELCOME5" },
      update: {},
      create: {
        code: "WELCOME5",
        amountOff: 5.0,
        expiresAt: new Date("2027-12-31"),
        maxUses: 1000,
        usedCount: 350,
      },
    }),
  ]);

  // ──────────────────────────────────────────────
  // 10. Payments (5 payments)
  // ──────────────────────────────────────────────
  const payments = await Promise.all([
    prisma.payment.upsert({
      where: {
        id: "payment_001",
      },
      update: {},
      create: {
        id: "payment_001",
        amount: 49.99,
        userId: users[2].id,
        courseId: courses[0].id,
        couponId: coupons[0].id,
        status: "succeeded",
        stripeSessionId: "cs_test_001",
      },
    }),
    prisma.payment.upsert({
      where: {
        id: "payment_002",
      },
      update: {},
      create: {
        id: "payment_002",
        amount: 59.99,
        userId: users[2].id,
        courseId: courses[1].id,
        status: "succeeded",
        stripeSessionId: "cs_test_002",
      },
    }),
    prisma.payment.upsert({
      where: {
        id: "payment_003",
      },
      update: {},
      create: {
        id: "payment_003",
        amount: 49.99,
        userId: users[3].id,
        courseId: courses[0].id,
        status: "succeeded",
        stripeSessionId: "cs_test_003",
      },
    }),
    prisma.payment.upsert({
      where: {
        id: "payment_004",
      },
      update: {},
      create: {
        id: "payment_004",
        amount: 69.99,
        userId: users[3].id,
        courseId: courses[2].id,
        status: "pending",
        stripeSessionId: "cs_test_004",
      },
    }),
    prisma.payment.upsert({
      where: {
        id: "payment_005",
      },
      update: {},
      create: {
        id: "payment_005",
        amount: 79.99,
        userId: users[2].id,
        courseId: courses[4].id,
        couponId: coupons[1].id,
        status: "failed",
        stripeSessionId: "cs_test_005",
      },
    }),
    prisma.payment.upsert({
      where: { id: "payment_006" },
      update: {},
      create: {
        id: "payment_006",
        amount: 59.99,
        userId: users[7].id,
        courseId: courses[5].id,
        status: "succeeded",
        stripeSessionId: "cs_test_006",
      },
    }),
    prisma.payment.upsert({
      where: { id: "payment_007" },
      update: {},
      create: {
        id: "payment_007",
        amount: 69.99,
        userId: users[7].id,
        courseId: courses[6].id,
        couponId: coupons[2].id,
        status: "succeeded",
        stripeSessionId: "cs_test_007",
      },
    }),
    prisma.payment.upsert({
      where: { id: "payment_008" },
      update: {},
      create: {
        id: "payment_008",
        amount: 89.99,
        userId: users[8].id,
        courseId: courses[7].id,
        status: "succeeded",
        stripeSessionId: "cs_test_008",
      },
    }),
    prisma.payment.upsert({
      where: { id: "payment_009" },
      update: {},
      create: {
        id: "payment_009",
        amount: 49.99,
        userId: users[8].id,
        courseId: courses[8].id,
        status: "pending",
        stripeSessionId: "cs_test_009",
      },
    }),
    prisma.payment.upsert({
      where: { id: "payment_010" },
      update: {},
      create: {
        id: "payment_010",
        amount: 74.99,
        userId: users[10].id,
        courseId: courses[9].id,
        status: "succeeded",
        stripeSessionId: "cs_test_010",
      },
    }),
    prisma.payment.upsert({
      where: { id: "payment_011" },
      update: {},
      create: {
        id: "payment_011",
        amount: 54.99,
        userId: users[10].id,
        courseId: courses[10].id,
        couponId: coupons[3].id,
        status: "succeeded",
        stripeSessionId: "cs_test_011",
      },
    }),
    prisma.payment.upsert({
      where: { id: "payment_012" },
      update: {},
      create: {
        id: "payment_012",
        amount: 64.99,
        userId: users[11].id,
        courseId: courses[11].id,
        status: "failed",
        stripeSessionId: "cs_test_012",
      },
    }),
    prisma.payment.upsert({
      where: { id: "payment_013" },
      update: {},
      create: {
        id: "payment_013",
        amount: 44.99,
        userId: users[11].id,
        courseId: courses[12].id,
        status: "succeeded",
        stripeSessionId: "cs_test_013",
      },
    }),
    prisma.payment.upsert({
      where: { id: "payment_014" },
      update: {},
      create: {
        id: "payment_014",
        amount: 59.99,
        userId: users[13].id,
        courseId: courses[13].id,
        status: "succeeded",
        stripeSessionId: "cs_test_014",
      },
    }),
    prisma.payment.upsert({
      where: { id: "payment_015" },
      update: {},
      create: {
        id: "payment_015",
        amount: 39.99,
        userId: users[13].id,
        courseId: courses[14].id,
        couponId: coupons[4].id,
        status: "succeeded",
        stripeSessionId: "cs_test_015",
      },
    }),
    prisma.payment.upsert({
      where: { id: "payment_016" },
      update: {},
      create: {
        id: "payment_016",
        amount: 84.99,
        userId: users[14].id,
        courseId: courses[15].id,
        status: "pending",
        stripeSessionId: "cs_test_016",
      },
    }),
    prisma.payment.upsert({
      where: { id: "payment_017" },
      update: {},
      create: {
        id: "payment_017",
        amount: 74.99,
        userId: users[14].id,
        courseId: courses[16].id,
        status: "succeeded",
        stripeSessionId: "cs_test_017",
      },
    }),
    prisma.payment.upsert({
      where: { id: "payment_018" },
      update: {},
      create: {
        id: "payment_018",
        amount: 49.99,
        userId: users[15].id,
        courseId: courses[17].id,
        status: "succeeded",
        stripeSessionId: "cs_test_018",
      },
    }),
    prisma.payment.upsert({
      where: { id: "payment_019" },
      update: {},
      create: {
        id: "payment_019",
        amount: 79.99,
        userId: users[15].id,
        courseId: courses[18].id,
        status: "failed",
        stripeSessionId: "cs_test_019",
      },
    }),
    prisma.payment.upsert({
      where: { id: "payment_020" },
      update: {},
      create: {
        id: "payment_020",
        amount: 79.99,
        userId: users[16].id,
        courseId: courses[19].id,
        couponId: coupons[5].id,
        status: "succeeded",
        stripeSessionId: "cs_test_020",
      },
    }),
    prisma.payment.upsert({
      where: { id: "payment_021" },
      update: {},
      create: {
        id: "payment_021",
        amount: 59.99,
        userId: users[17].id,
        courseId: courses[5].id,
        status: "succeeded",
        stripeSessionId: "cs_test_021",
      },
    }),
    prisma.payment.upsert({
      where: { id: "payment_022" },
      update: {},
      create: {
        id: "payment_022",
        amount: 69.99,
        userId: users[17].id,
        courseId: courses[6].id,
        status: "pending",
        stripeSessionId: "cs_test_022",
      },
    }),
    prisma.payment.upsert({
      where: { id: "payment_023" },
      update: {},
      create: {
        id: "payment_023",
        amount: 89.99,
        userId: users[18].id,
        courseId: courses[7].id,
        status: "succeeded",
        stripeSessionId: "cs_test_023",
      },
    }),
    prisma.payment.upsert({
      where: { id: "payment_024" },
      update: {},
      create: {
        id: "payment_024",
        amount: 49.99,
        userId: users[18].id,
        courseId: courses[8].id,
        couponId: coupons[6].id,
        status: "succeeded",
        stripeSessionId: "cs_test_024",
      },
    }),
    prisma.payment.upsert({
      where: { id: "payment_025" },
      update: {},
      create: {
        id: "payment_025",
        amount: 74.99,
        userId: users[7].id,
        courseId: courses[9].id,
        status: "refunded",
        stripeSessionId: "cs_test_025",
      },
    }),
  ]);

  // ──────────────────────────────────────────────
  // 11. Reviews (5 reviews)
  // ──────────────────────────────────────────────
  const reviews = await Promise.all([
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[2].id, courseId: courses[0].id } },
      update: {},
      create: {
        rating: 5,
        comment: "Excellent course! Very well explained and easy to follow.",
        userId: users[2].id,
        courseId: courses[0].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[3].id, courseId: courses[0].id } },
      update: {},
      create: {
        rating: 4,
        comment: "Great content, but could use more exercises.",
        userId: users[3].id,
        courseId: courses[0].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[2].id, courseId: courses[1].id } },
      update: {},
      create: {
        rating: 4,
        comment: "Good introduction to data science with Python.",
        userId: users[2].id,
        courseId: courses[1].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[3].id, courseId: courses[2].id } },
      update: {},
      create: {
        rating: 5,
        comment: "The Node.js masterclass is fantastic! Highly recommended.",
        userId: users[3].id,
        courseId: courses[2].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[2].id, courseId: courses[4].id } },
      update: {},
      create: {
        rating: 3,
        comment: "Decent course, but some sections are outdated.",
        userId: users[2].id,
        courseId: courses[4].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[7].id, courseId: courses[5].id } },
      update: {},
      create: {
        rating: 5,
        comment: "Next.js fullstack course is amazing! Learned so much.",
        userId: users[7].id,
        courseId: courses[5].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[7].id, courseId: courses[6].id } },
      update: {},
      create: {
        rating: 4,
        comment: "Great ML introduction. The TensorFlow section was excellent.",
        userId: users[7].id,
        courseId: courses[6].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[8].id, courseId: courses[7].id } },
      update: {},
      create: {
        rating: 5,
        comment: "Perfect for AWS certification prep. Very hands-on.",
        userId: users[8].id,
        courseId: courses[7].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[8].id, courseId: courses[8].id } },
      update: {},
      create: {
        rating: 4,
        comment: "TypeScript patterns explained clearly with great examples.",
        userId: users[8].id,
        courseId: courses[8].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[10].id, courseId: courses[9].id } },
      update: {},
      create: {
        rating: 5,
        comment: "Cybersecurity course is very comprehensive and practical.",
        userId: users[10].id,
        courseId: courses[9].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[10].id, courseId: courses[10].id } },
      update: {},
      create: {
        rating: 4,
        comment: "Go course is well-structured. Concurrency section is gold.",
        userId: users[10].id,
        courseId: courses[10].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[11].id, courseId: courses[11].id } },
      update: {},
      create: {
        rating: 3,
        comment: "React Native course is decent but needs updates for newer versions.",
        userId: users[11].id,
        courseId: courses[11].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[11].id, courseId: courses[12].id } },
      update: {},
      create: {
        rating: 5,
        comment: "SQL course is fantastic! Finally understand normalization.",
        userId: users[11].id,
        courseId: courses[12].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[13].id, courseId: courses[13].id } },
      update: {},
      create: {
        rating: 4,
        comment: "GraphQL is explained very well. Good real-world examples.",
        userId: users[13].id,
        courseId: courses[13].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[13].id, courseId: courses[14].id } },
      update: {},
      create: {
        rating: 5,
        comment: "UI/UX design principles course changed my design perspective!",
        userId: users[13].id,
        courseId: courses[14].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[14].id, courseId: courses[15].id } },
      update: {},
      create: {
        rating: 3,
        comment: "Blockchain course is informative but quite advanced for beginners.",
        userId: users[14].id,
        courseId: courses[15].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[14].id, courseId: courses[16].id } },
      update: {},
      create: {
        rating: 5,
        comment: "Unity course is perfect for aspiring game developers!",
        userId: users[14].id,
        courseId: courses[16].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[15].id, courseId: courses[17].id } },
      update: {},
      create: {
        rating: 4,
        comment: "Testing course covers all essential testing frameworks.",
        userId: users[15].id,
        courseId: courses[17].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[15].id, courseId: courses[18].id } },
      update: {},
      create: {
        rating: 2,
        comment: "Rust course is too advanced. Needs more beginner-friendly content.",
        userId: users[15].id,
        courseId: courses[18].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[16].id, courseId: courses[19].id } },
      update: {},
      create: {
        rating: 4,
        comment: "Rust systems programming is challenging but rewarding.",
        userId: users[16].id,
        courseId: courses[19].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[17].id, courseId: courses[5].id } },
      update: {},
      create: {
        rating: 5,
        comment: "Next.js course helped me land my first dev job!",
        userId: users[17].id,
        courseId: courses[5].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[17].id, courseId: courses[6].id } },
      update: {},
      create: {
        rating: 4,
        comment: "ML course is a great starting point for beginners.",
        userId: users[17].id,
        courseId: courses[6].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[18].id, courseId: courses[7].id } },
      update: {},
      create: {
        rating: 5,
        comment: "AWS course is worth every penny. Passed my exam!",
        userId: users[18].id,
        courseId: courses[7].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[18].id, courseId: courses[8].id } },
      update: {},
      create: {
        rating: 3,
        comment: "TypeScript patterns are useful but some examples are complex.",
        userId: users[18].id,
        courseId: courses[8].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[7].id, courseId: courses[9].id } },
      update: {},
      create: {
        rating: 4,
        comment: "Good cybersecurity overview. The hacking lab was fun!",
        userId: users[7].id,
        courseId: courses[9].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[8].id, courseId: courses[10].id } },
      update: {},
      create: {
        rating: 5,
        comment: "Go is now my favorite language thanks to this course!",
        userId: users[8].id,
        courseId: courses[10].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[10].id, courseId: courses[11].id } },
      update: {},
      create: {
        rating: 4,
        comment: "React Native course is good for cross-platform development.",
        userId: users[10].id,
        courseId: courses[11].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[11].id, courseId: courses[13].id } },
      update: {},
      create: {
        rating: 3,
        comment: "GraphQL is powerful but the course could use more exercises.",
        userId: users[11].id,
        courseId: courses[13].id,
      },
    }),
    prisma.review.upsert({
      where: { userId_courseId: { userId: users[13].id, courseId: courses[17].id } },
      update: {},
      create: {
        rating: 5,
        comment: "Software testing course is comprehensive and practical.",
        userId: users[13].id,
        courseId: courses[17].id,
      },
    }),
  ]);

  // ──────────────────────────────────────────────
  // 12. forumPost (5 posts)
  // ──────────────────────────────────────────────
  const forumPost = await Promise.all([
    prisma.forumPost.upsert({
      where: { id: "forum_post_001" },
      update: {},
      create: {
        id: "forum_post_001",
        title: "How to use React hooks effectively?",
        content:
          "I'm struggling with understanding useEffect dependencies. Any tips?",
        userId: users[2].id,
        courseId: courses[0].id,
      },
    }),
    prisma.forumPost.upsert({
      where: { id: "forum_post_002" },
      update: {},
      create: {
        id: "forum_post_002",
        title: "Best practices for data visualization",
        content:
          "What libraries do you recommend for creating interactive charts in Python?",
        userId: users[3].id,
        courseId: courses[1].id,
      },
    }),
    prisma.forumPost.upsert({
      where: { id: "forum_post_003" },
      update: {},
      create: {
        id: "forum_post_003",
        title: "Node.js vs Deno in 2026",
        content:
          "Is it worth switching from Node.js to Deno for new projects?",
        userId: users[2].id,
        courseId: courses[2].id,
      },
    }),
    prisma.forumPost.upsert({
      where: { id: "forum_post_004" },
      update: {},
      create: {
        id: "forum_post_004",
        title: "General discussion about web development",
        content:
          "What are the most in-demand skills for web developers right now?",
        userId: users[3].id,
      },
    }),
    prisma.forumPost.upsert({
      where: { id: "forum_post_005" },
      update: {},
      create: {
        id: "forum_post_005",
        title: "Docker compose networking issues",
        content:
          "Having trouble connecting containers across different networks.",
        userId: users[2].id,
        courseId: courses[4].id,
      },
    }),
    prisma.forumPost.upsert({
      where: { id: "forum_post_006" },
      update: {},
      create: {
        id: "forum_post_006",
        title: "Next.js vs Remix in 2026",
        content: "Which framework is better for production apps?",
        userId: users[7].id,
        courseId: courses[5].id,
      },
    }),
    prisma.forumPost.upsert({
      where: { id: "forum_post_007" },
      update: {},
      create: {
        id: "forum_post_007",
        title: "Best ML datasets for beginners",
        content: "Looking for recommendations on datasets to practice ML.",
        userId: users[8].id,
        courseId: courses[6].id,
      },
    }),
    prisma.forumPost.upsert({
      where: { id: "forum_post_008" },
      update: {},
      create: {
        id: "forum_post_008",
        title: "AWS certification tips",
        content: "What study materials helped you pass the AWS exam?",
        userId: users[10].id,
        courseId: courses[7].id,
      },
    }),
    prisma.forumPost.upsert({
      where: { id: "forum_post_009" },
      update: {},
      create: {
        id: "forum_post_009",
        title: "TypeScript vs JavaScript for large projects",
        content: "Is TypeScript always worth the extra setup?",
        userId: users[11].id,
        courseId: courses[8].id,
      },
    }),
    prisma.forumPost.upsert({
      where: { id: "forum_post_010" },
      update: {},
      create: {
        id: "forum_post_010",
        title: "Best practices for password hashing",
        content: "What hashing algorithms do you recommend in 2026?",
        userId: users[13].id,
        courseId: courses[9].id,
      },
    }),
    prisma.forumPost.upsert({
      where: { id: "forum_post_011" },
      update: {},
      create: {
        id: "forum_post_011",
        title: "Go vs Rust for backend services",
        content: "Trying to decide which language to learn for backend.",
        userId: users[14].id,
        courseId: courses[10].id,
      },
    }),
    prisma.forumPost.upsert({
      where: { id: "forum_post_012" },
      update: {},
      create: {
        id: "forum_post_012",
        title: "React Native vs Flutter in 2026",
        content: "Which cross-platform framework should I choose?",
        userId: users[15].id,
        courseId: courses[11].id,
      },
    }),
    prisma.forumPost.upsert({
      where: { id: "forum_post_013" },
      update: {},
      create: {
        id: "forum_post_013",
        title: "SQL query optimization tips",
        content: "How do you optimize slow SQL queries?",
        userId: users[16].id,
        courseId: courses[12].id,
      },
    }),
    prisma.forumPost.upsert({
      where: { id: "forum_post_014" },
      update: {},
      create: {
        id: "forum_post_014",
        title: "GraphQL vs REST API design",
        content: "When should I use GraphQL over REST?",
        userId: users[17].id,
        courseId: courses[13].id,
      },
    }),
    prisma.forumPost.upsert({
      where: { id: "forum_post_015" },
      update: {},
      create: {
        id: "forum_post_015",
        title: "UI/UX portfolio tips",
        content: "What makes a great design portfolio?",
        userId: users[18].id,
        courseId: courses[14].id,
      },
    }),
    prisma.forumPost.upsert({
      where: { id: "forum_post_016" },
      update: {},
      create: {
        id: "forum_post_016",
        title: "Blockchain scalability solutions",
        content: "How do layer 2 solutions improve blockchain scalability?",
        userId: users[7].id,
        courseId: courses[15].id,
      },
    }),
    prisma.forumPost.upsert({
      where: { id: "forum_post_017" },
      update: {},
      create: {
        id: "forum_post_017",
        title: "Unity vs Unreal Engine",
        content: "Which game engine is better for indie developers?",
        userId: users[8].id,
        courseId: courses[16].id,
      },
    }),
    prisma.forumPost.upsert({
      where: { id: "forum_post_018" },
      update: {},
      create: {
        id: "forum_post_018",
        title: "CI/CD pipeline best practices",
        content: "What tools do you use for automated testing and deployment?",
        userId: users[10].id,
        courseId: courses[17].id,
      },
    }),
    prisma.forumPost.upsert({
      where: { id: "forum_post_019" },
      update: {},
      create: {
        id: "forum_post_019",
        title: "Rust ownership explained",
        content: "Can someone explain Rust's ownership model simply?",
        userId: users[11].id,
        courseId: courses[18].id,
      },
    }),
    prisma.forumPost.upsert({
      where: { id: "forum_post_020" },
      update: {},
      create: {
        id: "forum_post_020",
        title: "Career advice for junior developers",
        content: "What skills should I focus on as a junior developer?",
        userId: users[13].id,
      },
    }),
    prisma.forumPost.upsert({
      where: { id: "forum_post_021" },
      update: {},
      create: {
        id: "forum_post_021",
        title: "Microservices vs Monolith",
        content: "When should I choose microservices over monolith?",
        userId: users[14].id,
        courseId: courses[5].id,
      },
    }),
    prisma.forumPost.upsert({
      where: { id: "forum_post_022" },
      update: {},
      create: {
        id: "forum_post_022",
        title: "Best code editors in 2026",
        content: "VS Code vs JetBrains vs Zed - which one do you use?",
        userId: users[15].id,
      },
    }),
    prisma.forumPost.upsert({
      where: { id: "forum_post_023" },
      update: {},
      create: {
        id: "forum_post_023",
        title: "Learning resources for system design",
        content: "What books or courses do you recommend for system design?",
        userId: users[16].id,
        courseId: courses[17].id,
      },
    }),
    prisma.forumPost.upsert({
      where: { id: "forum_post_024" },
      update: {},
      create: {
        id: "forum_post_024",
        title: "Remote work productivity tips",
        content: "How do you stay productive while working remotely?",
        userId: users[17].id,
      },
    }),
    prisma.forumPost.upsert({
      where: { id: "forum_post_025" },
      update: {},
      create: {
        id: "forum_post_025",
        title: "Open source contribution guide",
        content: "How do I start contributing to open source projects?",
        userId: users[18].id,
        courseId: courses[13].id,
      },
    }),
  ]);

  // ──────────────────────────────────────────────
  // 13. Comments (5 comments)
  // ──────────────────────────────────────────────
  const comments = await Promise.all([
    prisma.comment.upsert({
      where: { id: "comment_001" },
      update: {},
      create: {
        id: "comment_001",
        content:
          "Great question! Try using the eslint plugin for hooks to catch mistakes.",
        userId: users[0].id,
        postId: forumPost[0].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_002" },
      update: {},
      create: {
        id: "comment_002",
        content: "I recommend Plotly for interactive charts!",
        userId: users[1].id,
        postId: forumPost[1].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_003" },
      update: {},
      create: {
        id: "comment_003",
        content:
          "I think Node.js is still the safer choice for production apps.",
        userId: users[0].id,
        postId: forumPost[2].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_004" },
      update: {},
      create: {
        id: "comment_004",
        content:
          "React, TypeScript, and cloud skills are definitely top right now.",
        userId: users[1].id,
        postId: forumPost[3].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_005" },
      update: {},
      create: {
        id: "comment_005",
        content:
          "Check your docker-compose.yml network aliases, that's usually the issue.",
        userId: users[0].id,
        postId: forumPost[4].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_006" },
      update: {},
      create: {
        id: "comment_006",
        content: "I prefer Next.js for its SSR capabilities and developer experience.",
        userId: users[5].id,
        postId: forumPost[5].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_007" },
      update: {},
      create: {
        id: "comment_007",
        content: "Try the Iris dataset, it's perfect for classification beginners.",
        userId: users[1].id,
        postId: forumPost[6].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_008" },
      update: {},
      create: {
        id: "comment_008",
        content: "I used ACloudGuru and passed on my first try!",
        userId: users[5].id,
        postId: forumPost[7].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_009" },
      update: {},
      create: {
        id: "comment_009",
        content: "TypeScript is absolutely worth it for teams and large codebases.",
        userId: users[6].id,
        postId: forumPost[8].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_010" },
      update: {},
      create: {
        id: "comment_010",
        content: "Use bcrypt with a high cost factor for password hashing.",
        userId: users[6].id,
        postId: forumPost[9].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_011" },
      update: {},
      create: {
        id: "comment_011",
        content: "Go is simpler and faster to learn. Rust is more complex but gives you more control.",
        userId: users[5].id,
        postId: forumPost[10].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_012" },
      update: {},
      create: {
        id: "comment_012",
        content: "Flutter has better performance, but React Native has a larger ecosystem.",
        userId: users[9].id,
        postId: forumPost[11].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_013" },
      update: {},
      create: {
        id: "comment_013",
        content: "Use EXPLAIN ANALYZE to find slow queries and add proper indexes.",
        userId: users[1].id,
        postId: forumPost[12].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_014" },
      update: {},
      create: {
        id: "comment_014",
        content: "GraphQL is great when you have complex data requirements and multiple clients.",
        userId: users[12].id,
        postId: forumPost[13].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_015" },
      update: {},
      create: {
        id: "comment_015",
        content: "Showcase your process, not just final designs. Case studies are key!",
        userId: users[6].id,
        postId: forumPost[14].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_016" },
      update: {},
      create: {
        id: "comment_016",
        content: "Layer 2 solutions like Optimistic Rollups and zk-Rollups are game changers.",
        userId: users[12].id,
        postId: forumPost[15].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_017" },
      update: {},
      create: {
        id: "comment_017",
        content: "Unity is more beginner-friendly with better documentation for indie devs.",
        userId: users[12].id,
        postId: forumPost[16].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_018" },
      update: {},
      create: {
        id: "comment_018",
        content: "GitHub Actions and Jenkins are my go-to for CI/CD pipelines.",
        userId: users[5].id,
        postId: forumPost[17].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_019" },
      update: {},
      create: {
        id: "comment_019",
        content: "Think of ownership as each value having exactly one owner at a time.",
        userId: users[9].id,
        postId: forumPost[18].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_020" },
      update: {},
      create: {
        id: "comment_020",
        content: "Focus on fundamentals: data structures, algorithms, and system design.",
        userId: users[0].id,
        postId: forumPost[19].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_021" },
      update: {},
      create: {
        id: "comment_021",
        content: "Start with monolith, extract microservices when you have clear boundaries.",
        userId: users[5].id,
        postId: forumPost[20].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_022" },
      update: {},
      create: {
        id: "comment_022",
        content: "VS Code with the right extensions is unbeatable for web development.",
        userId: users[6].id,
        postId: forumPost[21].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_023" },
      update: {},
      create: {
        id: "comment_023",
        content: "Designing Data-Intensive Applications is a must-read for system design.",
        userId: users[9].id,
        postId: forumPost[22].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_024" },
      update: {},
      create: {
        id: "comment_024",
        content: "Set a routine, use Pomodoro technique, and have a dedicated workspace.",
        userId: users[0].id,
        postId: forumPost[23].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_025" },
      update: {},
      create: {
        id: "comment_025",
        content: "Start with good first issues on GitHub. Many projects label beginner-friendly tasks.",
        userId: users[1].id,
        postId: forumPost[24].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_026" },
      update: {},
      create: {
        id: "comment_026",
        content: "Great discussion! Thanks for sharing your insights.",
        userId: users[5].id,
        postId: forumPost[0].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_027" },
      update: {},
      create: {
        id: "comment_027",
        content: "I agree, data visualization is becoming increasingly important.",
        userId: users[6].id,
        postId: forumPost[1].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_028" },
      update: {},
      create: {
        id: "comment_028",
        content: "Deno has improved a lot but Node.js ecosystem is still unmatched.",
        userId: users[9].id,
        postId: forumPost[2].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_029" },
      update: {},
      create: {
        id: "comment_029",
        content: "AI and machine learning skills are also in high demand.",
        userId: users[12].id,
        postId: forumPost[3].id,
      },
    }),
    prisma.comment.upsert({
      where: { id: "comment_030" },
      update: {},
      create: {
        id: "comment_030",
        content: "Make sure your containers are on the same Docker network.",
        userId: users[5].id,
        postId: forumPost[4].id,
      },
    }),
  ]);

  // ──────────────────────────────────────────────
  // 14. ChatMessages (5 messages)
  // ──────────────────────────────────────────────
  const chatMessages = await Promise.all([
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_001" },
      update: {},
      create: {
        id: "chat_msg_001",
        content: "Hello everyone! Welcome to the React course chat.",
        courseId: courses[0].id,
        userId: users[0].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_002" },
      update: {},
      create: {
        id: "chat_msg_002",
        content: "Does anyone know when the next assignment is due?",
        courseId: courses[0].id,
        userId: users[2].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_003" },
      update: {},
      create: {
        id: "chat_msg_003",
        content: "Great lecture on NumPy! The examples were very helpful.",
        courseId: courses[1].id,
        userId: users[2].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_004" },
      update: {},
      create: {
        id: "chat_msg_004",
        content: "I'm stuck on the Express routing exercise. Any hints?",
        courseId: courses[2].id,
        userId: users[3].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_005" },
      update: {},
      create: {
        id: "chat_msg_005",
        content: "Docker Compose is amazing for local development!",
        courseId: courses[4].id,
        userId: users[3].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_006" },
      update: {},
      create: {
        id: "chat_msg_006",
        content: "Next.js server components are a game changer for performance.",
        courseId: courses[5].id,
        userId: users[7].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_007" },
      update: {},
      create: {
        id: "chat_msg_007",
        content: "Has anyone tried the TensorFlow playground exercise?",
        courseId: courses[6].id,
        userId: users[8].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_008" },
      update: {},
      create: {
        id: "chat_msg_008",
        content: "The AWS lab on EC2 auto-scaling was really practical.",
        courseId: courses[7].id,
        userId: users[10].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_009" },
      update: {},
      create: {
        id: "chat_msg_009",
        content: "TypeScript decorators are powerful but can be confusing.",
        courseId: courses[8].id,
        userId: users[11].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_010" },
      update: {},
      create: {
        id: "chat_msg_010",
        content: "The cryptography section was mind-blowing!",
        courseId: courses[9].id,
        userId: users[13].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_011" },
      update: {},
      create: {
        id: "chat_msg_011",
        content: "Go channels make concurrent programming so elegant.",
        courseId: courses[10].id,
        userId: users[14].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_012" },
      update: {},
      create: {
        id: "chat_msg_012",
        content: "React Native hot reload is a huge time saver.",
        courseId: courses[11].id,
        userId: users[15].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_013" },
      update: {},
      create: {
        id: "chat_msg_013",
        content: "SQL window functions are incredibly useful for analytics.",
        courseId: courses[12].id,
        userId: users[16].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_014" },
      update: {},
      create: {
        id: "chat_msg_014",
        content: "GraphQL subscriptions are perfect for real-time features.",
        courseId: courses[13].id,
        userId: users[17].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_015" },
      update: {},
      create: {
        id: "chat_msg_015",
        content: "Figma is my favorite tool for UI prototyping.",
        courseId: courses[14].id,
        userId: users[18].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_016" },
      update: {},
      create: {
        id: "chat_msg_016",
        content: "Solidity smart contracts require careful security auditing.",
        courseId: courses[15].id,
        userId: users[7].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_017" },
      update: {},
      create: {
        id: "chat_msg_017",
        content: "Unity's new DOTS system is really impressive for performance.",
        courseId: courses[16].id,
        userId: users[8].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_018" },
      update: {},
      create: {
        id: "chat_msg_018",
        content: "Cypress is my preferred tool for end-to-end testing.",
        courseId: courses[17].id,
        userId: users[10].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_019" },
      update: {},
      create: {
        id: "chat_msg_019",
        content: "Rust's borrow checker is tough but prevents so many bugs.",
        courseId: courses[18].id,
        userId: users[11].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_020" },
      update: {},
      create: {
        id: "chat_msg_020",
        content: "Anyone interested in forming a study group for the Go course?",
        courseId: courses[10].id,
        userId: users[13].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_021" },
      update: {},
      create: {
        id: "chat_msg_021",
        content: "The Next.js course project is really well structured.",
        courseId: courses[5].id,
        userId: users[14].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_022" },
      update: {},
      create: {
        id: "chat_msg_022",
        content: "I finally understand Kubernetes after this course!",
        courseId: courses[4].id,
        userId: users[15].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_023" },
      update: {},
      create: {
        id: "chat_msg_023",
        content: "The ML course project on image classification was awesome.",
        courseId: courses[6].id,
        userId: users[16].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_024" },
      update: {},
      create: {
        id: "chat_msg_024",
        content: "Can someone explain the difference between S3 and EBS?",
        courseId: courses[7].id,
        userId: users[17].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_025" },
      update: {},
      create: {
        id: "chat_msg_025",
        content: "The UI/UX course completely changed how I approach design.",
        courseId: courses[14].id,
        userId: users[18].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_026" },
      update: {},
      create: {
        id: "chat_msg_026",
        content: "Testing with Jest and React Testing Library is so satisfying.",
        courseId: courses[17].id,
        userId: users[7].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_027" },
      update: {},
      create: {
        id: "chat_msg_027",
        content: "Rust's pattern matching is incredibly expressive.",
        courseId: courses[19].id,
        userId: users[8].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_028" },
      update: {},
      create: {
        id: "chat_msg_028",
        content: "The cybersecurity capture-the-flag exercises were so fun!",
        courseId: courses[9].id,
        userId: users[10].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_029" },
      update: {},
      create: {
        id: "chat_msg_029",
        content: "GraphQL with Apollo is a joy to work with.",
        courseId: courses[13].id,
        userId: users[11].id,
      },
    }),
    prisma.chatMessage.upsert({
      where: { id: "chat_msg_030" },
      update: {},
      create: {
        id: "chat_msg_030",
        content: "Thanks for the great course content everyone!",
        courseId: courses[5].id,
        userId: users[13].id,
      },
    }),
  ]);

  // ──────────────────────────────────────────────
  // 15. Notifications (5 notifications)
  // ──────────────────────────────────────────────
  const notifications = await Promise.all([
    prisma.notification.upsert({
      where: { id: "notif_001" },
      update: {},
      create: {
        id: "notif_001",
        userId: users[2].id,
        type: "enrollment",
        title: "Enrolled in React for Beginners",
        body: "You have successfully enrolled in the React for Beginners course.",
        link: "/courses/react-for-beginners",
        isRead: true,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_002" },
      update: {},
      create: {
        id: "notif_002",
        userId: users[2].id,
        type: "payment",
        title: "Payment Successful",
        body: "Your payment of $49.99 for React for Beginners was successful.",
        link: "/payments/payment_001",
        isRead: false,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_003" },
      update: {},
      create: {
        id: "notif_003",
        userId: users[3].id,
        type: "comment_reply",
        title: "New reply to your post",
        body: "John Doe replied to your forum post.",
        link: "/forum/forum_post_001",
        isRead: false,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_004" },
      update: {},
      create: {
        id: "notif_004",
        userId: users[2].id,
        type: "new_lesson",
        title: "New lesson available",
        body: "A new lesson 'Advanced Hooks' has been added to React for Beginners.",
        link: "/courses/react-for-beginners/lessons",
        isRead: false,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_005" },
      update: {},
      create: {
        id: "notif_005",
        userId: users[4].id,
        type: "system",
        title: "System Maintenance",
        body: "The platform will be down for maintenance on Sunday at 2 AM.",
        link: null,
        isRead: true,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_006" },
      update: {},
      create: {
        id: "notif_006",
        userId: users[7].id,
        type: "enrollment",
        title: "Enrolled in Next.js Full-Stack",
        body: "You have enrolled in Next.js Full-Stack Development.",
        link: "/courses/nextjs-fullstack",
        isRead: true,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_007" },
      update: {},
      create: {
        id: "notif_007",
        userId: users[7].id,
        type: "enrollment",
        title: "Enrolled in Machine Learning 101",
        body: "You have enrolled in Machine Learning 101.",
        link: "/courses/machine-learning-101",
        isRead: false,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_008" },
      update: {},
      create: {
        id: "notif_008",
        userId: users[8].id,
        type: "enrollment",
        title: "Enrolled in AWS Cloud Practitioner",
        body: "You have enrolled in AWS Cloud Practitioner.",
        link: "/courses/aws-cloud-practitioner",
        isRead: true,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_009" },
      update: {},
      create: {
        id: "notif_009",
        userId: users[8].id,
        type: "payment",
        title: "Payment Pending",
        body: "Your payment of $49.99 for TypeScript Design Patterns is pending.",
        link: "/payments/payment_009",
        isRead: false,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_010" },
      update: {},
      create: {
        id: "notif_010",
        userId: users[10].id,
        type: "enrollment",
        title: "Enrolled in Cybersecurity Fundamentals",
        body: "You have enrolled in Cybersecurity Fundamentals.",
        link: "/courses/cybersecurity-fundamentals",
        isRead: true,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_011" },
      update: {},
      create: {
        id: "notif_011",
        userId: users[10].id,
        type: "enrollment",
        title: "Enrolled in Go Programming Language",
        body: "You have enrolled in Go Programming Language.",
        link: "/courses/go-programming-language",
        isRead: false,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_012" },
      update: {},
      create: {
        id: "notif_012",
        userId: users[11].id,
        type: "enrollment",
        title: "Enrolled in React Native Mobile Development",
        body: "You have enrolled in React Native Mobile Development.",
        link: "/courses/react-native-mobile",
        isRead: true,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_013" },
      update: {},
      create: {
        id: "notif_013",
        userId: users[11].id,
        type: "enrollment",
        title: "Enrolled in SQL & Database Design",
        body: "You have enrolled in SQL & Database Design.",
        link: "/courses/sql-database-design",
        isRead: false,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_014" },
      update: {},
      create: {
        id: "notif_014",
        userId: users[13].id,
        type: "enrollment",
        title: "Enrolled in GraphQL API Development",
        body: "You have enrolled in GraphQL API Development.",
        link: "/courses/graphql-api-development",
        isRead: true,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_015" },
      update: {},
      create: {
        id: "notif_015",
        userId: users[13].id,
        type: "enrollment",
        title: "Enrolled in UI/UX Design Principles",
        body: "You have enrolled in UI/UX Design Principles.",
        link: "/courses/ui-ux-design-principles",
        isRead: false,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_016" },
      update: {},
      create: {
        id: "notif_016",
        userId: users[14].id,
        type: "enrollment",
        title: "Enrolled in Blockchain Development",
        body: "You have enrolled in Blockchain Development.",
        link: "/courses/blockchain-development",
        isRead: true,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_017" },
      update: {},
      create: {
        id: "notif_017",
        userId: users[14].id,
        type: "enrollment",
        title: "Enrolled in Unity Game Development",
        body: "You have enrolled in Unity Game Development.",
        link: "/courses/unity-game-development",
        isRead: false,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_018" },
      update: {},
      create: {
        id: "notif_018",
        userId: users[15].id,
        type: "enrollment",
        title: "Enrolled in Software Testing & Automation",
        body: "You have enrolled in Software Testing & Automation.",
        link: "/courses/software-testing-automation",
        isRead: true,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_019" },
      update: {},
      create: {
        id: "notif_019",
        userId: users[15].id,
        type: "enrollment",
        title: "Enrolled in Rust Systems Programming",
        body: "You have enrolled in Rust Systems Programming.",
        link: "/courses/rust-systems-programming",
        isRead: false,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_020" },
      update: {},
      create: {
        id: "notif_020",
        userId: users[16].id,
        type: "enrollment",
        title: "Enrolled in Rust Systems Programming (advanced)",
        body: "You have enrolled in the advanced Rust course.",
        link: "/courses/rust-systems-programming",
        isRead: true,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_021" },
      update: {},
      create: {
        id: "notif_021",
        userId: users[17].id,
        type: "enrollment",
        title: "Enrolled in Next.js Full-Stack",
        body: "You have enrolled in Next.js Full-Stack Development.",
        link: "/courses/nextjs-fullstack",
        isRead: true,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_022" },
      update: {},
      create: {
        id: "notif_022",
        userId: users[17].id,
        type: "enrollment",
        title: "Enrolled in Machine Learning 101",
        body: "You have enrolled in Machine Learning 101.",
        link: "/courses/machine-learning-101",
        isRead: false,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_023" },
      update: {},
      create: {
        id: "notif_023",
        userId: users[18].id,
        type: "enrollment",
        title: "Enrolled in AWS Cloud Practitioner",
        body: "You have enrolled in AWS Cloud Practitioner.",
        link: "/courses/aws-cloud-practitioner",
        isRead: true,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_024" },
      update: {},
      create: {
        id: "notif_024",
        userId: users[18].id,
        type: "enrollment",
        title: "Enrolled in TypeScript Design Patterns",
        body: "You have enrolled in TypeScript Design Patterns.",
        link: "/courses/typescript-design-patterns",
        isRead: false,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_025" },
      update: {},
      create: {
        id: "notif_025",
        userId: users[7].id,
        type: "payment",
        title: "Payment Refunded",
        body: "Your payment for Cybersecurity Fundamentals has been refunded.",
        link: "/payments/payment_025",
        isRead: false,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_026" },
      update: {},
      create: {
        id: "notif_026",
        userId: users[8].id,
        type: "new_lesson",
        title: "New lesson in TypeScript Design Patterns",
        body: "A new lesson 'Structural Patterns' has been added.",
        link: "/courses/typescript-design-patterns/lessons",
        isRead: false,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_027" },
      update: {},
      create: {
        id: "notif_027",
        userId: users[10].id,
        type: "comment_reply",
        title: "New reply to your forum post",
        body: "David Chen replied to your AWS certification tips post.",
        link: "/forum/forum_post_008",
        isRead: false,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_028" },
      update: {},
      create: {
        id: "notif_028",
        userId: users[11].id,
        type: "system",
        title: "Course Update Available",
        body: "React Native course has been updated with new content.",
        link: "/courses/react-native-mobile",
        isRead: false,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_029" },
      update: {},
      create: {
        id: "notif_029",
        userId: users[13].id,
        type: "payment",
        title: "Payment Successful",
        body: "Your payment of $39.99 for UI/UX Design Principles was successful.",
        link: "/payments/payment_015",
        isRead: true,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_030" },
      update: {},
      create: {
        id: "notif_030",
        userId: users[14].id,
        type: "new_lesson",
        title: "New lesson in Unity Game Development",
        body: "A new lesson 'C# Scripting Basics' has been added.",
        link: "/courses/unity-game-development/lessons",
        isRead: false,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_031" },
      update: {},
      create: {
        id: "notif_031",
        userId: users[15].id,
        type: "payment",
        title: "Payment Failed",
        body: "Your payment of $79.99 for Rust Systems Programming failed.",
        link: "/payments/payment_019",
        isRead: true,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_032" },
      update: {},
      create: {
        id: "notif_032",
        userId: users[16].id,
        type: "enrollment",
        title: "Enrolled in Rust Systems Programming",
        body: "You have enrolled in the advanced Rust course.",
        link: "/courses/rust-systems-programming",
        isRead: true,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_033" },
      update: {},
      create: {
        id: "notif_033",
        userId: users[17].id,
        type: "payment",
        title: "Payment Pending",
        body: "Your payment of $69.99 for Machine Learning 101 is pending.",
        link: "/payments/payment_022",
        isRead: false,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_034" },
      update: {},
      create: {
        id: "notif_034",
        userId: users[18].id,
        type: "payment",
        title: "Payment Successful",
        body: "Your payment of $89.99 for AWS Cloud Practitioner was successful.",
        link: "/payments/payment_023",
        isRead: true,
      },
    }),
    prisma.notification.upsert({
      where: { id: "notif_035" },
      update: {},
      create: {
        id: "notif_035",
        userId: users[7].id,
        type: "system",
        title: "Achievement Unlocked",
        body: "Congratulations! You've completed 3 courses on SkillHub.",
        link: null,
        isRead: false,
      },
    }),
  ]);

  // ──────────────────────────────────────────────
  // 16. Files (5 files)
  // ──────────────────────────────────────────────
  const files = await Promise.all([
    prisma.file.upsert({
      where: { id: "file_001" },
      update: {},
      create: {
        id: "file_001",
        userId: users[0].id,
        url: "https://example.com/uploads/avatar-john.jpg",
        type: "avatar",
        sizeBytes: 204800,
      },
    }),
    prisma.file.upsert({
      where: { id: "file_002" },
      update: {},
      create: {
        id: "file_002",
        userId: users[1].id,
        url: "https://example.com/uploads/avatar-jane.jpg",
        type: "avatar",
        sizeBytes: 153600,
      },
    }),
    prisma.file.upsert({
      where: { id: "file_003" },
      update: {},
      create: {
        id: "file_003",
        userId: users[0].id,
        url: "https://example.com/uploads/thumb-react.jpg",
        type: "thumbnail",
        sizeBytes: 512000,
      },
    }),
    prisma.file.upsert({
      where: { id: "file_004" },
      update: {},
      create: {
        id: "file_004",
        userId: users[1].id,
        url: "https://example.com/uploads/video-numpy.mp4",
        type: "video",
        sizeBytes: 52428800,
      },
    }),
    prisma.file.upsert({
      where: { id: "file_005" },
      update: {},
      create: {
        id: "file_005",
        userId: users[2].id,
        url: "https://example.com/uploads/assignment-react.pdf",
        type: "attachment",
        sizeBytes: 1024000,
      },
    }),
    prisma.file.upsert({
      where: { id: "file_006" },
      update: {},
      create: {
        id: "file_006",
        userId: users[7].id,
        url: "https://example.com/uploads/avatar-david.jpg",
        type: "avatar",
        sizeBytes: 180000,
      },
    }),
    prisma.file.upsert({
      where: { id: "file_007" },
      update: {},
      create: {
        id: "file_007",
        userId: users[8].id,
        url: "https://example.com/uploads/avatar-emma.jpg",
        type: "avatar",
        sizeBytes: 165000,
      },
    }),
    prisma.file.upsert({
      where: { id: "file_008" },
      update: {},
      create: {
        id: "file_008",
        userId: users[10].id,
        url: "https://example.com/uploads/avatar-olivia.jpg",
        type: "avatar",
        sizeBytes: 190000,
      },
    }),
    prisma.file.upsert({
      where: { id: "file_009" },
      update: {},
      create: {
        id: "file_009",
        userId: users[11].id,
        url: "https://example.com/uploads/avatar-liam.jpg",
        type: "avatar",
        sizeBytes: 175000,
      },
    }),
    prisma.file.upsert({
      where: { id: "file_010" },
      update: {},
      create: {
        id: "file_010",
        userId: users[13].id,
        url: "https://example.com/uploads/avatar-ethan.jpg",
        type: "avatar",
        sizeBytes: 160000,
      },
    }),
    prisma.file.upsert({
      where: { id: "file_011" },
      update: {},
      create: {
        id: "file_011",
        userId: users[14].id,
        url: "https://example.com/uploads/avatar-ava.jpg",
        type: "avatar",
        sizeBytes: 170000,
      },
    }),
    prisma.file.upsert({
      where: { id: "file_012" },
      update: {},
      create: {
        id: "file_012",
        userId: users[15].id,
        url: "https://example.com/uploads/avatar-noah.jpg",
        type: "avatar",
        sizeBytes: 155000,
      },
    }),
    prisma.file.upsert({
      where: { id: "file_013" },
      update: {},
      create: {
        id: "file_013",
        userId: users[16].id,
        url: "https://example.com/uploads/avatar-mia.jpg",
        type: "avatar",
        sizeBytes: 185000,
      },
    }),
    prisma.file.upsert({
      where: { id: "file_014" },
      update: {},
      create: {
        id: "file_014",
        userId: users[17].id,
        url: "https://example.com/uploads/avatar-lucas.jpg",
        type: "avatar",
        sizeBytes: 195000,
      },
    }),
    prisma.file.upsert({
      where: { id: "file_015" },
      update: {},
      create: {
        id: "file_015",
        userId: users[18].id,
        url: "https://example.com/uploads/avatar-isabella.jpg",
        type: "avatar",
        sizeBytes: 145000,
      },
    }),
    prisma.file.upsert({
      where: { id: "file_016" },
      update: {},
      create: {
        id: "file_016",
        userId: users[5].id,
        url: "https://example.com/uploads/thumb-nextjs.jpg",
        type: "thumbnail",
        sizeBytes: 480000,
      },
    }),
    prisma.file.upsert({
      where: { id: "file_017" },
      update: {},
      create: {
        id: "file_017",
        userId: users[6].id,
        url: "https://example.com/uploads/thumb-typescript.jpg",
        type: "thumbnail",
        sizeBytes: 510000,
      },
    }),
    prisma.file.upsert({
      where: { id: "file_018" },
      update: {},
      create: {
        id: "file_018",
        userId: users[9].id,
        url: "https://example.com/uploads/thumb-cybersecurity.jpg",
        type: "thumbnail",
        sizeBytes: 490000,
      },
    }),
    prisma.file.upsert({
      where: { id: "file_019" },
      update: {},
      create: {
        id: "file_019",
        userId: users[12].id,
        url: "https://example.com/uploads/thumb-graphql.jpg",
        type: "thumbnail",
        sizeBytes: 470000,
      },
    }),
    prisma.file.upsert({
      where: { id: "file_020" },
      update: {},
      create: {
        id: "file_020",
        userId: users[5].id,
        url: "https://example.com/uploads/video-testing-jest.mp4",
        type: "video",
        sizeBytes: 48000000,
      },
    }),
    prisma.file.upsert({
      where: { id: "file_021" },
      update: {},
      create: {
        id: "file_021",
        userId: users[6].id,
        url: "https://example.com/uploads/video-uiux-research.mp4",
        type: "video",
        sizeBytes: 52000000,
      },
    }),
    prisma.file.upsert({
      where: { id: "file_022" },
      update: {},
      create: {
        id: "file_022",
        userId: users[9].id,
        url: "https://example.com/uploads/video-go-concurrency.mp4",
        type: "video",
        sizeBytes: 56000000,
      },
    }),
    prisma.file.upsert({
      where: { id: "file_023" },
      update: {},
      create: {
        id: "file_023",
        userId: users[12].id,
        url: "https://example.com/uploads/assignment-graphql.pdf",
        type: "attachment",
        sizeBytes: 980000,
      },
    }),
    prisma.file.upsert({
      where: { id: "file_024" },
      update: {},
      create: {
        id: "file_024",
        userId: users[5].id,
        url: "https://example.com/uploads/assignment-testing.pdf",
        type: "attachment",
        sizeBytes: 1100000,
      },
    }),
    prisma.file.upsert({
      where: { id: "file_025" },
      update: {},
      create: {
        id: "file_025",
        userId: users[9].id,
        url: "https://example.com/uploads/assignment-go.pdf",
        type: "attachment",
        sizeBytes: 890000,
      },
    }),
  ]);

  // ──────────────────────────────────────────────
  // 17. AuditLogs (5 audit logs)
  // ──────────────────────────────────────────────
  const auditLogs = await Promise.all([
    prisma.auditLog.upsert({
      where: { id: "audit_001" },
      update: {},
      create: {
        id: "audit_001",
        userId: users[4].id,
        action: "CREATE_COURSE",
        targetType: "course",
        targetId: courses[0].id,
      },
    }),
    prisma.auditLog.upsert({
      where: { id: "audit_002" },
      update: {},
      create: {
        id: "audit_002",
        userId: users[4].id,
        action: "DELETE_USER",
        targetType: "user",
        targetId: "deleted_user_id",
      },
    }),
    prisma.auditLog.upsert({
      where: { id: "audit_003" },
      update: {},
      create: {
        id: "audit_003",
        userId: users[0].id,
        action: "UPDATE_LESSON",
        targetType: "lesson",
        targetId: lessons[0].id,
      },
    }),
    prisma.auditLog.upsert({
      where: { id: "audit_004" },
      update: {},
      create: {
        id: "audit_004",
        userId: users[1].id,
        action: "PUBLISH_COURSE",
        targetType: "course",
        targetId: courses[1].id,
      },
    }),
    prisma.auditLog.upsert({
      where: { id: "audit_005" },
      update: {},
      create: {
        id: "audit_005",
        userId: users[4].id,
        action: "REFUND_PAYMENT",
        targetType: "payment",
        targetId: payments[4].id,
      },
    }),
    prisma.auditLog.upsert({
      where: { id: "audit_006" },
      update: {},
      create: {
        id: "audit_006",
        userId: users[5].id,
        action: "CREATE_COURSE",
        targetType: "course",
        targetId: courses[5].id,
      },
    }),
    prisma.auditLog.upsert({
      where: { id: "audit_007" },
      update: {},
      create: {
        id: "audit_007",
        userId: users[6].id,
        action: "CREATE_COURSE",
        targetType: "course",
        targetId: courses[8].id,
      },
    }),
    prisma.auditLog.upsert({
      where: { id: "audit_008" },
      update: {},
      create: {
        id: "audit_008",
        userId: users[9].id,
        action: "CREATE_COURSE",
        targetType: "course",
        targetId: courses[9].id,
      },
    }),
    prisma.auditLog.upsert({
      where: { id: "audit_009" },
      update: {},
      create: {
        id: "audit_009",
        userId: users[12].id,
        action: "CREATE_COURSE",
        targetType: "course",
        targetId: courses[13].id,
      },
    }),
    prisma.auditLog.upsert({
      where: { id: "audit_010" },
      update: {},
      create: {
        id: "audit_010",
        userId: users[4].id,
        action: "UPDATE_USER_ROLE",
        targetType: "user",
        targetId: users[7].id,
      },
    }),
    prisma.auditLog.upsert({
      where: { id: "audit_011" },
      update: {},
      create: {
        id: "audit_011",
        userId: users[0].id,
        action: "UPDATE_COURSE",
        targetType: "course",
        targetId: courses[0].id,
      },
    }),
    prisma.auditLog.upsert({
      where: { id: "audit_012" },
      update: {},
      create: {
        id: "audit_012",
        userId: users[1].id,
        action: "UPDATE_COURSE",
        targetType: "course",
        targetId: courses[1].id,
      },
    }),
    prisma.auditLog.upsert({
      where: { id: "audit_013" },
      update: {},
      create: {
        id: "audit_013",
        userId: users[5].id,
        action: "PUBLISH_COURSE",
        targetType: "course",
        targetId: courses[5].id,
      },
    }),
    prisma.auditLog.upsert({
      where: { id: "audit_014" },
      update: {},
      create: {
        id: "audit_014",
        userId: users[6].id,
        action: "PUBLISH_COURSE",
        targetType: "course",
        targetId: courses[8].id,
      },
    }),
    prisma.auditLog.upsert({
      where: { id: "audit_015" },
      update: {},
      create: {
        id: "audit_015",
        userId: users[9].id,
        action: "PUBLISH_COURSE",
        targetType: "course",
        targetId: courses[9].id,
      },
    }),
    prisma.auditLog.upsert({
      where: { id: "audit_016" },
      update: {},
      create: {
        id: "audit_016",
        userId: users[12].id,
        action: "PUBLISH_COURSE",
        targetType: "course",
        targetId: courses[13].id,
      },
    }),
    prisma.auditLog.upsert({
      where: { id: "audit_017" },
      update: {},
      create: {
        id: "audit_017",
        userId: users[4].id,
        action: "REFUND_PAYMENT",
        targetType: "payment",
        targetId: payments[24].id,
      },
    }),
    prisma.auditLog.upsert({
      where: { id: "audit_018" },
      update: {},
      create: {
        id: "audit_018",
        userId: users[0].id,
        action: "DELETE_LESSON",
        targetType: "lesson",
        targetId: lessons[5].id,
      },
    }),
    prisma.auditLog.upsert({
      where: { id: "audit_019" },
      update: {},
      create: {
        id: "audit_019",
        userId: users[5].id,
        action: "UPDATE_COURSE",
        targetType: "course",
        targetId: courses[5].id,
      },
    }),
    prisma.auditLog.upsert({
      where: { id: "audit_020" },
      update: {},
      create: {
        id: "audit_020",
        userId: users[6].id,
        action: "CREATE_LESSON",
        targetType: "lesson",
        targetId: lessons[24].id,
      },
    }),
    prisma.auditLog.upsert({
      where: { id: "audit_021" },
      update: {},
      create: {
        id: "audit_021",
        userId: users[9].id,
        action: "CREATE_LESSON",
        targetType: "lesson",
        targetId: lessons[29].id,
      },
    }),
    prisma.auditLog.upsert({
      where: { id: "audit_022" },
      update: {},
      create: {
        id: "audit_022",
        userId: users[12].id,
        action: "CREATE_LESSON",
        targetType: "lesson",
        targetId: lessons[38].id,
      },
    }),
    prisma.auditLog.upsert({
      where: { id: "audit_023" },
      update: {},
      create: {
        id: "audit_023",
        userId: users[4].id,
        action: "DELETE_COURSE",
        targetType: "course",
        targetId: "deleted_course_id",
      },
    }),
    prisma.auditLog.upsert({
      where: { id: "audit_024" },
      update: {},
      create: {
        id: "audit_024",
        userId: users[0].id,
        action: "UPDATE_LESSON",
        targetType: "lesson",
        targetId: lessons[1].id,
      },
    }),
    prisma.auditLog.upsert({
      where: { id: "audit_025" },
      update: {},
      create: {
        id: "audit_025",
        userId: users[1].id,
        action: "UPDATE_LESSON",
        targetType: "lesson",
        targetId: lessons[2].id,
      },
    }),
  ]);

  console.log("Seed completed successfully!");
  console.log(`  Users: ${users.length}`);
  console.log(`  Categories: ${categories.length}`);
  console.log(`  Tags: ${tags.length}`);
  console.log(`  Courses: ${courses.length}`);
  console.log(`  CourseTags: ${courseTags.length}`);
  console.log(`  Lessons: ${lessons.length}`);
  console.log(`  Enrollments: ${enrollments.length}`);
  console.log(`  LessonProgress: ${lessonProgresses.length}`);
  console.log(`  Coupons: ${coupons.length}`);
  console.log(`  Payments: ${payments.length}`);
  console.log(`  Reviews: ${reviews.length}`);
  console.log(`  forumPost: ${forumPost.length}`);
  console.log(`  Comments: ${comments.length}`);
  console.log(`  ChatMessages: ${chatMessages.length}`);
  console.log(`  Notifications: ${notifications.length}`);
  console.log(`  Files: ${files.length}`);
  console.log(`  AuditLogs: ${auditLogs.length}`);
}

seed()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
