/**
 * Landing Page - Hero, features, upcoming events
 */

import { ArrowRight, Calendar, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EventCard } from "@/components/events/EventCard";
import { mockEvents } from "@/lib/api";

const features = [
  { icon: Calendar, title: "Easy Discovery", description: "Browse and filter events by category, date, or interest." },
  { icon: Users, title: "Simple Registration", description: "Register for events with one click and manage your schedule." },
  { icon: Sparkles, title: "For Organizers", description: "Create events, track attendance, and engage your audience." },
];

const Index = () => {
  const upcomingEvents = mockEvents.slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-muted via-background to-background" />
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm font-medium">
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-success" />
                Spring 2026 events now live
              </div>
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Discover campus events
                <br /><span className="text-muted-foreground">that matter to you</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
                Your one-stop platform for college events. Browse workshops, seminars, cultural fests, and more.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild className="group">
                  <Link to="/signup">
                    Get Started <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#events">Browse Events</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-border bg-muted/30 py-20">
          <div className="container">
            <h2 className="mb-12 text-center text-3xl font-bold">How it works</h2>
            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
              {features.map((f) => (
                <div key={f.title} className="rounded-2xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="mx-auto mb-4 inline-flex rounded-xl bg-primary p-3 text-primary-foreground">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section id="events" className="py-20">
          <div className="container">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold">Upcoming Events</h2>
              <Button variant="ghost" asChild>
                <Link to="/student-dashboard">View all →</Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} showActions={false} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
