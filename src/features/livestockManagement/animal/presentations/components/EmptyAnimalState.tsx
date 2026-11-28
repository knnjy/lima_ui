import AddIcon from "@mui/icons-material/Add";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import { Avatar, Button, Paper, Typography } from "@mui/material";

interface Props {
  onAddAnimal?: () => void;
}

export function EmptyAnimalState({ onAddAnimal }: Props) {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 4,
        minHeight: 320,
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        textAlign: "center",
      }}
    >
      <Avatar sx={{ width: 64, height: 64, bgcolor: "secondary.light", color: "primary.main" }}>
        <PetsOutlinedIcon fontSize="large" />
      </Avatar>
      <Typography variant="h5" component="h2" fontWeight={700} color="primary">
        No animals yet
      </Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 700 }}>
        Add your first animal to start tracking health, breeding and daily activity on this farm.
      </Typography>
      <Button variant="contained" size="large" startIcon={<AddIcon />} onClick={onAddAnimal}>
        Add your first animal
      </Button>
    </Paper>
  );
}
