/**
 * Student Dashboard - Browse and register for events
 */

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { EventCard } from "@/components/events/EventCard";
import { EventFilters } from "@/components/events/EventFilters";
import { mockEvents } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const StudentDashboard = () => {
  const [events, setEvents] = useState(mockEvents);
  const [filters, setFilters] = useState({ search: "", category: "", date: "" });
  const { toast } = useToast();

  const filteredEvents = events.filter((e) => {
    if (filters.category && e.category !== filters.category) return false;
    if (filters.search && !e.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const handleRegister = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, isRegistered: true, registered: e.registered + 1 } : e))
    );
    toast({ title: "Registered!", description: "You've been registered for this event." });
  };

  const handleUnregister = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, isRegistered: false, registered: e.registered - 1 } : e))
    );
    toast({ title: "Cancelled", description: "Your registration has been cancelled." });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardHeader userName="John Student" userRole="student" />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Browse Events</h1>
          <p className="text-muted-foreground">Find and register for campus events</p>
        </div>
        <div className="mb-8">
          <EventFilters filters={filters} onFilterChange={setFilters} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} onRegister={handleRegister} onUnregister={handleUnregister} />
          ))}
        </div>
        {filteredEvents.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">No events match your filters</div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
