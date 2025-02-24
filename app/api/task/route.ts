import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    const tasks = await prisma.task.findMany();

    return Response.json({
      status: 200,
      data: tasks,
      message: "Success fetch all task",
    });
  } catch (error) {
    console.log("error:", error);
    return Response.json({
      message: error,
    });
  }
};
