import { useState } from 'react';
import { SearchInput } from '../common/SearchInput';
import { CollapsibleSection } from '../common/CollapsibleSection';
import { Dropdown } from '../common/Dropdown';

interface SidebarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters: {
    application_type: string[];
    source: string[];
  };
  onFilterChange: (filterType: 'application_type' | 'source', value: string, checked: boolean) => void;
  onResetFilters: () => void;
  sortBy: string;
  sortOrder: string;
  onSortChange: (sortBy: string, sortOrder: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ searchValue, onSearchChange, filters, onFilterChange, onResetFilters, sortBy, sortOrder, onSortChange }) => {
  const [fullTextSearch, setFullTextSearch] = useState(false);

  const sortOptions = [
    { label: 'Last Activity (new to old)', value: 'last_activity_desc', onClick: () => onSortChange('last_activity', 'desc') },
    { label: 'Last Activity (old to new)', value: 'last_activity_asc', onClick: () => onSortChange('last_activity', 'asc') },
    { label: 'Name (A to Z)', value: 'name_asc', onClick: () => onSortChange('name', 'asc') },
    { label: 'Name (Z to A)', value: 'name_desc', onClick: () => onSortChange('name', 'desc') },
  ];

  const currentSortLabel = sortOptions.find(opt => opt.value === `${sortBy}_${sortOrder}`)?.label || 'Last Activity (new to old)';

  return (
    <aside className="w-[248px] bg-[#f7f8f7] min-h-screen px-6 pt-2 pb-6">
      <SearchInput value={searchValue} onChange={onSearchChange} />

      <div className="mt-2">
        <div className="flex items-center gap-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="fullTextSearch"
              checked={fullTextSearch}
              onChange={(e) => setFullTextSearch(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-[50px] h-[25px] bg-[#ccd4d1] rounded-full peer peer-checked:bg-[#047957] peer-focus:ring-2 peer-focus:ring-[#047957]/20 transition-colors duration-200 ease-in-out">
              <div className={`absolute left-0 top-0 w-[25px] h-[25px] bg-white border-[3px] rounded-full transition-transform duration-200 ease-in-out ${fullTextSearch ? 'translate-x-[25px] border-[#047957]' : 'translate-x-0 border-[#ccd4d1]'}`}></div>
            </div>
          </label>
          <label htmlFor="fullTextSearch" className="text-[13px] font-medium text-[#15372c] cursor-pointer leading-[19.5px]">
            Full Text Search
          </label>
        </div>
        <p className="text-[11.6px] text-[#909090] font-light leading-[12px] mt-1">(Includes resumes and notes)</p>
      </div>

      <div className="mt-4">
        <Dropdown label={currentSortLabel} options={sortOptions} variant="secondary" />
      </div>

      <div className="mt-6">
        <CollapsibleSection title="Application Type">
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.application_type.includes('active')}
                onChange={(e) => onFilterChange('application_type', 'active', e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-[13px] text-[#333333]">Active</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.application_type.includes('archived')}
                onChange={(e) => onFilterChange('application_type', 'archived', e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-[13px] text-[#333333]">Archived</span>
            </label>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Jobs" />
        <CollapsibleSection title="CRM" />
        <CollapsibleSection title="Profile Details" />

        <CollapsibleSection title="Source">
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.source.includes('LinkedIn')}
                onChange={(e) => onFilterChange('source', 'LinkedIn', e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-[13px] text-[#333333]">LinkedIn</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.source.includes('Indeed')}
                onChange={(e) => onFilterChange('source', 'Indeed', e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-[13px] text-[#333333]">Indeed</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.source.includes('Career Page')}
                onChange={(e) => onFilterChange('source', 'Career Page', e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-[13px] text-[#333333]">Career Page</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.source.includes('Referral')}
                onChange={(e) => onFilterChange('source', 'Referral', e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-[13px] text-[#333333]">Referral</span>
            </label>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Responsibility" />
        <CollapsibleSection title="Pipeline Tasks" />
        <CollapsibleSection title="Education" />
      </div>

      <button
        onClick={onResetFilters}
        className="mt-6 w-full px-4 py-2 text-[#3574d6] text-[13.9px] font-light flex items-center justify-center gap-2 hover:underline"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span>Reset Filters</span>
      </button>
    </aside>
  );
};
