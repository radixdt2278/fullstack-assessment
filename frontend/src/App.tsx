import { useState, useCallback } from 'react';
import './App.css';
import { Sidebar } from './components/layout/Sidebar';
import { CandidateCard } from './components/candidate/CandidateCard';
import { Pagination } from './components/common/Pagination';
import { useCandidates } from './hooks/useCandidates';
import { useFilters } from './hooks/useFilters';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const { filters, handleFilterChange, resetFilters } = useFilters();
  const { candidates, total, totalPages, loading, error } = useCandidates(searchValue, currentPage, filters);

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
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
        />

        <main className="flex-1 px-6">
          <div className="mb-4 flex items-center gap-4 mt-[9px]">
            <p className="text-[13.8px] text-[#222222]">
              {loading ? 'Loading...' : `Showing ${total} candidate applications`}
            </p>
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

          {candidates.length > 0 ? (
            <div className="bg-white border-l border-r border-[#e1e1e1]">
              {candidates.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8 bg-white border border-[#e1e1e1]">
              {loading ? 'Loading...' : 'No candidates found.'}
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
