export const ActionButtons: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <button className="px-4 py-2 text-[13px] text-[#3B7FBF] border border-[#3B7FBF] rounded hover:bg-[#3B7FBF]/5">
        Generate Report
      </button>
      <button className="px-4 py-2 text-[13px] text-white bg-[#3B7FBF] rounded hover:bg-[#2B6FA8]">
        + Add Candidate
      </button>
      <button className="px-4 py-2 text-[13px] text-[#6B7280] border border-[#D1D5DB] rounded hover:bg-gray-50">
        Bulk Actions
      </button>
    </div>
  );
};
