/**
 * StatsCard Component
 * 
 * Displays a single stat with title, value, and optional change indicator.
 * Used in the dashboard for key metrics.
 */

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    trend: "up" | "down" | "neutral";
  };
  icon: LucideIcon;
}

export function StatsCard({ title, value, change, icon: Icon }: StatsCardProps) {
  return (
    <div className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-200 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-semibold tracking-tight">{value}</p>
          {change && (
            <p
              className={cn(
                "flex items-center gap-1 text-sm font-medium",
                change.trend === "up" && "text-success",
                change.trend === "down" && "text-destructive",
                change.trend === "neutral" && "text-muted-foreground"
              )}
            >
              <span>
                {change.trend === "up" && "↑"}
                {change.trend === "down" && "↓"}
              </span>
              {change.value}
            </p>
          )}
        </div>
        <div className="rounded-lg bg-muted p-3 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
