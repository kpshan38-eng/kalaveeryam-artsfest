import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Shield, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/kalaveeryam-logo.png";

const Admin = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple password check (will be enhanced with Supabase)
    setTimeout(() => {
      if (password === "shanukpshan1") {
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard",
        });
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: "Incorrect password. Please try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 opacity-10"
        style={{ background: "var(--gradient-watercolor)" }}
      />
      
      <Card className="w-full max-w-md relative z-10 animate-fade-in bg-card/80 backdrop-blur-sm">
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <img src={logo} alt="Kalaveeryam" className="h-20 w-20 object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Admin Portal</h1>
              <p className="text-sm text-muted-foreground">Kalaveeryam Arts Fest</p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                "Logging in..."
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Login
                </>
              )}
            </Button>
          </form>

          {/* Info */}
          <div className="text-center text-xs text-muted-foreground pt-4 border-t">
            <p>Authorized access only</p>
            <p className="mt-1">Contact SIDRA for access credentials</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Admin;
