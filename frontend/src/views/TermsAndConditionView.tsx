import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Bot, FileText, Mail, Scale, Shield, UserCheck } from "lucide-react";
import Link from "next/link";

const TermsAndConditionView = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:px-6 md:py-24 lg:px-8">
      <div className="mx-auto mb-16 max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
          <Scale className="h-4 w-4" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="mb-6 text-4xl font-bold text-balance md:text-5xl lg:text-6xl">
          Terms and Conditions
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-balance text-muted-foreground">
          Welcome to Docvia. By accessing or using our website, application, or services, you agree
          to be bound by these Terms and Conditions.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Content Sections */}
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Description of Service */}
        <Card className="bg-glow-blue border-border/40 bg-card/50 p-8 backdrop-blur-sm">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">1. Description of Service</h2>
              <p className="text-muted-foreground">
                Docvia is an AI-powered chatbot platform that allows users to connect selected
                Google Docs and create chat experiences for their websites. The chatbot uses the
                connected documents to answer user questions related to the user&apos;s product or
                service.
              </p>
            </div>
          </div>
        </Card>

        {/* Eligibility */}
        <Card className="bg-glow-purple border-border/40 bg-card/50 p-8 backdrop-blur-sm">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-secondary/20 bg-secondary/10">
              <UserCheck className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">2. Eligibility</h2>
              <p className="text-muted-foreground">
                You must be at least 13 years old (or the minimum legal age in your country) to use
                Docvia. By using our services, you confirm that you meet this requirement.
              </p>
            </div>
          </div>
        </Card>

        {/* Google Account & OAuth Usage */}
        <Card className="bg-glow-blue border-border/40 bg-card/50 p-8 backdrop-blur-sm">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">
                3. Google Account & OAuth Usage
              </h2>
              <p className="mb-4 text-muted-foreground">
                Docvia uses Google OAuth to allow users to connect their Google Drive.
              </p>
            </div>
          </div>
          <ul className="ml-16 space-y-3">
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span className="text-foreground">
                We only request access to Google Docs that you explicitly select
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span className="text-foreground">We do not access your entire Google Drive</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span className="text-foreground">
                You can revoke access at any time through your Google account settings
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span className="text-foreground">
                Use of Google services is also subject to Google&apos;s Terms of Service and Privacy
                Policy
              </span>
            </li>
          </ul>
        </Card>

        {/* User Responsibilities */}
        <Card className="bg-glow-purple border-border/40 bg-card/50 p-8 backdrop-blur-sm">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-secondary/20 bg-secondary/10">
              <UserCheck className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">4. User Responsibilities</h2>
              <p className="mb-4 text-muted-foreground">By using Docvia, you agree to:</p>
            </div>
          </div>
          <ul className="ml-16 space-y-3">
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
              <span className="text-foreground">Provide accurate and lawful content</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
              <span className="text-foreground">
                Use the service only for legal and ethical purposes
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
              <span className="text-foreground">
                Not misuse, abuse, or attempt to disrupt the platform
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
              <span className="text-foreground">
                Ensure you have the right to use and share any documents you connect
              </span>
            </li>
          </ul>
          <p className="mt-4 ml-16 font-semibold text-muted-foreground">
            You are responsible for the content you provide to Docvia.
          </p>
        </Card>

        {/* AI-Generated Responses */}
        <Card className="bg-glow-blue border-border/40 bg-card/50 p-8 backdrop-blur-sm">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">5. AI-Generated Responses</h2>
              <p className="mb-4 text-muted-foreground">
                Docvia uses AI models to generate responses based on your selected documents.
              </p>
            </div>
          </div>
          <ul className="ml-16 space-y-3">
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span className="text-foreground">
                AI responses may not always be accurate or complete
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span className="text-foreground">
                Docvia does not guarantee correctness of generated answers
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span className="text-foreground">
                You are responsible for reviewing and validating AI-generated content
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span className="text-foreground">
                Docvia should not be used as a substitute for professional advice
              </span>
            </li>
          </ul>
        </Card>

        {/* Data & Privacy */}
        <Card className="bg-glow-purple border-border/40 bg-card/50 p-8 backdrop-blur-sm">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-secondary/20 bg-secondary/10">
              <Shield className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">6. Data & Privacy</h2>
              <p className="text-muted-foreground">
                Your use of Docvia is also governed by our{" "}
                <Link href="/privacy-policy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                , which explains how we collect, use, and protect your data.
              </p>
            </div>
          </div>
        </Card>

        {/* Service Availability */}
        <Card className="bg-glow-blue border-border/40 bg-card/50 p-8 backdrop-blur-sm">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">7. Service Availability</h2>
              <p className="text-muted-foreground">
                We aim to keep Docvia available and reliable, but we do not guarantee uninterrupted
                or error-free service. Features may change, be updated, or discontinued at any time.
              </p>
            </div>
          </div>
        </Card>

        {/* Termination */}
        <Card className="bg-glow-purple border-border/40 bg-card/50 p-8 backdrop-blur-sm">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-secondary/20 bg-secondary/10">
              <Scale className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">8. Termination</h2>
            </div>
          </div>
          <ul className="ml-16 space-y-3">
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
              <span className="text-foreground">
                We reserve the right to suspend or terminate access to Docvia if these Terms are
                violated or if misuse of the platform is detected
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
              <span className="text-foreground">You may stop using Docvia at any time</span>
            </li>
          </ul>
        </Card>

        {/* Limitation of Liability */}
        <Card className="bg-glow-blue border-border/40 bg-card/50 p-8 backdrop-blur-sm">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">
                9. Limitation of Liability
              </h2>
            </div>
          </div>
          <ul className="ml-16 space-y-3">
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span className="text-foreground">
                Docvia is provided &apos;as is&apos; without warranties of any kind
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span className="text-foreground">
                We are not liable for any direct or indirect damages arising from the use of our
                service
              </span>
            </li>
          </ul>
        </Card>

        {/* Changes to Terms */}
        <Card className="bg-glow-purple border-border/40 bg-card/50 p-8 backdrop-blur-sm">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-secondary/20 bg-secondary/10">
              <FileText className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">
                10. Changes to These Terms
              </h2>
              <p className="text-muted-foreground">
                We may update these Terms from time to time. Continued use of Docvia after changes
                means you accept the updated Terms.
              </p>
            </div>
          </div>
        </Card>

        {/* Contact */}
        <Card className="bg-glow-blue border-border/40 bg-card/50 p-8 backdrop-blur-sm">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">11. Contact</h2>
              <p className="mb-4 text-muted-foreground">
                If you have any questions about these Terms, you can contact us at:
              </p>
              <p className="text-foreground">
                Email:{" "}
                <a href="mailto:support@docvia.com" className="text-primary hover:underline">
                  support@docvia.com
                </a>
              </p>
            </div>
          </div>
        </Card>

        <Separator className="my-8 bg-border/40" />

        {/* Contact Section */}
        <div className="py-8 text-center">
          <p className="mb-4 text-muted-foreground">Have questions about our terms?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditionView;
