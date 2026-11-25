import AddIcon from "@mui/icons-material/Add";
import { Button, Stack, Typography } from "@mui/material";

interface Props {
  userName: string;
  onCreateFarm: () => void;
}

export function FarmsHeader({ userName, onCreateFarm }: Props) {
  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
    >
      <div>
        <Typography variant="h4" component="h1" fontWeight={700} color="primary" gutterBottom>
          Welcome {userName}, to your farms
        </Typography>
        <Typography color="text.secondary">
          Choose a farm to open, accept an invitation, or create your own.
        </Typography>
      </div>
      <Button variant="contained" size="large" startIcon={<AddIcon />} onClick={onCreateFarm}>
        Create farm
      </Button>
    </Stack>
  );
}