interface FilterTagProps {
  label: string;
  onRemove: () => void;
}

export const FilterTag: React.FC<FilterTagProps> = ({ label, onRemove }) => {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#E5E7EB] text-[#111827] text-[13px] rounded-full">
      {label}
      <button
        onClick={onRemove}
        className="hover:bg-[#D1D5DB] rounded-full p-0.5"
        aria-label={`Remove ${label} filter`}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </span>
  );
};
