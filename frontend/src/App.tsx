import { useState, useCallback } from 'react';
import './App.css';
import { Sidebar } from './components/layout/Sidebar';
import { CandidateCard } from './components/candidate/CandidateCard';
import { Pagination } from './components/common/Pagination';
import { FilterTag } from './components/common/FilterTag';
import { ActionButtons } from './components/common/ActionButtons';
import { CandidateListSkeleton } from './components/common/CandidateSkeleton';
import { useCandidates } from './hooks/useCandidates';
import { useFilters } from './hooks/useFilters';
import { useUrlState } from './hooks/useUrlState';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('last_activity');
  const [sortOrder, setSortOrder] = useState('desc');
  
  const { filters, handleFilterChange, resetFilters } = useFilters();
  const { candidates, total, totalPages, loading, error } = useCandidates(searchValue, currentPage, filters, sortBy, sortOrder);
  
  useUrlState(currentPage, searchValue, filters, setCurrentPage, setSearchValue, (newFilters) => {
    Object.entries(newFilters).forEach(([key, values]) => {
      values.forEach((value: string) => {
        handleFilterChange(key as 'application_type' | 'source', value, true);
      });
    });
  });

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSortChange = useCallback((newSortBy: string, newSortOrder: string) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1);
  }, []);

  const handleResetFilters = useCallback(() => {
    resetFilters();
    setSearchValue('');
    setCurrentPage(1);
  }, [resetFilters]);

  return (
    <div className="min-h-screen bg-[#f7f8f7]">
      <h1 className="text-[34.59px] font-normal text-[#15372c] px-6 pt-4 pb-3 leading-[46.67px]">All Candidates</h1>

      <div className="flex">
        <Sidebar
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />

        <main className="flex-1 px-6">
          <div className="mb-4 flex items-center justify-between mt-[9px]">
            <div className="flex items-center gap-3">
              <p className="text-[13.8px] text-[#222222]">
                {loading ? 'Loading...' : `Showing ${total} candidate applications`}
              </p>
              
              {(searchValue || filters.application_type.length > 0 || filters.source.length > 0) && (
                <div className="flex items-center gap-2">
                  {searchValue && (
                    <FilterTag
                      label={`Search: "${searchValue}"`}
                      onRemove={() => {
                        setSearchValue('');
                        setCurrentPage(1);
                      }}
                    />
                  )}
                  {filters.application_type.map(type => (
                    <FilterTag
                      key={type}
                      label={type.charAt(0).toUpperCase() + type.slice(1)}
                      onRemove={() => {
                        handleFilterChange('application_type', type, false);
                        setCurrentPage(1);
                      }}
                    />
                  ))}
                  {filters.source.map(src => (
                    <FilterTag
                      key={src}
                      label={src}
                      onRemove={() => {
                        handleFilterChange('source', src, false);
                        setCurrentPage(1);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            
            <ActionButtons />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="bg-neutral-50 border border-[#e1e1e1] border-b-0 rounded-t mb-0">
            <div className="grid grid-cols-[360px_1fr] h-[40px]">
              <div className="px-[15px] text-[12.4px] font-normal text-[#909090] flex items-center border-r border-[#e1e1e1]">Name</div>
              <div className="px-[15px] text-[12.4px] font-normal text-[#909090] flex items-center">Job/Status</div>
            </div>
          </div>

          {loading ? (
            <CandidateListSkeleton count={5} />
          ) : candidates.length > 0 ? (
            <div className="bg-white border-l border-r border-[#e1e1e1]">
              {candidates.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8 bg-white border border-[#e1e1e1]">
              No candidates found.
            </p>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
