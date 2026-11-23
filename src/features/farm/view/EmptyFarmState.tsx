import AddIcon from "@mui/icons-material/Add";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import { Avatar, Button, Paper, Typography } from "@mui/material";

interface Props {
  hasInvitations: boolean;
  onCreateFarm: () => void;
}

export function EmptyFarmsState({ hasInvitations, onCreateFarm }: Props) {
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
        <HomeWorkOutlinedIcon fontSize="large" />
      </Avatar>
      <Typography variant="h5" component="h2" fontWeight={700} color="primary">
        No farms yet
      </Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 700 }}>
        {hasInvitations
          ? "Accept an invitation above to join a farm as a worker, or create your own farm as an owner."
          : "Create your own farm as an owner to start keeping records."}
      </Typography>
      <Button variant="contained" size="large" startIcon={<AddIcon />} onClick={onCreateFarm}>
        Create your first farm
      </Button>
    </Paper>
  );
}