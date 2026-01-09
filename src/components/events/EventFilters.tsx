/**
 * EventFilters Component
 * 
 * Filter controls for browsing events.
 * Includes category and date filters.
 */

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EventFiltersProps {
  filters: {
    search: string;
    category: string;
    date: string;
  };
  onFilterChange: (filters: EventFiltersProps["filters"]) => void;
}

const categories = [
  { value: "", label: "All Events" },
  { value: "workshop", label: "Workshop" },
  { value: "seminar", label: "Seminar" },
  { value: "cultural", label: "Cultural" },
  { value: "sports", label: "Sports" },
  { value: "technical", label: "Technical" },
  { value: "social", label: "Social" },
];

const dateOptions = [
  { value: "", label: "Any Date" },
  { value: "today", label: "Today" },
  { value: "this-week", label: "This Week" },
  { value: "this-month", label: "This Month" },
];

export function EventFilters({ filters, onFilterChange }: EventFiltersProps) {
  const handleChange = (key: keyof typeof filters, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({ search: "", category: "", date: "" });
  };

  const hasActiveFilters = filters.search || filters.category || filters.date;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleChange("category", cat.value)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              filters.category === cat.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Date filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">Date:</span>
        {dateOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleChange("date", opt.value)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm transition-all",
              filters.date === opt.value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {opt.label}
          </button>
        ))}

        {/* Clear filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="ml-auto text-muted-foreground"
          >
            <X className="mr-1 h-4 w-4" />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
