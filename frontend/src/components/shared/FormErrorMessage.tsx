import { Info } from "lucide-react";

type FormErrorMessageProps = {
  message: string;
  icon?: React.ReactNode;
};

export default function FormErrorMessage({ message, icon }: FormErrorMessageProps) {
  return (
    <p className="form-error-message flex items-center gap-1">
      {icon ?? <Info className="inline-block h-4 w-4 text-red-500" />}
      {message}
    </p>
  );
}
