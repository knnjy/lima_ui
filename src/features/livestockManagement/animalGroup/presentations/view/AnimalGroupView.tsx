import { Paper, Typography } from "@mui/material";

export function AnimalGroupView() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 4 },
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        minHeight: 320,
      }}
    >
      <Typography variant="h6" gutterBottom color="primary">
        Animal Groups
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Manage groups of animals on this farm.
      </Typography>
    </Paper>
  );
}
