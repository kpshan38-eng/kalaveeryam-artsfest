import { Card } from "@/components/ui/card";
import { Users, Heart, Trophy } from "lucide-react";
import logo from "@/assets/kalaveeryam-logo.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Kalaveeryam" className="h-12 w-12 object-contain" />
            <div>
              <h1 className="text-xl font-bold text-primary">Kalaveeryam</h1>
              <p className="text-xs text-muted-foreground">About</p>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <img 
              src={logo} 
              alt="Kalaveeryam Arts Fest" 
              className="w-48 h-48 object-contain mx-auto drop-shadow-2xl animate-scale-in"
            />
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">About Kalaveeryam</h1>
              <p className="text-xl text-muted-foreground">MIAC Arts Fest</p>
            </div>
          </div>

          {/* About Content */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">Our Festival</h2>
              <p className="text-muted-foreground leading-relaxed">
                Kalaveeryam is the premier arts festival of Maunathul Islam Arabic College (MIAC), 
                Puthuponnani. This celebration of creativity and talent brings together students 
                in a vibrant showcase of artistic excellence across multiple disciplines including 
                music, dance, literary arts, and visual arts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-primary">Community</h3>
                <p className="text-sm text-muted-foreground">
                  Bringing together talented students from across programs
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-primary">Passion</h3>
                <p className="text-sm text-muted-foreground">
                  Celebrating artistic expression and cultural heritage
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center mx-auto">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-primary">Excellence</h3>
                <p className="text-sm text-muted-foreground">
                  Recognizing and rewarding outstanding talent
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">Organizers</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="font-semibold text-primary">Conducted by SIDRA</p>
                  <p className="text-sm text-muted-foreground">Class Union</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="font-semibold text-primary">Class Teacher: KP Salman Hudawi</p>
                  <p className="text-sm text-muted-foreground">Faculty Coordinator</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">Competing Teams</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 rounded-lg border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                  <h3 className="text-xl font-bold text-primary mb-2">MAMLUK</h3>
                  <p className="text-sm text-muted-foreground mb-3">Team Leaders:</p>
                  <ul className="space-y-1 text-sm">
                    <li className="text-foreground">• Muhammed Sinan V</li>
                    <li className="text-foreground">• Mehabin</li>
                  </ul>
                </div>
                <div className="p-6 rounded-lg border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-primary/5">
                  <h3 className="text-xl font-bold text-primary mb-2">SELJUK</h3>
                  <p className="text-sm text-muted-foreground mb-3">Team Leaders:</p>
                  <ul className="space-y-1 text-sm">
                    <li className="text-foreground">• Huwais</li>
                    <li className="text-foreground">• Suhan</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;
