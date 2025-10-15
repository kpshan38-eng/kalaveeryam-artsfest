import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Calendar, Trophy, Settings, LogOut } from "lucide-react";
import logo from "@/assets/kalaveeryam-logo.png";

const AdminDashboard = () => {
  const adminFeatures = [
    {
      title: "Manage Candidates",
      description: "Add, edit, and remove candidates",
      icon: Users,
      link: "/admin/candidates",
      color: "from-primary to-accent",
    },
    {
      title: "Manage Events",
      description: "Create and update event details",
      icon: Calendar,
      link: "/admin/events",
      color: "from-secondary to-primary",
    },
    {
      title: "Manage Results",
      description: "Upload and update event results",
      icon: Trophy,
      link: "/admin/results",
      color: "from-accent to-secondary",
    },
    {
      title: "Settings",
      description: "Change password and preferences",
      icon: Settings,
      link: "/admin/settings",
      color: "from-primary to-secondary",
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
              <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">Kalaveeryam Management</p>
            </div>
          </div>
          <Link to="/home">
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8 animate-fade-in">
          {/* Welcome Section */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-primary">Welcome, Admin</h2>
            <p className="text-muted-foreground">Manage your arts fest from here</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 text-center bg-card/50 backdrop-blur-sm">
              <div className="text-3xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Total Candidates</div>
            </Card>
            <Card className="p-6 text-center bg-card/50 backdrop-blur-sm">
              <div className="text-3xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Total Events</div>
            </Card>
            <Card className="p-6 text-center bg-card/50 backdrop-blur-sm">
              <div className="text-3xl font-bold text-secondary">0</div>
              <div className="text-sm text-muted-foreground">Completed Events</div>
            </Card>
            <Card className="p-6 text-center bg-card/50 backdrop-blur-sm">
              <div className="text-3xl font-bold text-accent">2</div>
              <div className="text-sm text-muted-foreground">Active Teams</div>
            </Card>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {adminFeatures.map((feature, index) => (
              <Link 
                key={feature.title}
                to={feature.link}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50 bg-card/50 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary mb-1 group-hover:text-secondary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
