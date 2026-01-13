import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Database, Eye, FileText, Lock, Shield, UserCheck } from "lucide-react";
import Link from "next/link";

const PirvacyPolicyView = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:px-6 md:py-24 lg:px-8">
      <div className="mx-auto mb-16 max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
          <Shield className="h-4 w-4" />
          <span>Privacy & Data Protection</span>
        </div>
        <h1 className="mb-6 text-4xl font-bold text-balance md:text-5xl lg:text-6xl">
          Data Collection & Usage
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-balance text-muted-foreground">
          Docvia is designed with privacy, transparency, and security at its core. We only access
          the minimum data required to provide our services.
        </p>
      </div>

      {/* Content Sections */}
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Google Drive Access */}
        <Card className="bg-glow-blue border-border/40 bg-card/50 p-8 backdrop-blur-sm">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">Google Drive Access</h2>
              <p className="text-muted-foreground">
                When you connect your Google account, Docvia requests read-only access to specific
                Google Docs that you explicitly select while creating an app or chatbot.
              </p>
            </div>
          </div>
          <ul className="ml-16 space-y-3">
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span className="text-foreground">We do not access your entire Google Drive</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span className="text-foreground">We only read the documents you choose</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span className="text-foreground">
                Access is limited to content used to train and respond through your chatbot
              </span>
            </li>
          </ul>
        </Card>

        {/* How Your Data Is Used */}
        <Card className="bg-glow-purple border-border/40 bg-card/50 p-8 backdrop-blur-sm">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-secondary/20 bg-secondary/10">
              <Eye className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">How Your Data Is Used</h2>
              <p className="mb-4 text-muted-foreground">
                The selected Google Docs are used solely to:
              </p>
            </div>
          </div>
          <ul className="ml-16 space-y-3">
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
              <span className="text-foreground">
                Understand your product, service, or business content
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
              <span className="text-foreground">
                Generate accurate responses to customer questions on your website
              </span>
            </li>
          </ul>
          <p className="mt-4 ml-16 text-muted-foreground">
            Our AI processes this data only when a customer submits a query related to your chatbot.
          </p>
        </Card>

        {/* AI Model Usage */}
        <Card className="bg-glow-blue border-border/40 bg-card/50 p-8 backdrop-blur-sm">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">AI Model Usage</h2>
              <p className="text-muted-foreground">
                Docvia uses Google Gemini (gemini-1.5-flash) to process and understand the selected
                documents.
              </p>
            </div>
          </div>
          <ul className="ml-16 space-y-3">
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span className="text-foreground">The AI reads only the connected Google Docs</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span className="text-foreground">No unrelated files or data are processed</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span className="text-foreground">
                The AI does not have memory beyond the selected content and active query
              </span>
            </li>
          </ul>
        </Card>

        {/* Customer & Private Data */}
        <Card className="bg-glow-purple border-border/40 bg-card/50 p-8 backdrop-blur-sm">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-secondary/20 bg-secondary/10">
              <Lock className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">Customer & Private Data</h2>
              <p className="text-muted-foreground">We take user privacy seriously:</p>
            </div>
          </div>
          <ul className="ml-16 space-y-3">
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
              <span className="text-foreground">
                We never read, store, or analyze private chats
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
              <span className="text-foreground">We do not monitor personal conversations</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
              <span className="text-foreground">
                Customer messages are used only to generate real-time responses
              </span>
            </li>
          </ul>
        </Card>

        {/* Data Storage & Security */}
        <Card className="bg-glow-blue border-border/40 bg-card/50 p-8 backdrop-blur-sm">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">Data Storage & Security</h2>
            </div>
          </div>
          <ul className="ml-16 space-y-3">
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span className="text-foreground">
                We do not permanently store your document content unless required for functionality
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span className="text-foreground">
                All data transmission is secured using industry-standard encryption
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span className="text-foreground">
                Access can be revoked by disconnecting Google Drive at any time
              </span>
            </li>
          </ul>
        </Card>

        {/* Your Control */}
        <Card className="bg-glow-purple border-border/40 bg-card/50 p-8 backdrop-blur-sm">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-secondary/20 bg-secondary/10">
              <UserCheck className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">Your Control</h2>
              <p className="text-muted-foreground">You are always in control of your data:</p>
            </div>
          </div>
          <ul className="ml-16 space-y-3">
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
              <span className="text-foreground">Add or remove documents anytime</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
              <span className="text-foreground">Revoke Google access instantly</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
              <span className="text-foreground">
                Delete your app or chatbot whenever you choose
              </span>
            </li>
          </ul>
        </Card>

        <Separator className="my-8 bg-border/40" />

        {/* Contact Section */}
        <div className="py-8 text-center">
          <p className="mb-4 text-muted-foreground">Have questions about our privacy practices?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Contact Us
          </Link>
        </div>

        <p className="pb-8 text-center text-sm text-muted-foreground">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </section>
  );
};

export default PirvacyPolicyView;
