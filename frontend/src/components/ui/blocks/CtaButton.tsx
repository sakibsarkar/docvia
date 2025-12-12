"use client";
import { useAppSelector } from "@/hooks";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../button";
const CtaButton = ({ text }: { text?: string }) => {
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();
  const handleClick = () => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className="group bg-primary text-primary-foreground hover:bg-primary/90"
    >
      {text || "  Start for free"}
      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Button>
  );
};

export default CtaButton;
