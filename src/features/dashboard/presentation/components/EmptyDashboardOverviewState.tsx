import AddIcon from "@mui/icons-material/Add";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";

interface Props {
  onAddAnimal?: () => void;
}

export function EmptyDashboardOverviewState({ onAddAnimal }: Props) {
  return (
    <Stack spacing={2}>
      <Paper
        variant="outlined"
        sx={{
          borderRadius: 4,
          minHeight: 420,
          p: { xs: 2, md: 3 },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>
          <Typography variant="h6" component="h2" fontWeight={700} color="primary">
            Your farm at a glance
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Animals, daily work, breeding and income appear here once you start logging them.
          </Typography>
        </Box>
        <Stack
          spacing={2}
          sx={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            py: 4,
            textAlign: "center",
          }}
        >
          <Avatar sx={{ width: 64, height: 64, bgcolor: "secondary.light", color: "primary.main" }}>
            <HomeOutlinedIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h5" component="h3" fontWeight={700} color="primary">
              Welcome to your farm
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 520, mt: 1 }}>
              Nothing to summarise yet. Add your first animal and your overview will fill in as
              you log activity.
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={onAddAnimal}
          >
            Add your first animal
          </Button>
        </Stack>
      </Paper>
      <Box
        sx={{
          px: { xs: 2, md: 3 },
          py: 2,
          borderRadius: 3,
          bgcolor: "secondary.light",
          color: "text.primary",
        }}
      >
        <Typography variant="body2">
          Tip: start by adding your animals, then use Log Activity for feeding, health checks and
          sales.
        </Typography>
      </Box>
    </Stack>
  );
}
