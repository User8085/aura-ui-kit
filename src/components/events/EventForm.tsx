/**
 * EventForm Component
 * 
 * Form for creating and editing events.
 * Used by organizers in the dashboard.
 */

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { Event } from "@/lib/api";

interface EventFormProps {
  initialData?: Partial<Event>;
  onSubmit: (data: EventFormData) => Promise<void>;
  onCancel?: () => void;
}

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: Event["category"];
  capacity: number;
}

interface FormErrors {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  category?: string;
  capacity?: string;
  general?: string;
}

const categories: { value: Event["category"]; label: string }[] = [
  { value: "workshop", label: "Workshop" },
  { value: "seminar", label: "Seminar" },
  { value: "cultural", label: "Cultural" },
  { value: "sports", label: "Sports" },
  { value: "technical", label: "Technical" },
  { value: "social", label: "Social" },
];

export function EventForm({ initialData, onSubmit, onCancel }: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    date: initialData?.date || "",
    time: initialData?.time || "",
    location: initialData?.location || "",
    category: initialData?.category || "workshop",
    capacity: initialData?.capacity || 50,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 20) {
      newErrors.description = "Description should be at least 20 characters";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.time) {
      newErrors.time = "Time is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (formData.capacity < 1) {
      newErrors.capacity = "Capacity must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await onSubmit(formData);
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : "An error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof EventFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = field === "capacity" ? parseInt(e.target.value) || 0 : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General error */}
      {errors.general && (
        <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
          {errors.general}
        </div>
      )}

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Event Title</Label>
        <Input
          id="title"
          placeholder="Enter event title"
          value={formData.title}
          onChange={handleChange("title")}
          className={cn(errors.title && "border-destructive")}
          disabled={isLoading}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe your event..."
          value={formData.description}
          onChange={handleChange("description")}
          className={cn("min-h-[120px]", errors.description && "border-destructive")}
          disabled={isLoading}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description}</p>
        )}
      </div>

      {/* Date and Time */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={handleChange("date")}
            className={cn(errors.date && "border-destructive")}
            disabled={isLoading}
          />
          {errors.date && (
            <p className="text-sm text-destructive">{errors.date}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={handleChange("time")}
            className={cn(errors.time && "border-destructive")}
            disabled={isLoading}
          />
          {errors.time && (
            <p className="text-sm text-destructive">{errors.time}</p>
          )}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          placeholder="e.g., Main Auditorium"
          value={formData.location}
          onChange={handleChange("location")}
          className={cn(errors.location && "border-destructive")}
          disabled={isLoading}
        />
        {errors.location && (
          <p className="text-sm text-destructive">{errors.location}</p>
        )}
      </div>

      {/* Category and Capacity */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, category: value as Event["category"] }))
            }
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            min="1"
            value={formData.capacity}
            onChange={handleChange("capacity")}
            className={cn(errors.capacity && "border-destructive")}
            disabled={isLoading}
          />
          {errors.capacity && (
            <p className="text-sm text-destructive">{errors.capacity}</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : initialData?.id ? (
            "Update Event"
          ) : (
            "Create Event"
          )}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
