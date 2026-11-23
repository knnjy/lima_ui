// VIEW (container): connects the ViewModel to the small view components.
// It decides WHAT to show; the child components decide HOW it looks.
// The header and footer come from AccountLayout, so they are not repeated here.
import { Alert, Button, CircularProgress, Stack, Typography } from "@mui/material";
import type { YourFarmsDeps } from "../model/yourFarms.types";
import { useYourFarmsViewModel } from "../viewmodel/useYourFarmsViewModel";
import { FarmList } from "./FarmList";
import { AccountLayout } from "../../../app/layout/Account";
import { FarmsHeader } from "./FarmsHeader";
import { InvitationsPanel } from "./InvitationPanel";
import { EmptyFarmsState } from "./EmptyFarmState";

interface Props {
  deps: YourFarmsDeps;
  userName: string; // from your existing auth state
  onLogout: () => void; // from your existing auth state
  helpHref?: string;
}

export function YourFarmsPage({ deps, userName, onLogout, helpHref }: Props) {
  const vm = useYourFarmsViewModel(deps);

  return (
    <AccountLayout
      onLogout={onLogout}
      helpHref={helpHref}
      footerNote="You can own a farm and work with other farms using the same account."
    >
      <Stack spacing={3}>
        <FarmsHeader userName={userName} onCreateFarm={vm.createFarm} />

        {vm.status === "loading" && (
          <Stack direction="row" spacing={2} alignItems="center" role="status">
            <CircularProgress size={20} />
            <Typography>Loading your farms…</Typography>
          </Stack>
        )}

        {vm.status === "error" && (
          <Alert
            severity="error"
            action={<Button color="inherit" size="small" onClick={vm.retry}>Try again</Button>}
          >
            We couldn't load your farms.
          </Alert>
        )}

        {vm.status === "ready" && (
          <>
            {vm.pendingCount > 0 && (
              <InvitationsPanel
                invitations={vm.invitations}
                isOpen={vm.invitationsOpen}
                actionError={vm.actionError}
                isBusy={vm.isInvitationBusy}
                onToggle={vm.toggleInvitations}
                onAccept={vm.acceptInvitation}
                onDecline={vm.declineInvitation}
              />
            )}

            {vm.isEmpty ? (
              <EmptyFarmsState hasInvitations={vm.pendingCount > 0} onCreateFarm={vm.createFarm} />
            ) : (
              <FarmList farms={vm.farms} onOpen={vm.openFarm} />
            )}
          </>
        )}
      </Stack>
    </AccountLayout>
  );
}