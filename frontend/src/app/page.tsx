"use client";

import { Footer, Header } from "@/components";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  BoltIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  SparklesIcon,
  GlobeAltIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <>
      <Header />
      <main className="wrapper">
        {/* Hero */}
        <section className="mx-auto max-w-[900px] pt-12 md:pt-16">
          <div className="text-center">
            <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs tracking-wider text-blue-600 uppercase">
              AI Chatbot Platform
            </span>
          </div>
          <h1 className="mt-5 mb-6 text-center font-poppins text-[40px] leading-[52px] font-medium md:text-[60px] md:leading-[76px] lg:text-[64px] lg:leading-[80px]">
            The easiest way to build effective AI chatbot.
          </h1>
          <p className="mx-auto max-w-[640px] text-center text-[18px] font-medium text-gray-500">
            Build AI chatbots for websites in minutes to automate customer support, lead generation,
            sales, and more.
          </p>

          <div className="mx-auto mt-8 flex items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-1 rounded-3xl bg-blue-500 px-6 py-2.5 text-white hover:bg-blue-600"
            >
              Start for free <ArrowRightIcon className="inline-block h-4 w-4" />
            </Link>
            <p className="text-gray-400">No credit card required</p>
          </div>
        </section>

        {/* Logos / Social proof */}
        <section className="mt-16 md:mt-20">
          <div className="rounded-3xl border border-gray-300 p-6 md:p-8">
            <p className="mb-6 text-center text-sm text-gray-500">Plug & play on any site</p>
            <div className="grid grid-cols-2 items-center gap-6 sm:grid-cols-3 md:grid-cols-5">
              <Logo src="/globe.svg" label="Global" />
              <Logo src="/window.svg" label="Widgets" />
              <Logo src="/vercel.svg" label="Vercel" />
              <Logo src="/next.svg" label="Next.js" />
              <Logo src="/file.svg" label="Docs" />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mt-16 md:mt-24" id="features">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-10 text-center font-poppins text-2xl font-semibold md:text-3xl">
              Everything you need to launch
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<BoltIcon className="h-6 w-6" />}
                title="5‑minute setup"
                desc="Drop in our widget, paste your App ID, and you’re live. No complex wiring."
              />
              <FeatureCard
                icon={<ShieldCheckIcon className="h-6 w-6" />}
                title="Secure by default"
                desc="Use a service account and short‑lived access tokens to keep your data safe."
              />
              <FeatureCard
                icon={<Cog6ToothIcon className="h-6 w-6" />}
                title="Configurable apps"
                desc="Create multiple apps per workspace—each linked to its own Google Doc and site."
              />
              <FeatureCard
                icon={<SparklesIcon className="h-6 w-6" />}
                title="Quality answers"
                desc="We parse your Google Doc in real‑time and ground model responses in your content."
              />
              <FeatureCard
                icon={<GlobeAltIcon className="h-6 w-6" />}
                title="Works anywhere"
                desc="Use on any framework or static site. First‑class Next.js experience included."
              />
              <FeatureCard
                icon={<CheckCircleIcon className="h-6 w-6" />}
                title="Built‑in analytics"
                desc="Track conversations, deflection, and lead capture to prove ROI."
              />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mt-16 md:mt-24" id="how-it-works">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-10 text-center font-poppins text-2xl font-semibold md:text-3xl">
              How it works
            </h2>
            <ol className="grid gap-5 md:grid-cols-3">
              <Step
                step="1"
                title="Create an app"
                desc="Add your website URL, Google Doc ID, and upload your service account JSON."
              />
              <Step
                step="2"
                title="Install the widget"
                desc="Install our npm package and initialize the chat with your App ID."
              />
              <Step
                step="3"
                title="Start chatting"
                desc="We fetch & parse your doc on demand and send grounded prompts to the model."
              />
            </ol>

            {/* Code snippet card */}
            <div className="mt-8 rounded-3xl border border-gray-300 bg-gray-50 p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold">Quick start (React)</p>
                <span className="text-xs text-gray-500">/your‑site</span>
              </div>
              <pre className="overflow-x-auto text-xs leading-relaxed md:text-sm">
                <code>
                  {`// 1) Install
//   npm i @yourorg/ai-chat-widget

// 2) Add to your app
import { ChatWidget } from '@yourorg/ai-chat-widget';

export default function Site() {
  return (
    <ChatWidget appId={"YOUR_APP_ID"} />
  );
}

// 3) (Optional) Send metadata
document.dispatchEvent(new CustomEvent('ai:identify', {
  detail: { email: 'user@acme.com' }
}));`}
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* Vision / About section */}
        <section className="mt-16 md:mt-24" id="about">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 font-poppins text-2xl font-semibold md:text-3xl">
              Why We Built This?
            </h2>
            <p className="mb-6 text-gray-500">
              We believe AI chatbots should be easy, secure, and business-ready in minutes — not
              weeks. Our platform lets anyone create a fully-customized chatbot powered by their own
              content, with zero coding required.
            </p>
            <p className="text-gray-500">
              Whether you’re running a small store or managing multiple brands, you can launch and
              manage multiple bots, each linked to its own content and website.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16 mb-20 md:mt-24" id="faq">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-2 text-center font-poppins text-2xl font-semibold md:text-3xl">
              Have questions?
            </h2>
            <p className="mb-6 text-center text-gray-500">
              Let&apos;s do our best to answer your most frequently asked questions
            </p>

            <div className="divide-y divide-gray-300 rounded-2xl border border-gray-300">
              <FaqItem
                q="How does authentication work?"
                a="Your website requests a short‑lived access token for a given App ID. The widget uses that token to send messages; the backend resolves the App to its Google Doc and credentials to answer securely."
              />
              <FaqItem
                q="Will the chatbot use my latest document changes?"
                a="Yes. We parse your Google Doc in real‑time on each query, so answers reflect the freshest content."
              />
              <FaqItem
                q="Can I have multiple chatbots for different products?"
                a="Absolutely. Create as many apps as you want—each with its own site, doc, and configuration."
              />
            </div>
          </div>
        </section>

        {/* Pricing teaser / CTA */}
        <section className="mt-10 mb-10 md:mt-14" id="cta">
          <div className="relative overflow-hidden rounded-3xl border border-gray-300 p-8 md:p-10">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-100 opacity-70 blur-3xl" />
            <div className="relative">
              <h3 className="mb-2 font-poppins text-xl font-semibold md:text-2xl">
                Get started free, upgrade anytime
              </h3>
              <p className="text-c max-w-2xl text-gray-500">
                Test the full flow with a free plan. When you’re ready, unlock higher limits and
                advanced controls.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Badge>Unlimited apps</Badge>
                <Badge>1,000 messages/mo</Badge>
                <Badge>Custom branding</Badge>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center gap-1 rounded-3xl bg-blue-500 px-6 py-2.5 text-white hover:bg-blue-600"
                >
                  Create your first app <ArrowRightIcon className="h-4 w-4" />
                </Link>
                <Link
                  href="/apps"
                  className="rounded-3xl border border-gray-300 px-6 py-2.5 text-center hover:border-gray-400"
                >
                  Explore examples
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/* ---------- Local UI bits (theme‑friendly, lightweight) ---------- */
function Logo({ src, label }: { src: string; label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-white py-4">
      <Image src={src} alt={label} width={24} height={24} />
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-3xl border border-gray-300 bg-white p-5 transition-shadow hover:border-gray-400 hover:shadow-lg">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        {icon}
      </div>
      <h3 className="mb-1 font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function Step({ step, title, desc }: { step: string; title: string; desc: string }) {
  return (
    <li className="rounded-3xl border border-gray-300 bg-white p-5">
      <div className="mb-2 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white">
          {step}
        </span>
        <h4 className="font-semibold">{title}</h4>
      </div>
      <p className="text-sm text-gray-600">{desc}</p>
    </li>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1 text-xs text-gray-700">
      <CheckCircleIcon className="h-4 w-4" /> {children}
    </span>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group p-5">
      <summary className="flex cursor-pointer list-none items-center justify-between">
        <span className="font-medium">{q}</span>
        <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-180" />
      </summary>
      <p className="mt-3 text-sm text-gray-600">{a}</p>
    </details>
  );
}
