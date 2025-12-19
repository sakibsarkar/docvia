import ContactView from "@/views/ContactView";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact",
};
const page = () => {
  return <ContactView />;
};

export default page;
