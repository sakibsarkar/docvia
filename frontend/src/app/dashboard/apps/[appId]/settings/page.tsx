import AppSettingsView from "@/views/apps/AppSettingsView";

const page = async ({ params }: { params: Promise<{ appId: string }> }) => {
  const { appId } = await params;
  return <AppSettingsView />;
};

export default page;
