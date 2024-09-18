This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Create an .env file at the root folder.

This project mainly use Next.js, tailwind CSS/ shadcn Ui library
Neon postgre db, and drizzle ORM

```

DATABASE_URL
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Main Features

### Semester Management

- **Create:** Add a new semester with validation to ensure all fields meet the criteria.
- **Delete:** Remove an existing semester.
- **Get:** Retrieve the list of semesters.
- **Update:** Modify details of an existing semester with validation.

### Course Management

- **Create:** Add a new course with validation.
- **Delete:** Remove an existing course.
- **Get:** Retrieve the list of courses.
- **Update:** Modify course details with validation.

### Assignment Management

- **Create:** Add a new assignment with validation. Automatically set the weight of the new assignment to `100% - the sum of existing assignment weights`.
- **Delete:** Remove an existing assignment.
- **Get:** Retrieve the list of assignments.
- **Update:** Modify assignment details with validation.

### Prediction and Hurdle Logic

- Auto generate the final assignment weight according to existing assignments.
- If the hurdle is set to `0`, it indicates there is no hurdle.
- If the predicted score is below the hurdle, use the hurdle value as the prediction.
