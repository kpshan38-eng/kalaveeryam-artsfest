import { Link } from "react-router-dom";
import { Trophy, Users, Shield, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import logo from "@/assets/kalaveeryam-logo.png";

const Home = () => {
  const features = [
    {
      title: "Results Portal",
      description: "View live event results and standings",
      icon: Trophy,
      link: "/results",
      gradient: "from-primary to-accent",
    },
    {
      title: "Team Dashboard",
      description: "Track MAMLUK and SELJUK performance",
      icon: Users,
      link: "/teams",
      gradient: "from-secondary to-primary",
    },
    {
      title: "Admin Portal",
      description: "Manage events and candidates",
      icon: Shield,
      link: "/admin",
      gradient: "from-accent to-secondary",
    },
    {
      title: "About",
      description: "Learn more about Kalaveeryam",
      icon: Info,
      link: "/about",
      gradient: "from-primary to-secondary",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Kalaveeryam" className="h-12 w-12 object-contain" />
            <div>
              <h1 className="text-xl font-bold text-primary">Kalaveeryam</h1>
              <p className="text-xs text-muted-foreground">MIAC Arts Fest</p>
            </div>
          </div>
          <Link to="/admin">
            <Button variant="outline" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Admin
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{ background: "var(--gradient-watercolor)" }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-6 animate-fade-in">
            <img 
              src={logo} 
              alt="Kalaveeryam Arts Fest" 
              className="w-48 h-48 md:w-64 md:h-64 object-contain mx-auto drop-shadow-2xl animate-scale-in"
            />
            <h2 className="text-4xl md:text-6xl font-bold text-primary">
              Kalaveeryam Arts Fest
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Maunathul Islam Arabic College, Puthuponnani
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <p className="text-sm text-muted-foreground">
                Organized by <span className="font-semibold text-primary">SIDRA</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Class Teacher: <span className="font-semibold text-primary">KP Salman Hudawi</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link 
                key={feature.title} 
                to={feature.link}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50 bg-card/50 backdrop-blur-sm">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2025 Kalaveeryam Arts Fest - MIAC Ponnani</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
