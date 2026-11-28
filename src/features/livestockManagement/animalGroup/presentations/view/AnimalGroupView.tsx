import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import { supabaseAnimalGroupRepository } from "../../model/repositories/supabaseAnimalGroupRepository";
import type { AnimalGroupRecord, CreateAnimalGroupPayload } from "../../model/entities/AnimalGroup";
import { EmptyAnimalGroupsState } from "../components/EmptyAnimalGroupsState";
import { FarmOverviewBanner } from "../../../presentations/components/FarmOverviewBanner";

function readAnimalGroupList(response: unknown): AnimalGroupRecord[] {
  if (Array.isArray(response)) return response.filter(isRecord);
  if (!isRecord(response)) return [];
  for (const key of ["data", "animal_groups", "groups", "items"]) {
    const value = response[key];
    if (Array.isArray(value)) return value.filter(isRecord);
  }
  return [];
}

function isRecord(value: unknown): value is AnimalGroupRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function AnimalGroupView() {
  const { farmId = "" } = useParams();
  const [groups, setGroups] = useState<AnimalGroupRecord[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [addOpen, setAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [form, setForm] = useState({ group_name: "", species_id: "1", sex: "mixed", date_established: "", initial_head_count: "0", current_head_count: "0", status: "active", remarks: "" });
  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const result: unknown =
        await supabaseAnimalGroupRepository.getMyAnimalGroups(farmId);
      setGroups(readAnimalGroupList(result));
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, [farmId]);
  const createGroup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setFormError(null);
    const payload: CreateAnimalGroupPayload = {
      farm_id: farmId,
      species_id: Number(form.species_id),
      breed_id: null,
      group_name: form.group_name,
      sex: form.sex,
      date_established: form.date_established,
      initial_head_count: Number(form.initial_head_count),
      current_head_count: Number(form.current_head_count),
      status: form.status,
      remarks: form.remarks,
    };
    try {
      await supabaseAnimalGroupRepository.createAnimalGroup(payload);
      setAddOpen(false);
      await load();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "We couldn't create the group.");
    } finally {
      setSaving(false);
    }
  };
  useEffect(() => { void load(); }, [load]);
  const label = (group: AnimalGroupRecord) => String(group.group_name || group.animal_group_id || "Animal group");

  return (
    <Stack spacing={3}>
      <FarmOverviewBanner />
      <Stack spacing={0.5}>
        <Typography variant="h5" component="h1" fontWeight={700} color="primary">
          Animal groups
        </Typography>
        <Typography color="text.secondary">
          Track group identity, current head counts, and the events behind each change.
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="flex-end"><Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddOpen(true)}>Create group</Button></Stack>
      {status === "loading" && <Stack direction="row" spacing={2} alignItems="center" role="status"><CircularProgress size={20} /><Typography>Loading animal groups…</Typography></Stack>}
      {status === "error" && <Alert severity="error" action={<Button color="inherit" size="small" onClick={() => void load()}>Try again</Button>}>We couldn't load the animal groups for your account.</Alert>}
      {status === "ready" && (groups.length === 0 ? <EmptyAnimalGroupsState onCreateGroup={() => setAddOpen(true)} /> : <Stack spacing={1.5}>{groups.map((group, index) => <Paper key={String(group.animal_group_id ?? group.id ?? index)} variant="outlined" sx={{ p: 2, borderRadius: 3 }}><Typography fontWeight={700}>{label(group)}</Typography><Typography color="text.secondary">{[group.sex, group.status, group.current_head_count != null ? `${group.current_head_count} head` : null].filter(Boolean).join(" · ")}</Typography></Paper>)}</Stack>)}
      <Dialog open={addOpen} onClose={() => !saving && setAddOpen(false)} fullWidth maxWidth="sm"><DialogTitle>Create an animal group</DialogTitle><form onSubmit={createGroup}><DialogContent><Stack spacing={2} sx={{ pt: 1 }}>
        <TextField required label="Group name" value={form.group_name} onChange={(e) => setForm({ ...form, group_name: e.target.value })} />
        <TextField required type="number" label="Species ID" value={form.species_id} onChange={(e) => setForm({ ...form, species_id: e.target.value })} />
        <TextField required select SelectProps={{ native: true }} label="Sex" value={form.sex} onChange={(e) => setForm({ ...form, sex: e.target.value })}><option value="mixed">Mixed</option><option value="female">Female</option><option value="male">Male</option></TextField>
        <TextField required type="date" label="Date established" InputLabelProps={{ shrink: true }} value={form.date_established} onChange={(e) => setForm({ ...form, date_established: e.target.value })} />
        <TextField required type="number" label="Initial head count" value={form.initial_head_count} onChange={(e) => setForm({ ...form, initial_head_count: e.target.value })} />
        <TextField required type="number" label="Current head count" value={form.current_head_count} onChange={(e) => setForm({ ...form, current_head_count: e.target.value })} />
        <TextField required label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} />
        <TextField label="Remarks" multiline value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} />
        {formError && <Alert severity="error">{formError}</Alert>}
      </Stack></DialogContent><DialogActions><Button onClick={() => setAddOpen(false)} disabled={saving}>Cancel</Button><Button type="submit" variant="contained" disabled={saving}>{saving ? "Saving…" : "Save group"}</Button></DialogActions></form></Dialog>
    </Stack>
  );
}
