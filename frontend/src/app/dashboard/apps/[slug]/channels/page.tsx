import { redirect } from "next/navigation";
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/dashboard/apps/${slug}/channels/chat-widget`);
}
