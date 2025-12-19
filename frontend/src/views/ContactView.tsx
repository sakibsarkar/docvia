"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Mail, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ContactView = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              Get in Touch
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Have a question or want to learn more about our AI chatbot platform? We&apos;d love to
              hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-glow-blue rounded-xl border border-border/40 bg-card/30 p-8 backdrop-blur-sm">
                <h2 className="mb-6 text-2xl font-bold text-foreground">Send us a Message</h2>

                {submitted ? (
                  <div className="rounded-lg border border-primary/20 bg-primary/10 p-6 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                      <Send className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-foreground">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for contacting us. We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="border-border/40 bg-input text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="border-border/40 bg-input text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-foreground">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                        className="border-border/40 bg-input text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        required
                        className="resize-none border-border/40 bg-input text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {loading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Email */}
              <div className="bg-glow-purple rounded-xl border border-border/40 bg-card/30 p-6 backdrop-blur-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">Email Us</h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  Send us an email and we&apos;ll respond within 24 hours.
                </p>
                <a
                  href="mailto:sakibsarkar707@gmail"
                  className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  sakibsarkar707@gmail
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Quick answers to common questions. Can&apos;t find what you&apos;re looking for?
              Contact us directly.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            <div className="rounded-xl border border-border/40 bg-card/30 p-6 backdrop-blur-sm">
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                What is the response time for support inquiries?
              </h3>
              <p className="text-muted-foreground">
                We typically respond to all inquiries within 24 hours during business days. For
                urgent matters, please call us directly.
              </p>
            </div>

            <div className="rounded-xl border border-border/40 bg-card/30 p-6 backdrop-blur-sm">
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Do you offer technical support?
              </h3>
              <p className="text-muted-foreground">
                Yes, we provide comprehensive technical support for all our plans. Premium plans
                include priority support with faster response times.
              </p>
            </div>

            <div className="rounded-xl border border-border/40 bg-card/30 p-6 backdrop-blur-sm">
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Can I schedule a demo of your platform?
              </h3>
              <p className="text-muted-foreground">
                Contact us through the form above and mention you&apos;d like to schedule a demo.
                Our team will reach out to arrange a convenient time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactView;
