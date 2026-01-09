/**
 * AttendeeList Component
 * 
 * Table displaying registered attendees for an event.
 * Used by organizers to manage registrations.
 */

import { Download, Mail, Search, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Attendee } from "@/lib/api";

interface AttendeeListProps {
  attendees: Attendee[];
  eventTitle: string;
}

export function AttendeeList({ attendees, eventTitle }: AttendeeListProps) {
  const [search, setSearch] = useState("");

  const filteredAttendees = attendees.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.department.toLowerCase().includes(search.toLowerCase())
  );

  const handleExport = () => {
    // In production, this would call an API or generate CSV
    console.log("Exporting attendee list for:", eventTitle);
  };

  if (attendees.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 py-12">
        <Users className="mb-4 h-12 w-12 text-muted-foreground/50" />
        <h3 className="mb-2 text-lg font-medium">No registrations yet</h3>
        <p className="text-sm text-muted-foreground">
          Attendees will appear here once they register
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search attendees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="rounded-lg bg-muted/50 px-4 py-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{attendees.length}</span> total registrations
          {search && filteredAttendees.length !== attendees.length && (
            <span>
              {" "}• <span className="font-semibold text-foreground">{filteredAttendees.length}</span> matching search
            </span>
          )}
        </p>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Department</TableHead>
              <TableHead className="font-semibold">Registered</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAttendees.map((attendee) => (
              <TableRow key={attendee.id} className="group">
                <TableCell className="font-medium">{attendee.name}</TableCell>
                <TableCell className="text-muted-foreground">{attendee.email}</TableCell>
                <TableCell className="text-muted-foreground">{attendee.department}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(attendee.registeredAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() => window.location.href = `mailto:${attendee.email}`}
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* No results */}
      {filteredAttendees.length === 0 && search && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No attendees match "{search}"
        </p>
      )}
    </div>
  );
}
