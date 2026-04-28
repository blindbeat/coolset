import type * as React from "react";

import { cn } from "../lib/utils";

export function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="overflow-hidden rounded-t border border-slate-200">
      <table className={cn("w-full border-collapse text-xs", className)} {...props} />
    </div>
  );
}

export function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead className={cn("border-b border-slate-200", className)} {...props} />;
}

export function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody className={className} {...props} />;
}

export function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return <tr className={cn("border-b border-slate-200 last:border-b-0", className)} {...props} />;
}

export function TableHead({ className, scope = "col", ...props }: React.ComponentProps<"th">) {
  return (
    <th
      scope={scope}
      className={cn(
        "h-10 border-r border-slate-200 px-4 py-1 text-left align-middle font-semibold text-zinc-500 last:border-r-0",
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
        "h-12 border-r border-slate-200 px-4 align-middle text-slate-950 last:border-r-0",
        className,
      )}
      {...props}
    />
  );
}
