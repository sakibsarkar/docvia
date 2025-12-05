import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string; // default: "Search"
  widthClassName?: string; // default: "w-[340px]" – change to "w-full" if needed
  onEnter?: (v: string) => void; // optional: fire when user presses Enter
};

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search",
  widthClassName = "w-[340px]",
  onEnter,
}: SearchBarProps) {
  return (
    <div
      role="search"
      aria-label="Search"
      className={`inline-flex ${widthClassName} items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus-within:ring-2 focus-within:ring-blue-500 hover:bg-gray-50`}
    >
      <Search className="h-4 w-4 text-gray-400" aria-hidden />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onEnter) onEnter(value);
        }}
        placeholder={placeholder}
        className="w-full border-none bg-transparent p-0 outline-none placeholder:text-gray-400 focus:border-none focus:ring-0"
      />
    </div>
  );
}
