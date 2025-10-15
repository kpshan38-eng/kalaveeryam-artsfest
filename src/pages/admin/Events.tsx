import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Trash2, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  category: z.enum(["music", "dance", "literary", "arts"]),
  description: z.string().trim().max(1000).optional().or(z.literal("")),
  stage: z.string().trim().max(100).optional().or(z.literal("")),
  event_date: z.string().optional().or(z.literal("")),
  max_points: z.coerce.number().min(1).max(100)
});

type FormData = z.infer<typeof schema>;

export default function AdminEvents() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const { register, handleSubmit, reset, setValue } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { category: "music", max_points: 10 } });

  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("*").order("event_date", { ascending: true });
      if (error) throw error;
      return data;
    }
  });

  const addMutation = useMutation({
    mutationFn: async (payload: FormData) => {
      const { error } = await supabase.from("events").insert({
        name: payload.name,
        category: payload.category,
        description: payload.description || null,
        stage: payload.stage || null,
        event_date: payload.event_date ? new Date(payload.event_date).toISOString() : null,
        max_points: payload.max_points,
      });
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["events"] }); reset({ name: "", category: "music", description: "", stage: "", event_date: "", max_points: 10 }); toast({ title: "Event created" }); }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["events"] }); toast({ title: "Event removed" }); }
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary">Manage Events</h2>
        <p className="text-muted-foreground">Create and update event details</p>
      </div>

      <Card className="p-6 bg-card/50 backdrop-blur-sm">
        <form onSubmit={handleSubmit((v)=>addMutation.mutate(v))} className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <Input placeholder="Event name" className="md:col-span-2" {...register("name")} />
          <Select defaultValue="music" onValueChange={(val)=>setValue("category", val as any)}>
            <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="dance">Dance</SelectItem>
              <SelectItem value="literary">Literary</SelectItem>
              <SelectItem value="arts">Arts</SelectItem>
            </SelectContent>
          </Select>
          <Input type="date" {...register("event_date")} />
          <Input type="text" placeholder="Stage" {...register("stage")} />
          <Input type="number" placeholder="Max Points" {...register("max_points", { valueAsNumber: true })} />
          <Textarea placeholder="Description" className="md:col-span-6" {...register("description")} />
          <Button type="submit" disabled={addMutation.isPending}><Plus className="h-4 w-4 mr-2"/>Add Event</Button>
        </form>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events?.map((e:any)=> (
          <Card key={e.id} className="p-4 flex items-center justify-between bg-card/50 backdrop-blur-sm">
            <div>
              <div className="font-semibold text-primary">{e.name}</div>
              <div className="text-xs text-muted-foreground">{e.category} • {e.stage || "-"} • {e.event_date ? new Date(e.event_date).toLocaleDateString() : "TBD"}</div>
            </div>
            <Button variant="destructive" size="icon" onClick={()=>deleteMutation.mutate(e.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}