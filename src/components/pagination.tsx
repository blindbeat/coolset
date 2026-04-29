import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE_OPTIONS = [10, 25, 50];

type PaginationProps = {
  pageIndex: number;
  pageSize: number;
  total: number;
  canPrevious: boolean;
  canNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onPageSizeChange: (size: number) => void;
};

export function Pagination({
  pageIndex,
  pageSize,
  total,
  canPrevious,
  canNext,
  onPrevious,
  onNext,
  onPageSizeChange,
}: PaginationProps) {
  const from = total === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min(from + pageSize - 1, total);

  return (
    <div className="flex items-center gap-8 pt-4">
      <label className="flex items-center gap-1">
        <span className="text-xs text-zinc-500">Rows per page:</span>
        <span className="relative inline-flex">
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-8 appearance-none rounded bg-white pr-7 pl-3 text-[0.8125rem] text-slate-950"
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <ChevronDown
            size={20}
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-zinc-500"
          />
        </span>
      </label>
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-500">
          {from}-{to} of {total}
        </span>
        <button
          type="button"
          onClick={onPrevious}
          disabled={!canPrevious}
          aria-label="Previous page"
          className="text-zinc-500 disabled:opacity-40"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          aria-label="Next page"
          className="text-zinc-500 disabled:opacity-40"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
