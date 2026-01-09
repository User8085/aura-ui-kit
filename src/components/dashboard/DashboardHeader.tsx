/**
 * DashboardHeader Component
 * 
 * Header for dashboard pages with user menu.
 */

import { Bell, Calendar, LogOut, Settings, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  userName?: string;
  userRole?: "organizer" | "student";
}

export function DashboardHeader({ userName = "User", userRole = "student" }: DashboardHeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_role");
    navigate("/login");
  };

  const dashboardPath = userRole === "organizer" ? "/organizer-dashboard" : "/student-dashboard";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to={dashboardPath} className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Calendar className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">CampusEvents</span>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <User className="h-4 w-4" />
                </div>
                <div className="hidden text-left md:block">
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs capitalize text-muted-foreground">{userRole}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
