import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  program: z.string().trim().max(100).optional().or(z.literal("")),
  team: z.enum(["MAMLUK", "SELJUK"]),
});

type FormData = z.infer<typeof schema>;

export default function AdminCandidates() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { team: "MAMLUK" } });

  const { data: candidates } = useQuery({
    queryKey: ["candidates"],
    queryFn: async () => {
      const { data, error } = await supabase.from("candidates").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const addMutation = useMutation({
    mutationFn: async (payload: FormData) => {
      const { error } = await supabase.from("candidates").insert({ name: payload.name, team: payload.team, program: payload.program || null });
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["candidates"] }); reset({ name: "", program: "", team: "MAMLUK" }); toast({ title: "Candidate added" }); }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("candidates").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["candidates"] }); toast({ title: "Candidate removed" }); }
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary">Manage Candidates</h2>
        <p className="text-muted-foreground">Add, edit, and remove candidates</p>
      </div>

      <Card className="p-6 bg-card/50 backdrop-blur-sm">
        <form onSubmit={handleSubmit((v)=>addMutation.mutate(v))} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input placeholder="Name" {...register("name")} />
          <Input placeholder="Program" {...register("program")} />
          <Select onValueChange={(val)=>setValue("team", val as any)} defaultValue="MAMLUK">
            <SelectTrigger><SelectValue placeholder="Team" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="MAMLUK">MAMLUK</SelectItem>
              <SelectItem value="SELJUK">SELJUK</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" disabled={addMutation.isPending}><Plus className="h-4 w-4 mr-2"/>Add</Button>
        </form>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {candidates?.map((c:any)=> (
          <Card key={c.id} className="p-4 flex items-center justify-between bg-card/50 backdrop-blur-sm">
            <div>
              <div className="font-semibold text-primary">{c.name}</div>
              <div className="text-xs text-muted-foreground">{c.program || "-"} • {c.team}</div>
            </div>
            <Button variant="destructive" size="icon" onClick={()=>deleteMutation.mutate(c.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}