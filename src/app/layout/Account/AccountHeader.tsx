import { Box, Button, Divider, Link, Stack, Typography } from "@mui/material";

interface Props {
  helpHref: string;
  onLogout: () => void;
}

export function AccountHeader({ helpHref, onLogout }: Props) {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        minHeight: 92,
        px: { xs: 3, md: 12 },
        bgcolor: "background.paper",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h5" component="span" fontWeight={700} color="primary">
          LiMa
        </Typography>
        <Divider orientation="vertical" flexItem sx={{ my: 1.5 }} />
        <Typography variant="body2" color="text.secondary">
          Your farm, in good hands.
        </Typography>
      </Stack>

      <Stack component="nav" aria-label="Account" direction="row" alignItems="center" spacing={2}>
        <Link href={helpHref} underline="none" color="text.secondary" fontWeight={500} variant="body2">
          Need help?
        </Link>
        <Button color="primary" onClick={onLogout} sx={{ minHeight: 44, fontWeight: 500 }}>
          Log out
        </Button>
      </Stack>
    </Box>
  );
}
