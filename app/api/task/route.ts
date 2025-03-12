import { prisma } from "@/lib/prisma";
import { endOfDay, startOfDay } from "date-fns";

export const dynamic = "force-dynamic";

export const GET = async (request: Request) => {
  const { start, end } = Object.fromEntries(new URL(request.url).searchParams);

  const parsedStartDate = startOfDay(new Date(start)).toISOString();
  const parsedEndDate = endOfDay(new Date(end)).toISOString();

  try {
    const tasks = await prisma.task.findMany({
      where: {
        dueAt: {
          gt: parsedStartDate,
          lte: parsedEndDate,
        },
      },
      orderBy: {
        dueAt: "asc",
      },
    });

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
