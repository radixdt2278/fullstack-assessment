export const CandidateSkeleton: React.FC = () => {
  return (
    <div className="border-b border-[#E5E7EB] animate-pulse">
      <div className="grid grid-cols-[345px_1fr] py-5">
        <div className="px-5 space-y-3">
          <div className="h-5 bg-[#E5E7EB] rounded w-3/4"></div>
          <div className="h-4 bg-[#E5E7EB] rounded w-full"></div>
          <div className="h-4 bg-[#E5E7EB] rounded w-2/3"></div>
        </div>
        <div className="px-4 space-y-3">
          <div className="h-4 bg-[#E5E7EB] rounded w-1/2"></div>
          <div className="h-4 bg-[#E5E7EB] rounded w-1/3"></div>
        </div>
      </div>
      <div className="grid grid-cols-[345px_1fr] py-2.5 bg-[#F9FAFB]">
        <div className="px-5">
          <div className="h-4 bg-[#E5E7EB] rounded w-1/3"></div>
        </div>
        <div className="px-4">
          <div className="h-4 bg-[#E5E7EB] rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export const CandidateListSkeleton: React.FC<{ count?: number }> = ({ count = 5 }) => {
  return (
    <div className="bg-white border-l border-r border-[#e1e1e1]">
      {Array.from({ length: count }).map((_, idx) => (
        <CandidateSkeleton key={idx} />
      ))}
    </div>
  );
};
