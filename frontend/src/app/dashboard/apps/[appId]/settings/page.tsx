import AppSettingsView from "@/views/dashboard/apps/AppSettingsView";

const page = async ({ params }: { params: Promise<{ appId: string }> }) => {
  const { appId } = await params;
  return <AppSettingsView appId={appId} />;
};

export default page;
