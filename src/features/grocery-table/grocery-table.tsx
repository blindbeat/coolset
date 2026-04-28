import type { RowData } from "@tanstack/react-table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
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

const columnHelper = createColumnHelper<Grocery>();

const numberFmt = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const columns = [
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("section", { header: "Section" }),
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
  const table = useReactTable({
    data: processedGroceries,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <h2 className="mb-12 text-[0.9375rem] font-medium tracking-tight text-slate-950">
        Today's groceries
      </h2>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
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
                  className={cell.column.columnDef.meta?.numeric ? "text-right tabular-nums" : ""}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
