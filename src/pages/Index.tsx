/**
 * Landing Page
 * 
 * Hero section, features, and call-to-action for the SaaS product.
 */

import { ArrowRight, BarChart3, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built for speed with modern architecture that scales with your business.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption and compliance with industry standards.",
  },
  {
    icon: BarChart3,
    title: "Powerful Analytics",
    description: "Deep insights into your data with real-time dashboards and reports.",
  },
];

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 md:py-32">
          {/* Background gradient */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-muted via-background to-background" />

          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              {/* Badge */}
              <div
                className="mb-6 inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm font-medium opacity-0 animate-fade-up"
                style={{ animationDelay: "0ms" }}
              >
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-success" />
                Now in public beta
              </div>

              {/* Headline */}
              <h1
                className="text-balance text-4xl font-bold tracking-tight opacity-0 animate-fade-up sm:text-5xl md:text-6xl"
                style={{ animationDelay: "100ms" }}
              >
                Build better products
                <br />
                <span className="text-muted-foreground">faster than ever</span>
              </h1>

              {/* Subheadline */}
              <p
                className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground opacity-0 animate-fade-up"
                style={{ animationDelay: "200ms" }}
              >
                The modern platform for teams who want to ship faster. Streamline your workflow, collaborate seamlessly, and scale with confidence.
              </p>

              {/* CTAs */}
              <div
                className="mt-10 flex flex-col items-center justify-center gap-4 opacity-0 animate-fade-up sm:flex-row"
                style={{ animationDelay: "300ms" }}
              >
                <Button size="lg" asChild className="group">
                  <Link to="/signup">
                    Get started free
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#features">Learn more</a>
                </Button>
              </div>

              {/* Social proof */}
              <p
                className="mt-12 text-sm text-muted-foreground opacity-0 animate-fade-up"
                style={{ animationDelay: "400ms" }}
              >
                Trusted by 10,000+ teams worldwide
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="border-t border-border bg-muted/30 py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to succeed
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Powerful features designed to help your team move faster.
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-border bg-card p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4 inline-flex rounded-xl bg-primary p-3 text-primary-foreground">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container">
            <div className="mx-auto max-w-4xl rounded-3xl bg-primary p-12 text-center text-primary-foreground md:p-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="mt-4 text-lg opacity-90">
                Join thousands of teams already using Acme to ship faster.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  <Link to="/signup">Start free trial</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Contact sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
