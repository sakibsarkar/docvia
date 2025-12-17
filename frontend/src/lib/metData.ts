import type { Metadata } from "next";

export const SiteMeta: Metadata = {
  title: {
    template: "%s | Docvia — Build AI Chatbots from Your Google Docs",
    default: "Docvia",
  },
  description:
    "Docvia lets you create smart AI chatbots using your Google Docs. Connect selected documents, embed the chatbot on your website, and answer customer questions instantly with AI.",
  keywords: [
    "AI chatbot",
    "Google Docs chatbot",
    "website chatbot",
    "AI customer support",
    "Docvia",
    "AI documentation assistant",
    "SaaS chatbot",
  ],
  authors: [{ name: "Docvia Team" }],
  creator: "Docvia",
  publisher: "Docvia",
  openGraph: {
    title: "Docvia — AI Chatbots Powered by Your Google Docs",
    description:
      "Turn your Google Docs into an AI-powered chatbot. No coding required. Secure, fast, and easy to embed on any website.",
    url: "https://docviapage.vercel.app",
    siteName: "Docvia",
    images: [
      {
        url: "/home_page.png",
        width: 1200,
        height: 630,
        alt: "Docvia AI Chatbot Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
