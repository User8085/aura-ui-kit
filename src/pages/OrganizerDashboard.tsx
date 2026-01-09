/**
 * Organizer Dashboard - Create and manage events
 */

import { useState } from "react";
import { Plus, Edit, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { EventForm, type EventFormData } from "@/components/events/EventForm";
import { AttendeeList } from "@/components/events/AttendeeList";
import { mockEvents, mockAttendees, type Event } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const OrganizerDashboard = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents.slice(0, 3));
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [viewingAttendees, setViewingAttendees] = useState<Event | null>(null);
  const { toast } = useToast();

  const handleCreate = async (data: EventFormData) => {
    const newEvent: Event = {
      ...data,
      id: Date.now().toString(),
      registered: 0,
      organizerId: "org1",
      organizerName: "You",
    };
    setEvents((prev) => [newEvent, ...prev]);
    setShowForm(false);
    toast({ title: "Event Created", description: "Your event has been created successfully." });
  };

  const handleEdit = async (data: EventFormData) => {
    if (!editingEvent) return;
    setEvents((prev) => prev.map((e) => (e.id === editingEvent.id ? { ...e, ...data } : e)));
    setEditingEvent(null);
    toast({ title: "Event Updated", description: "Your event has been updated." });
  };

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    toast({ title: "Event Deleted", description: "The event has been removed." });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardHeader userName="Jane Organizer" userRole="organizer" />
      <main className="container py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Events</h1>
            <p className="text-muted-foreground">Create and manage your events</p>
          </div>
          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" />Create Event</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader><DialogTitle>Create New Event</DialogTitle></DialogHeader>
              <EventForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-6">
              <div>
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-muted-foreground">{event.date} • {event.location} • {event.registered}/{event.capacity} registered</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setViewingAttendees(event)}><Users className="h-4 w-4" /></Button>
                <Button variant="outline" size="sm" onClick={() => setEditingEvent(event)}><Edit className="h-4 w-4" /></Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(event.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Dialog */}
        <Dialog open={!!editingEvent} onOpenChange={() => setEditingEvent(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>Edit Event</DialogTitle></DialogHeader>
            {editingEvent && <EventForm initialData={editingEvent} onSubmit={handleEdit} onCancel={() => setEditingEvent(null)} />}
          </DialogContent>
        </Dialog>

        {/* Attendees Dialog */}
        <Dialog open={!!viewingAttendees} onOpenChange={() => setViewingAttendees(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader><DialogTitle>Attendees - {viewingAttendees?.title}</DialogTitle></DialogHeader>
            {viewingAttendees && <AttendeeList attendees={mockAttendees} eventTitle={viewingAttendees.title} />}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default OrganizerDashboard;
