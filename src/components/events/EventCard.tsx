/**
 * EventCard Component
 * 
 * Card component for displaying event information.
 * Includes hover effects and status indicators.
 */

import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Event } from "@/lib/api";

interface EventCardProps {
  event: Event;
  showActions?: boolean;
  onRegister?: (eventId: string) => void;
  onUnregister?: (eventId: string) => void;
  variant?: "default" | "compact";
}

const categoryColors: Record<Event["category"], string> = {
  workshop: "bg-info/10 text-info",
  seminar: "bg-purple-500/10 text-purple-600",
  cultural: "bg-pink-500/10 text-pink-600",
  sports: "bg-success/10 text-success",
  technical: "bg-orange-500/10 text-orange-600",
  social: "bg-cyan-500/10 text-cyan-600",
};

export function EventCard({
  event,
  showActions = true,
  onRegister,
  onUnregister,
  variant = "default",
}: EventCardProps) {
  const isFull = event.registered >= event.capacity;
  const spotsLeft = event.capacity - event.registered;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300",
        "hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1",
        variant === "compact" && "flex flex-row"
      )}
    >
      {/* Category badge */}
      <div className="absolute left-4 top-4 z-10">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize",
            categoryColors[event.category]
          )}
        >
          {event.category}
        </span>
      </div>

      {/* Registered badge */}
      {event.isRegistered && (
        <div className="absolute right-4 top-4 z-10">
          <span className="inline-flex items-center rounded-full bg-success px-3 py-1 text-xs font-medium text-success-foreground">
            Registered
          </span>
        </div>
      )}

      {/* Image placeholder */}
      <div
        className={cn(
          "relative overflow-hidden bg-muted",
          variant === "default" ? "h-40" : "h-full w-32 flex-shrink-0"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Calendar className="h-12 w-12 text-muted-foreground/30" />
        </div>
      </div>

      {/* Content */}
      <div className={cn("p-5", variant === "compact" && "flex-1")}>
        <Link to={`/events/${event.id}`}>
          <h3 className="mb-2 text-lg font-semibold transition-colors group-hover:text-primary">
            {event.title}
          </h3>
        </Link>

        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {event.description}
        </p>

        {/* Meta info */}
        <div className="mb-4 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
        </div>

        {/* Capacity */}
        <div className="mb-4 flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <div className="flex-1">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                {event.registered} / {event.capacity} registered
              </span>
              {isFull ? (
                <span className="font-medium text-destructive">Full</span>
              ) : (
                <span className="text-muted-foreground">{spotsLeft} spots left</span>
              )}
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  isFull ? "bg-destructive" : "bg-primary"
                )}
                style={{ width: `${(event.registered / event.capacity) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Organizer */}
        <p className="mb-4 text-xs text-muted-foreground">
          by <span className="font-medium text-foreground">{event.organizerName}</span>
        </p>

        {/* Actions */}
        {showActions && (
          <div className="flex gap-2">
            {event.isRegistered ? (
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onUnregister?.(event.id)}
              >
                Cancel Registration
              </Button>
            ) : (
              <Button
                size="sm"
                className="flex-1"
                disabled={isFull}
                onClick={() => onRegister?.(event.id)}
              >
                {isFull ? "Event Full" : "Register Now"}
              </Button>
            )}
            <Button variant="outline" size="sm" asChild>
              <Link to={`/events/${event.id}`}>Details</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
