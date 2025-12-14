import AppError from "../../errors/AppError";
import prisma from "../../lib/prisma";

const appOverview = async (appId: string, userId: string) => {
  const app = await prisma.app.findUnique({
    where: {
      id: appId,
    },
    select: {
      userId: true,
      id: true,
    },
  });

  if (!app) {
    throw new AppError(404, "App not found");
  }

  if (app.userId !== userId) {
    throw new AppError(403, "Forbidden");
  }

  const date = new Date();
  const startDate = new Date(date);
  startDate.setDate(date.getDate() - 30);
  const endDate = new Date(date);

  const visitCount = await prisma.appVisitor.count({
    where: {
      appId: app.id,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  const answeredChats = await prisma.chatAns.count({
    where: {
      appId: app.id,
      status: "answered",
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  const missedChats = await prisma.chatAns.count({
    where: {
      appId: app.id,
      status: "missed",
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  return {
    visitCount,
    answeredChats,
    missedChats,
  };
};

const visitorStatistics = async (appId: string, userId: string) => {
  const app = await prisma.app.findUnique({
    where: { id: appId },
    select: { userId: true, id: true },
  });

  if (!app) {
    throw new AppError(404, "App not found");
  }
  if (app.userId !== userId) {
    throw new AppError(403, "Forbidden");
  }

  // 30 days ago
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 29); // include today

  const visitors = await prisma.appVisitor.findMany({
    where: {
      appId: app.id,
      createdAt: {
        gte: startDate,
      },
    },
    select: {
      createdAt: true,
    },
  });

  // Aggregate by day (YYYY-MM-DD)
  const statsMap: Record<string, number> = {};

  visitors.forEach((v) => {
    // Use UTC to avoid timezone issues
    const key = v.createdAt.toISOString().slice(0, 10);
    statsMap[key] = (statsMap[key] || 0) + 1;
  });

  // Fill missing days
  const finalStats = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    const key = d.toISOString().slice(0, 10);

    finalStats.push({
      date: key,
      count: statsMap[key] || 0,
    });
  }

  return finalStats;
};

const chatStatistics = async (appId: string, userId: string) => {
  const app = await prisma.app.findUnique({
    where: { id: appId },
    select: { userId: true, id: true },
  });

  if (!app) {
    throw new AppError(404, "App not found");
  }
  if (app.userId !== userId) {
    throw new AppError(403, "Forbidden");
  }

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 29); // include today

  const chats = await prisma.chatAns.findMany({
    where: {
      appId: app.id,
      createdAt: {
        gte: startDate,
      },
    },
    select: {
      status: true,
      createdAt: true,
    },
  });

  const statsMap: Record<string, { answered: number; missed: number }> = {};

  chats.forEach((chat) => {
    const key = chat.createdAt.toISOString().slice(0, 10); // UTC YYYY-MM-DD
    if (!statsMap[key]) {
      statsMap[key] = { answered: 0, missed: 0 };
    }
    statsMap[key][chat.status] += 1;
  });

  const finalStats = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    const key = d.toISOString().slice(0, 10);

    finalStats.push({
      date: key,
      answered: statsMap[key]?.answered || 0,
      missed: statsMap[key]?.missed || 0,
    });
  }

  return finalStats;
};

const appStatisticsService = { appOverview, visitorStatistics, chatStatistics };

export default appStatisticsService;
