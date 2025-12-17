import TermsAndConditionView from "@/views/TermsAndConditionView";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Terms & Conditions",
};
const page = () => {
  return <TermsAndConditionView />;
};

export default page;
