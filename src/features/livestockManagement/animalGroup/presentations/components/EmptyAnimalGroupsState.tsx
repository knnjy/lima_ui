import AddIcon from "@mui/icons-material/Add";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";

interface Props {
  onCreateGroup?: () => void;
}

export function EmptyAnimalGroupsState({ onCreateGroup }: Props) {
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
        <Typography color="text.secondary" sx={{ maxWidth: 700 }}>
          Groups keep animals that are managed together in one place, with a running head count
          and history.
        </Typography>
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
            <GroupsOutlinedIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h5" component="h2" fontWeight={700} color="primary">
              No animal groups yet
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 560, mt: 1 }}>
              Create a group for animals you manage together, such as a flock, herd or pen, to
              track head counts and changes over time.
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={onCreateGroup}
          >
            Create your first group
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
          Tip: name groups after how you manage them, such as “North pasture cattle”, so counts
          stay easy to read.
        </Typography>
      </Box>
    </Stack>
  );
}
