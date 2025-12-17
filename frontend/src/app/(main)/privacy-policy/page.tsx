import PirvacyPolicyView from "@/views/PirvacyPolicyView";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy",
};
const page = () => {
  return <PirvacyPolicyView />;
};

export default page;
