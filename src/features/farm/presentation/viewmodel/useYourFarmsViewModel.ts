// VIEWMODEL: holds the page state and the actions. No JSX here.
// The View reads values from this hook and calls its functions, nothing else.
import { useCallback, useEffect, useState } from "react";

import type {
  LoadStatus,
  YourFarmsDeps,
  FarmItem,
  InvitationItem,
} from "../../model/yourFarms.types";

export function useYourFarmsViewModel(deps: YourFarmsDeps) {
  const repository = deps.repository ?? deps.gateway;
  if (!repository) {
    throw new Error("A farm repository or gateway is required.");
  }
  const { navigate } = deps;
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [farms, setFarms] = useState<FarmItem[]>([]);
  const [invitations, setInvitations] = useState<InvitationItem[]>([]);
  const [invitationsOpen, setInvitationsOpen] = useState(true);
  const [busyIds, setBusyIds] = useState<string[]>([]);
  const [actionError, setActionError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const [myFarms, pending] = await Promise.all([
        repository.getMyFarms(),
        repository.getPendingInvitations(),
      ]);
      setFarms(myFarms);
      setInvitations(pending);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, [repository]);

  useEffect(() => {
    void load();
  }, [load]);

  const respond = useCallback(
    async (invitationId: string, answer: "accept" | "decline") => {
      setActionError(null);
      setBusyIds((ids) => [...ids, invitationId]);
      try {
        if (answer === "accept") {
          await repository.acceptInvitation(invitationId);
          setFarms(await repository.getMyFarms()); // the new farm shows up in the list
        } else {
          await repository.declineInvitation(invitationId);
        }
        setInvitations((list) => list.filter((i) => i.id !== invitationId));
      } catch {
        setActionError(
          "We couldn't update this invitation. Check your connection and try again.",
        );
      } finally {
        setBusyIds((ids) => ids.filter((id) => id !== invitationId));
      }
    },
    [repository],
  );

  return {
    // state for the View to show
    status,
    farms,
    invitations,
    pendingCount: invitations.length,
    isEmpty: farms.length === 0,
    invitationsOpen,
    actionError,
    isInvitationBusy: (id: string) => busyIds.includes(id),

    // actions the View can call
    retry: load,
    toggleInvitations: () => setInvitationsOpen((open) => !open),
    acceptInvitation: (id: string) => respond(id, "accept"),
    declineInvitation: (id: string) => respond(id, "decline"),
    openFarm: (farmId: string) => navigate(`/farms/${farmId}/dashboard`),
    createFarm: () => navigate("/farms/new"),
  };
}

export type YourFarmsViewModel = ReturnType<typeof useYourFarmsViewModel>;
