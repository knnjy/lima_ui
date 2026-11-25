import { Paper, Typography } from "@mui/material";

export function AnimalView() {
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
        Animals
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Manage individual animals on this farm.
      </Typography>
    </Paper>
  );
}
