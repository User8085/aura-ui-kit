/**
 * Profile Page - View and edit user profile
 */

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@college.edu",
    department: "Computer Science",
    phone: "+1 234 567 890",
  });
  const { toast } = useToast();

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
    toast({ title: "Profile Updated", description: "Your changes have been saved." });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardHeader userName={profile.name} userRole="student" />
      <main className="container max-w-2xl py-8">
        <h1 className="mb-8 text-2xl font-bold">Profile Settings</h1>
        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={profile.email} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Input value={profile.department} onChange={(e) => setProfile({ ...profile, department: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
            </div>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Save Changes"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
