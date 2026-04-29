import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-4">
      <div className="flex items-center gap-1">
        <span className="text-xs text-zinc-500">Rows per page:</span>
        <Select value={pageSize} onValueChange={(v) => v !== null && onPageSizeChange(v)}>
          <SelectTrigger size="sm" aria-label="Rows per page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAGE_SIZE_OPTIONS.map((n) => (
              <SelectItem key={n} value={n}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-500">
          {from}-{to} of {total}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onPrevious}
          disabled={!canPrevious}
          aria-label="Previous page"
          className="text-zinc-500"
        >
          <ChevronLeft className="size-5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onNext}
          disabled={!canNext}
          aria-label="Next page"
          className="text-zinc-500"
        >
          <ChevronRight className="size-5" />
        </Button>
      </div>
    </div>
  );
}
