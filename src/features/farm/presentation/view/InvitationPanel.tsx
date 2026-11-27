import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Alert, ButtonBase, Chip, Collapse, List, Paper, Stack, Typography } from "@mui/material";
import type { InvitationItem } from "../../model/entities/InvitationItem";
import { InvitationItemRow } from "./InvitationItemRow";

interface Props {
  invitations: InvitationItem[];
  isOpen: boolean;
  actionError: string | null;
  isBusy: (id: string) => boolean;
  onToggle: () => void;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

export function InvitationsPanel(props: Props) {
  const { invitations, isOpen, actionError, isBusy, onToggle, onAccept, onDecline } = props;
  const count = invitations.length;

  return (
    <Paper variant="outlined" sx={{ borderRadius: 4 }}>
      <ButtonBase
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls="invitations-list"
        sx={{
          width: "100%",
          minHeight: 80,
          px: 3,
          gap: 2,
          justifyContent: "flex-start",
          textAlign: "left",
          borderRadius: 4,
        }}
      >
        <MailOutlineIcon color="primary" />
        <Typography variant="subtitle1" fontWeight={600}>
          Invitations
        </Typography>
        <Chip label={count} size="small" color="secondary" />
        <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
          You have {count} pending farm {count === 1 ? "invitation" : "invitations"}
        </Typography>
        <ExpandLessIcon
          sx={{ transform: isOpen ? "none" : "rotate(180deg)", transition: "transform .15s" }}
        />
      </ButtonBase>

      <Collapse in={isOpen} id="invitations-list" unmountOnExit>
        <Stack sx={{ px: 3, pb: 2.5 }} spacing={1}>
          {actionError && <Alert severity="error">{actionError}</Alert>}
          <List disablePadding>
            {invitations.map((invitation) => (
              <InvitationItemRow
                key={invitation.id}
                invitation={invitation}
                busy={isBusy(invitation.id)}
                onAccept={onAccept}
                onDecline={onDecline}
              />
            ))}
          </List>
          <Typography variant="caption" color="text.secondary">
            Missing an invitation? Ask the farm owner to invite the email address you signed up
            with.
          </Typography>
        </Stack>
      </Collapse>
    </Paper>
  );
}