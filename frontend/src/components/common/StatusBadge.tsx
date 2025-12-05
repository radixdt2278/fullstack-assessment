interface StatusBadgeProps {
  status: string;
  type?: 'success' | 'warning' | 'info' | 'default';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'default' }) => {
  const colors = {
    success: 'bg-[#D1FAE5] text-[#10B981]',
    warning: 'bg-[#FEF3C7] text-[#F59E0B]',
    info: 'bg-[#DBEAFE] text-[#3B7FBF]',
    default: 'bg-[#F3F4F6] text-[#6B7280]',
  };

  return (
    <span className={`inline-block px-2.5 py-1 text-[13px] rounded ${colors[type]}`}>
      {status}
    </span>
  );
};
