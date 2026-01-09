/**
 * DataTable Component
 * 
 * Reusable table component for displaying tabular data.
 * Includes status badges and action buttons.
 */

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DataTableProps {
  data: Array<{
    id: string;
    user: string;
    action: string;
    date: string;
    status: "completed" | "pending" | "failed";
  }>;
  onAction?: (action: string, id: string) => void;
}

const statusStyles = {
  completed: "bg-success/10 text-success",
  pending: "bg-amber-500/10 text-amber-600",
  failed: "bg-destructive/10 text-destructive",
};

export function DataTable({ data, onAction }: DataTableProps) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-semibold">User</TableHead>
            <TableHead className="font-semibold">Action</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} className="group">
              <TableCell className="font-medium">{row.user}</TableCell>
              <TableCell className="text-muted-foreground">{row.action}</TableCell>
              <TableCell className="text-muted-foreground">{row.date}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                    statusStyles[row.status]
                  )}
                >
                  {row.status}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onAction?.("view", row.id)}>
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onAction?.("edit", row.id)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onAction?.("delete", row.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
