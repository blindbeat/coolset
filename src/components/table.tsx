import type { Table as TanStackTable } from "@tanstack/react-table";
import type * as React from "react";

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

export function TableHead({ className, scope = "col", ...props }: React.ComponentProps<"th">) {
  return (
    <th
      scope={scope}
      className={cn(
        "h-10 border-r border-b border-slate-200 px-4 py-1 text-left align-middle font-semibold text-zinc-500 last:border-r-0",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      className={cn(
        "h-12 border-r border-b border-slate-200 px-4 align-middle text-slate-950 last:border-r-0",
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
