import type { Cell, Header, Table as TanStackTable } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, Pin } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "../lib/utils";
import { Pagination } from "./pagination";

export function TableContainer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("overflow-auto rounded-t border border-slate-200", className)} {...props} />
  );
}

export function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <table
      className={cn(
        "w-full border-separate border-spacing-0 text-xs [&_tbody_tr:last-child_td]:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

export function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead className={cn("sticky top-0 z-10 bg-white", className)} {...props} />;
}

export function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody className={className} {...props} />;
}

export function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return <tr className={className} {...props} />;
}

type TableHeadProps<TData> = React.ComponentProps<"th"> & {
  header?: Header<TData, unknown>;
};

export function TableHead<TData = unknown>({
  className,
  scope = "col",
  header,
  children,
  style,
  ...props
}: TableHeadProps<TData>) {
  return (
    <th
      scope={scope}
      aria-sort={
        header?.column.getCanSort()
          ? header.column.getIsSorted() === "asc"
            ? "ascending"
            : header.column.getIsSorted() === "desc"
              ? "descending"
              : "none"
          : undefined
      }
      style={
        header?.column.getIsPinned() === "left"
          ? { left: header.getStart("left"), ...style }
          : style
      }
      className={cn(
        "h-10 border-r border-b border-slate-200 px-4 py-1 text-left align-middle font-semibold text-zinc-500 last:border-r-0",
        header?.column.getIsPinned() === "left" && "sticky z-20 bg-white shadow-pinned",
        className,
      )}
      {...props}
    >
      <span className="flex items-center gap-2">
        {header?.column.getCanSort() ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={header.column.getToggleSortingHandler()}
            aria-label="Sort"
          >
            {header.column.getIsSorted() === "asc" ? (
              <ArrowUp className="size-4 text-slate-950" />
            ) : header.column.getIsSorted() === "desc" ? (
              <ArrowDown className="size-4 text-slate-950" />
            ) : (
              <ArrowUpDown className="size-4" />
            )}
          </Button>
        ) : null}
        <span className="min-w-0 flex-1 truncate">{children}</span>
        {header?.column.getCanPin() ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() =>
              header.getContext().table.setColumnPinning({
                left: header.column.getIsPinned() === "left" ? [] : [header.column.id],
              })
            }
            aria-pressed={header.column.getIsPinned() === "left"}
            aria-label="Pin column"
            className={cn(header.column.getIsPinned() === "left" && "text-slate-950")}
          >
            <Pin className="size-4" />
          </Button>
        ) : null}
      </span>
    </th>
  );
}

type TableCellProps<TData> = React.ComponentProps<"td"> & {
  cell?: Cell<TData, unknown>;
};

export function TableCell<TData = unknown>({
  className,
  cell,
  style,
  ...props
}: TableCellProps<TData>) {
  return (
    <td
      style={
        cell?.column.getIsPinned() === "left"
          ? { left: cell.column.getStart("left"), ...style }
          : style
      }
      className={cn(
        "h-12 border-r border-b border-slate-200 px-4 align-middle text-slate-950 last:border-r-0",
        cell?.column.getIsPinned() === "left" && "sticky z-1 bg-white shadow-pinned",
        className,
      )}
      {...props}
    />
  );
}

type TablePaginationProps<TData> = {
  table: TanStackTable<TData>;
};

export function TablePagination<TData>({ table }: TablePaginationProps<TData>) {
  return (
    <Pagination
      pageIndex={table.getState().pagination.pageIndex}
      pageSize={table.getState().pagination.pageSize}
      total={table.getRowCount()}
      canPrevious={table.getCanPreviousPage()}
      canNext={table.getCanNextPage()}
      onPrevious={() => table.previousPage()}
      onNext={() => table.nextPage()}
      onPageSizeChange={(size) => table.setPageSize(size)}
    />
  );
}
