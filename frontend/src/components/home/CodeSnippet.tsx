"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle, Copy } from "lucide-react";
import { useState } from "react";
const code = `// 1) Install
// npm i @generativeai/chat-widget

// 2) Add to your app
import { ChatWidget } from '@generativeai/chat-widget'

// 3) (Optional) Send metadata
document.dispatchEvent(new CustomEvent('ai-identify', {
  detail: { email: 'user@acme.com' }
}));`;
const CodeSnippet = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section className="border-t border-border/40 py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="mb-4 text-center text-4xl font-bold text-balance md:text-5xl">
          Quick start
        </h2>
        <p className="mb-12 text-center text-muted-foreground">Start building in minutes</p>

        <div className="relative mx-auto max-w-4xl">
          {/* Code Block */}

          <div className="p-[0.5px 0.5px 0.5px 1px] relative z-3 rounded-[6px] border-1 border-[transparent] bg-[#72768a36] backdrop-blur-[35px]">
            <div className="primaryRadialGradient relative z-10 rounded-[5px]">
              <div className="overflow-x-auto p-6 font-mono text-sm md:p-8">
                <pre className="text-muted-foreground">
                  <code>{code}</code>
                </pre>
              </div>

              {/* Copy Button */}
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopy}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                {copied ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeSnippet;
