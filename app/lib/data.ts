// lib/data.ts

export async function getTasks() {
  try {
    // 1. If using a Database (Prisma, MongoDB, etc.):
    // return await db.task.findMany();

    // 2. If using an external API:
    // const response = await fetch('https://api.example.com/tasks');
    // return response.json();

    // 3. For testing purposes (Mock Data):
    return [
      { id: "1", text: "Master Next.js Server Components", completed: false },
      { id: "2", text: "Fix Toast centering issue", completed: true },
    ];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tasks.");
  }
}