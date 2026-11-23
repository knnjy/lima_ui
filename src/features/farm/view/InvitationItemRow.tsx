import { Button, ListItem, Stack, Typography } from "@mui/material";
import { formatExpiry, formatInvitationMeta } from "../model/yourFarms.format";
import type { InvitationItem } from "../model/yourFarms.types";

interface Props {
  invitation: InvitationItem;
  busy: boolean;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

export function InvitationItemRow({ invitation, busy, onAccept, onDecline }: Props) {
  return (
    <ListItem
      disableGutters
      divider
      sx={{ flexWrap: "wrap", justifyContent: "space-between", gap: 2, minHeight: 94 }}
    >
      <Stack spacing={0.5} sx={{ flex: "1 1 320px" }}>
        <Typography variant="h6" component="span" fontWeight={600}>
          {invitation.farmName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatInvitationMeta(invitation)}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {formatExpiry(invitation.expiresInDays)}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          disabled={busy}
          onClick={() => onAccept(invitation.id)}
          sx={{ minWidth: 160 }}
        >
          Accept invitation
        </Button>
        <Button
          variant="outlined"
          disabled={busy}
          onClick={() => onDecline(invitation.id)}
          sx={{ minWidth: 120 }}
        >
          Decline
        </Button>
      </Stack>
    </ListItem>
  );
}
