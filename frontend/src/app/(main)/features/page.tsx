import FeaturesView from "@/views/FeaturesView";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Features",
};

export default function FeaturesPage() {
  return <FeaturesView />;
}
