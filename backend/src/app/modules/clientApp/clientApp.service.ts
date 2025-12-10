import { App, AppWidget } from "@prisma/client";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import prisma from "../../lib/prisma";
import subscriptionUtils from "../subscription/subscription.utils";
import { TClientAppCreatePayload } from "./clientApp.interface";
import clientAppUtils from "./clientApp.utils";

const createApp = async (payload: TClientAppCreatePayload, userId: string) => {
  const subscriptionId = await subscriptionUtils.getUserCurrentSubscriptionId(userId);

  const subscription = await prisma.subscription.findUniqueOrThrow({
    where: { id: subscriptionId },
  });

  if (!subscription) {
    throw new AppError(404, "Subscription not found");
  }

  const plan = await prisma.plan.findUnique({
    where: { id: subscription.planId },
    select: { appLimit: true },
  });

  if (!plan) {
    throw new AppError(404, "Wrong plan. Please contact support.");
  }

  const totalApps = await prisma.app.count({
    where: { userId: userId },
  });

  const isUnlimited = plan.appLimit === -1;

  if (totalApps >= plan.appLimit && !isUnlimited) {
    throw new AppError(400, "You have reached the maximum number of apps");
  }

  const apiKey = clientAppUtils.generateAppApiKey();

  const app = await prisma.app.create({
    data: {
      ...payload,
      apiKeyHash: apiKey,
      userId,
    },
  });

  const widget = await prisma.appWidget.create({
    data: {
      appId: app.id,
      ...clientAppUtils.defaultAppWidget,
    },
  });

  await prisma.app.update({
    where: { id: app.id },
    data: {
      currentWidgetId: widget.id,
    },
  });

  return { ...app, currentWidgetId: widget.id, apiKey: undefined };
};

const getAppWidgetByAppId = async (appId: string, userId: string) => {
  const app = await prisma.app.findUnique({
    where: { id: appId },
    select: {
      currentWidgetId: true,
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

  let widget: AppWidget | null = null;

  if (app.currentWidgetId) {
    // Use findUnique, not findUniqueOrThrow
    widget = await prisma.appWidget.findUnique({
      where: { id: app.currentWidgetId },
    });
  }

  // If no widget found (either currentWidgetId null or widget missing)
  if (!widget) {
    widget = await prisma.appWidget.create({
      data: {
        appId: app.id,
        ...clientAppUtils.defaultAppWidget,
      },
    });

    // Update the app's currentWidgetId
    await prisma.app.update({
      where: { id: app.id },
      data: { currentWidgetId: widget.id },
    });
  }

  return widget;
};

const updateAppWidgetByWidgetId = async (
  widgetId: string,
  userId: string,
  payload: Partial<AppWidget>
) => {
  const widget = await prisma.appWidget.findUnique({
    where: { id: widgetId },
    include: {
      appInfo: {
        select: { userId: true },
      },
    },
  });

  if (!widget) {
    throw new AppError(404, "Widget not found");
  }
  if (widget.appInfo.userId !== userId) {
    throw new AppError(403, "Forbidden");
  }

  const updatedWidget = await prisma.appWidget.update({
    where: { id: widget.id },
    data: payload,
  });

  return updatedWidget;
};

const getUsersAllApps = async (userId: string, query: Record<string, unknown>) => {
  const quertObj = new QueryBuilder({
    ...query,
    isActive: query.isActive ? (query.isActive === "true" ? true : false) : undefined,
    userId: userId,
  })
    .paginate()
    .sort()
    .search(["appName", "authorizedOrigin"])
    .fields()
    .filter();

  const prismaQuery = quertObj.getPrismaQuery();

  const apps = await prisma.app.findMany({
    ...prismaQuery,
    select: {
      apiKeyHash: false,
      createdAt: true,
      updatedAt: true,
      isActive: true,
      userId: true,
      appName: true,
      authorizedOrigin: true,
      id: true,
    },
  });

  const total = await prisma.app.count({
    where: prismaQuery.where || {},
  });

  return { apps, total };
};

const getAppById = async (appId: string, userId: string) => {
  const app = await prisma.app.findUnique({
    where: { id: appId },
  });

  if (!app) {
    throw new AppError(404, "App not found");
  }

  if (app.userId !== userId) {
    throw new AppError(404, "App not found");
  }

  return { ...app, apiKeyHash: undefined };
};

const getAppApiKeyByAppId = async (appId: string, userId: string) => {
  const app = await prisma.app.findUnique({
    where: { id: appId },
    select: {
      apiKeyHash: true,
      userId: true,
    },
  });

  if (!app) {
    throw new AppError(404, "App not found");
  }

  if (app.userId !== userId) {
    throw new AppError(404, "App not found");
  }

  return app;
};

const UpdateAppByAppId = async (appId: string, userId: string, payload: Partial<App>) => {
  const app = await prisma.app.findUnique({
    where: { id: appId },
    select: {
      userId: true,
    },
  });

  if (!app) {
    throw new AppError(404, "App not found");
  }

  if (app.userId !== userId) {
    throw new AppError(403, "Forbidden");
  }

  ["apiKeyHash", "userId", "id"].forEach((key) => delete payload[key as keyof App]);

  if (payload.isActive) {
    const subscriptionId = await subscriptionUtils.getUserCurrentSubscriptionId(userId);

    const subscription = await prisma.subscription.findUniqueOrThrow({
      where: { id: subscriptionId },
    });

    if (!subscription) {
      throw new AppError(404, "Subscription not found");
    }

    const plan = await prisma.plan.findUnique({
      where: { id: subscription.planId },
      select: { appLimit: true },
    });

    if (!plan) {
      throw new AppError(404, "Wrong plan. Please contact support.");
    }

    const totalApps = await prisma.app.count({
      where: { userId: userId, isActive: true },
    });

    if (totalApps >= plan.appLimit) {
      throw new AppError(
        400,
        "You have reached the maximum number of apps. You cant activate this app"
      );
    }
  }

  const result = await prisma.app.update({ where: { id: appId }, data: payload });
  return { ...result, apiKeyHash: undefined };
};

const deleteAppByAppId = async (appId: string, userId: string) => {
  const app = await prisma.app.findUnique({
    where: { id: appId },
    select: {
      userId: true,
    },
  });

  if (!app) {
    throw new AppError(404, "App not found");
  }

  if (app.userId !== userId) {
    throw new AppError(403, "Forbidden");
  }

  await prisma.app.delete({ where: { id: appId } });

  return null;
};

const myAppCount = async (userId: string) => {
  const count = await prisma.app.count({ where: { userId } });
  return count;
};

const clientAppService = {
  createApp,
  getUsersAllApps,
  getAppById,
  getAppApiKeyByAppId,
  UpdateAppByAppId,
  deleteAppByAppId,
  myAppCount,
  getAppWidgetByAppId,
  updateAppWidgetByWidgetId,
};

export default clientAppService;
