import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Crown, TrendingUp } from "lucide-react";
import logo from "@/assets/kalaveeryam-logo.png";
import { Link } from "react-router-dom";

const Teams = () => {
  const teams = [
    {
      name: "MAMLUK",
      color: "from-primary to-accent",
      leaders: ["Muhammed Sinan V", "Mehabin"],
      points: 0,
      position: 1,
    },
    {
      name: "SELJUK",
      color: "from-secondary to-primary",
      leaders: ["Huwais", "Suhan"],
      points: 0,
      position: 2,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Kalaveeryam" className="h-12 w-12 object-contain" />
            <div>
              <h1 className="text-xl font-bold text-primary">Kalaveeryam</h1>
              <p className="text-xs text-muted-foreground">Team Dashboard</p>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8 animate-fade-in">
          {/* Title Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-primary">Team Dashboard</h1>
            <p className="text-muted-foreground">Live team standings and leaderboard</p>
          </div>

          {/* Teams Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {teams.map((team, index) => (
              <Card 
                key={team.name}
                className="overflow-hidden animate-fade-in bg-card/50 backdrop-blur-sm"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`h-2 bg-gradient-to-r ${team.color}`} />
                <div className="p-8 space-y-6">
                  {/* Team Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-primary mb-2 flex items-center gap-2">
                        {team.name}
                        {team.position === 1 && (
                          <Crown className="h-6 w-6 text-secondary" />
                        )}
                      </h2>
                      <Badge variant="outline" className="text-sm">
                        Position #{team.position}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                        {team.points}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Points</div>
                    </div>
                  </div>

                  {/* Leaders Section */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                      <Crown className="h-4 w-4" />
                      Team Leaders
                    </h3>
                    <div className="space-y-2">
                      {team.leaders.map((leader) => (
                        <div 
                          key={leader}
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${team.color} flex items-center justify-center text-white font-bold`}>
                            {leader.charAt(0)}
                          </div>
                          <span className="font-medium text-foreground">{leader}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats Section */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">0</div>
                      <div className="text-xs text-muted-foreground">Events Won</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">0</div>
                      <div className="text-xs text-muted-foreground">Participants</div>
                    </div>
                    <div className="text-center flex flex-col items-center">
                      <div className="flex items-center gap-1 text-2xl font-bold text-accent">
                        <TrendingUp className="h-5 w-5" />
                        0%
                      </div>
                      <div className="text-xs text-muted-foreground">Win Rate</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Info Message */}
          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm">
            <p className="text-muted-foreground">
              Team statistics will update automatically as results are entered through the admin portal.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Teams;
