import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function AdminRoute({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        if (mounted) {
          setAuthorized(false);
          setLoading(false);
        }
        return;
      }
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();
      if (!mounted) return;
      if (error) {
        setAuthorized(false);
      } else {
        setAuthorized(data?.role === "admin");
      }
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return null;
  if (!authorized) return <Navigate to="/admin" state={{ from: location }} replace />;
  return <>{children}</>;
}