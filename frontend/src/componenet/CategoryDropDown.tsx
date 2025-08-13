import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Option<T> = {
  label: string;
  value: T;
};

interface DropdownProps<T> {
  value: T;
  onChange: (v: T) => void;
  options: Option<T>[];
  placeholder?: string;
  label?: string;
}

export default function CategoryDropDown<T>({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  label
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label ||
    `${placeholder}${label ? ` ${label}` : ""}`;

  return (
    <div className="relative w-full max-w-xs">
      {/* Selected */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-2 rounded-full border border-gray-300 bg-white shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#432DD7]"
      >
        <span className="text-gray-700">{selectedLabel}</span>
        <ChevronDown
          size={18}
          className={`text-gray-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute z-20 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-fadeIn">
          {options.map((opt) => (
            <li
              key={String(opt.value)}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gradient-to-r hover:from-[#432DD7] hover:to-purple-500 hover:text-white transition-all"
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}