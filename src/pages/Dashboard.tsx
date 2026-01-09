/**
 * Dashboard Page
 * 
 * Main dashboard with stats cards, data table, and actions.
 * Uses placeholder data - in production, would fetch from API.
 */

import { useState, useEffect } from "react";
import { Plus, Users, DollarSign, FolderOpen, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DataTable } from "@/components/dashboard/DataTable";

// Placeholder data - would come from dashboardApi in production
const placeholderStats = [
  {
    title: "Total Users",
    value: "12,847",
    change: { value: "+12.5%", trend: "up" as const },
    icon: Users,
  },
  {
    title: "Revenue",
    value: "$48,294",
    change: { value: "+8.2%", trend: "up" as const },
    icon: DollarSign,
  },
  {
    title: "Active Projects",
    value: "234",
    change: { value: "+3.1%", trend: "up" as const },
    icon: FolderOpen,
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: { value: "-0.4%", trend: "down" as const },
    icon: TrendingUp,
  },
];

const placeholderActivity = [
  { id: "1", user: "John Doe", action: "Created new project", date: "Jan 9, 2026", status: "completed" as const },
  { id: "2", user: "Jane Smith", action: "Updated settings", date: "Jan 9, 2026", status: "completed" as const },
  { id: "3", user: "Mike Johnson", action: "Invited team member", date: "Jan 8, 2026", status: "pending" as const },
  { id: "4", user: "Sarah Wilson", action: "Deployed to production", date: "Jan 8, 2026", status: "completed" as const },
  { id: "5", user: "Tom Brown", action: "Failed payment", date: "Jan 7, 2026", status: "failed" as const },
  { id: "6", user: "Emily Davis", action: "Upgraded plan", date: "Jan 7, 2026", status: "completed" as const },
];

const Dashboard = () => {
  const [userName] = useState("John Doe");
  const [activity] = useState(placeholderActivity);

  // In production, you would fetch data like this:
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const stats = await dashboardApi.getStats();
  //     const activity = await dashboardApi.getRecentActivity();
  //     setStats(stats);
  //     setActivity(activity);
  //   };
  //   fetchData();
  // }, []);

  const handleTableAction = (action: string, id: string) => {
    console.log(`Action: ${action}, ID: ${id}`);
    // Handle table actions (view, edit, delete)
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardHeader userName={userName} />

      <main className="container py-8">
        {/* Page header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your business.
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {placeholderStats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Activity Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </div>
          <DataTable data={activity} onAction={handleTableAction} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
