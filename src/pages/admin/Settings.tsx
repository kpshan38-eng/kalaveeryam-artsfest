import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirm: z.string()
}).refine((data)=>data.password === data.confirm, { message: "Passwords must match", path: ["confirm"] });

type FormData = z.infer<typeof schema>;

export default function AdminSettings() {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (v: FormData) => {
    const { error } = await supabase.auth.updateUser({ password: v.password });
    if (error) {
      toast({ title: "Password change failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Password updated" });
    reset({ password: "", confirm: "" });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary">Settings</h2>
        <p className="text-muted-foreground">Change password and preferences</p>
      </div>

      <Card className="p-6 bg-card/50 backdrop-blur-sm max-w-lg mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input type="password" placeholder="New password" {...register("password")} />
          <Input type="password" placeholder="Confirm new password" {...register("confirm")} />
          <Button type="submit" disabled={isSubmitting} className="w-full">Update Password</Button>
        </form>
      </Card>
    </div>
  );
}