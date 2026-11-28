import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import { supabaseAnimalRepository } from "../../model/repositories/supabaseAnimalRepository";
import type { AnimalRecord, CreateAnimalPayload } from "../../model/entities/Animal";
import { EmptyAnimalState } from "../components/EmptyAnimalState";
import { FarmOverviewBanner } from "../../../presentations/components/FarmOverviewBanner";

function readAnimalList(response: unknown): AnimalRecord[] {
  if (Array.isArray(response)) return response.filter(isRecord);
  if (!isRecord(response)) return [];
  for (const key of ["data", "animals", "items"]) {
    const value = response[key];
    if (Array.isArray(value)) return value.filter(isRecord);
  }
  return [];
}

function isRecord(value: unknown): value is AnimalRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function AnimalView() {
  const { farmId = "" } = useParams();
  const [animals, setAnimals] = useState<AnimalRecord[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [addOpen, setAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", identifier_number: "", species_id: "1", sex: "female", birth_date: "", remarks: "", event_type: "purchased", event_date: "", entry_remarks: "" });
  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const result: unknown = await supabaseAnimalRepository.getMyAnimals(farmId);
      setAnimals(readAnimalList(result));
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, [farmId]);
  const createAnimal = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setFormError(null);
    const payload: CreateAnimalPayload = {
      farm_id: farmId,
      species_id: Number(form.species_id),
      breed_id: null,
      animal_group_id: null,
      identifier_number: form.identifier_number,
      name: form.name,
      sex: form.sex,
      birth_date: form.birth_date,
      remarks: form.remarks,
      entry: { event_type: form.event_type, event_date: form.event_date, remarks: form.entry_remarks },
    };
    try {
      await supabaseAnimalRepository.createAnimal(payload);
      setAddOpen(false);
      await load();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "We couldn't add the animal.");
    } finally {
      setSaving(false);
    }
  };
  useEffect(() => { void load(); }, [load]);
  const label = (animal: AnimalRecord) => String(animal.name || animal.identifier_number || animal.animal_id || "Animal");

  return (
    <Stack spacing={3}>
      <FarmOverviewBanner />
      <Stack spacing={0.5}>
        <Typography variant="h5" component="h1" fontWeight={700} color="primary">
          Animals
        </Typography>
        <Typography color="text.secondary">
          Manage individual animals on this farm.
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="flex-end"><Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddOpen(true)}>Add animal</Button></Stack>
      {status === "loading" && <Stack direction="row" spacing={2} alignItems="center" role="status"><CircularProgress size={20} /><Typography>Loading animals…</Typography></Stack>}
      {status === "error" && <Alert severity="error" action={<Button color="inherit" size="small" onClick={() => void load()}>Try again</Button>}>We couldn't load the animals for your account.</Alert>}
      {status === "ready" && (animals.length === 0 ? <EmptyAnimalState onAddAnimal={() => setAddOpen(true)} /> : <Stack spacing={1.5}>{animals.map((animal, index) => <Paper key={String(animal.animal_id ?? animal.id ?? index)} variant="outlined" sx={{ p: 2, borderRadius: 3 }}><Typography fontWeight={700}>{label(animal)}</Typography><Typography color="text.secondary">{[animal.identifier_number, animal.sex, animal.birth_date].filter(Boolean).join(" · ")}</Typography></Paper>)}</Stack>)}
      <Dialog open={addOpen} onClose={() => !saving && setAddOpen(false)} fullWidth maxWidth="sm"><DialogTitle>Add an animal</DialogTitle><form onSubmit={createAnimal}><DialogContent><Stack spacing={2} sx={{ pt: 1 }}>
        <TextField required label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <TextField required label="Identifier number" value={form.identifier_number} onChange={(e) => setForm({ ...form, identifier_number: e.target.value })} />
        <TextField required type="number" label="Species ID" value={form.species_id} onChange={(e) => setForm({ ...form, species_id: e.target.value })} />
        <TextField required select SelectProps={{ native: true }} label="Sex" value={form.sex} onChange={(e) => setForm({ ...form, sex: e.target.value })}><option value="female">Female</option><option value="male">Male</option></TextField>
        <TextField required type="date" label="Birth date" InputLabelProps={{ shrink: true }} value={form.birth_date} onChange={(e) => setForm({ ...form, birth_date: e.target.value })} />
        <TextField label="Remarks" multiline value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} />
        <Typography variant="subtitle2">Initial entry</Typography>
        <TextField required label="Event type" value={form.event_type} onChange={(e) => setForm({ ...form, event_type: e.target.value })} />
        <TextField required type="date" label="Event date" InputLabelProps={{ shrink: true }} value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} />
        <TextField label="Entry remarks" multiline value={form.entry_remarks} onChange={(e) => setForm({ ...form, entry_remarks: e.target.value })} />
        {formError && <Alert severity="error">{formError}</Alert>}
      </Stack></DialogContent><DialogActions><Button onClick={() => setAddOpen(false)} disabled={saving}>Cancel</Button><Button type="submit" variant="contained" disabled={saving}>{saving ? "Saving…" : "Save animal"}</Button></DialogActions></form></Dialog>
    </Stack>
  );
}
