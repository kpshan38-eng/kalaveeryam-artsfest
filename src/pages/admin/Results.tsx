import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  event_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  position: z.coerce.number().min(1).max(10),
  points: z.coerce.number().min(0).max(100),
  remarks: z.string().trim().max(300).optional().or(z.literal(""))
});

type FormData = z.infer<typeof schema>;

export default function AdminResults() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const { setValue, register, handleSubmit, reset } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { data: events } = useQuery({ queryKey: ["events"], queryFn: async ()=>{ const { data, error } = await supabase.from("events").select("id,name").order("name"); if (error) throw error; return data; } });
  const { data: candidates } = useQuery({ queryKey: ["candidates"], queryFn: async ()=>{ const { data, error } = await supabase.from("candidates").select("id,name,team").order("name"); if (error) throw error; return data; } });
  const { data: results } = useQuery({ queryKey: ["results"], queryFn: async ()=>{ const { data, error } = await supabase.from("results").select("id, position, points, remarks, event_id, candidate_id, events(name), candidates(name,team)"); if (error) throw error; return data; } });

  const addMutation = useMutation({
    mutationFn: async (payload: FormData) => {
      const { error } = await supabase.from("results").upsert({
        event_id: payload.event_id,
        candidate_id: payload.candidate_id,
        position: payload.position,
        points: payload.points,
        remarks: payload.remarks || null,
      }, { onConflict: "event_id,candidate_id" });
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["results"] }); reset({} as any); toast({ title: "Result saved" }); }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("results").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["results"] }); toast({ title: "Result removed" }); }
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary">Manage Results</h2>
        <p className="text-muted-foreground">Upload and update event results</p>
      </div>

      <Card className="p-6 bg-card/50 backdrop-blur-sm">
        <form onSubmit={handleSubmit((v)=>addMutation.mutate(v))} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Select onValueChange={(val)=>setValue("event_id", val)}>
            <SelectTrigger><SelectValue placeholder="Event" /></SelectTrigger>
            <SelectContent>
              {events?.map((e:any)=> <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select onValueChange={(val)=>setValue("candidate_id", val)}>
            <SelectTrigger><SelectValue placeholder="Candidate" /></SelectTrigger>
            <SelectContent>
              {candidates?.map((c:any)=> <SelectItem key={c.id} value={c.id}>{c.name} • {c.team}</SelectItem>)}
            </SelectContent>
          </Select>
          <Input type="number" placeholder="Position" {...register("position", { valueAsNumber: true })} />
          <Input type="number" placeholder="Points" {...register("points", { valueAsNumber: true })} />
          <Input type="text" placeholder="Remarks" {...register("remarks")} />
          <Button type="submit" className="md:col-span-5"><Plus className="h-4 w-4 mr-2"/>Save Result</Button>
        </form>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results?.map((r:any)=> (
          <Card key={r.id} className="p-4 flex items-center justify-between bg-card/50 backdrop-blur-sm">
            <div>
              <div className="font-semibold text-primary">{r.events?.name} — {r.candidates?.name} ({r.candidates?.team})</div>
              <div className="text-xs text-muted-foreground">Pos {r.position} • {r.points} pts • {r.remarks || "-"}</div>
            </div>
            <Button variant="destructive" size="icon" onClick={()=>deleteMutation.mutate(r.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}