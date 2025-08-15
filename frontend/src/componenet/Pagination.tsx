// src/components/Pagination.tsx
interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function Pagination({ page, totalPages, onPrev, onNext }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        disabled={page === 1}
        onClick={onPrev}
        className="bg-yellow-400 text-indigo-900 font-semibold px-2 py-1 text-sm rounded-md disabled:opacity-50"
      >
        Prev
      </button>
      <span className="text-gray-700 font-medium text-sm">
        {page} / {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={onNext}
        className="bg-yellow-400 text-indigo-900 font-semibold px-2 py-1 text-sm rounded-md disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
