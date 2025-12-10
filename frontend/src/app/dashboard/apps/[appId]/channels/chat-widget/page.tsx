import AppWidgetView from "@/views/dashboard/apps/channels/AppWidgetView";

const page = async ({ params }: { params: Promise<{ appId: string }> }) => {
  const { appId } = await params;
  return <AppWidgetView appId={appId} />;
};

export default page;
