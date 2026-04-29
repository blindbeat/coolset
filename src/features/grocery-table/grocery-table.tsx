import type { ColumnPinningState, RowData } from "@tanstack/react-table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { useIsViewportBelow } from "@/hooks/use-is-viewport-below";

import { cn } from "../../lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
} from "../../components/table";

import { groceries } from "./groceries";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    numeric?: boolean;
  }
}

const processedGroceries = groceries.map((g) => ({
  name: g.name,
  section: g.section,
  price: g.price,
  pricePer100g: g.price / (g.weight * 10),
}));

type Grocery = (typeof processedGroceries)[number];

const SECTIONS = Array.from(new Set(processedGroceries.map((g) => g.section))).sort();

const columnHelper = createColumnHelper<Grocery>();

const numberFmt = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const columns = [
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("section", {
    header: "Section",
    filterFn: "equalsString",
    enableSorting: false,
  }),
  columnHelper.accessor("price", {
    header: "Price (€)",
    cell: ({ getValue }) => numberFmt.format(getValue()),
    meta: { numeric: true },
  }),
  columnHelper.accessor("pricePer100g", {
    header: "Price / 100 g (€)",
    cell: ({ getValue }) => numberFmt.format(getValue()),
    meta: { numeric: true },
  }),
];

export default function GroceryTable() {
  const isNarrow = useIsViewportBelow(768);
  const [manualPinning, setManualPinning] = useState<ColumnPinningState | null>(null);
  const autoPinning: ColumnPinningState = { left: isNarrow ? ["name"] : [] };
  const effectivePinning = manualPinning ?? autoPinning;

  const table = useReactTable({
    data: processedGroceries,
    columns,
    state: { columnPinning: effectivePinning },
    onColumnPinningChange: (updater) => {
      setManualPinning(typeof updater === "function" ? updater(effectivePinning) : updater);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <h2 className="text-[0.9375rem] font-medium tracking-tight">Today's groceries</h2>
        <Select
          value={table.getColumn("section")?.getFilterValue() ?? null}
          onValueChange={(v) => table.getColumn("section")?.setFilterValue(v ?? undefined)}
        >
          <SelectTrigger size="sm">
            <SelectValue placeholder="All sections" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null}>All sections</SelectItem>
            {SECTIONS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <TableContainer className="min-h-0">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} header={header}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    cell={cell}
                    className={cn(cell.column.columnDef.meta?.numeric && "text-right tabular-nums")}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination table={table} />
    </div>
  );
}
