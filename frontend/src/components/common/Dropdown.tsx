import { useState, useRef, useEffect } from 'react';

interface DropdownOption {
  label: string;
  value: string;
  onClick: () => void;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  variant?: 'primary' | 'secondary';
}

export const Dropdown: React.FC<DropdownProps> = ({ label, options, variant = 'secondary' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const buttonClasses = variant === 'primary'
    ? 'px-4 py-2 text-[13px] text-white bg-[#3B7FBF] rounded hover:bg-[#2B6FA8]'
    : 'w-full px-3 py-2 text-[14px] text-[#333333] border border-[#e1e1e1] bg-white rounded hover:bg-gray-50';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${buttonClasses} flex items-center justify-between`}
      >
        <span className="truncate">{label}</span>
        <svg
          className={`w-3.5 h-3.5 text-[#909090] flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-[#E5E7EB] rounded shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                option.onClick();
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-[14px] text-[#111827] hover:bg-[#F9FAFB] first:rounded-t last:rounded-b"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
