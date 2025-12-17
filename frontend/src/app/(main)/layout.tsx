import { Footer, Header } from "@/components";
import { SiteMeta } from "@/lib/metData";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = SiteMeta;

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default layout;
