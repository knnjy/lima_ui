// MODEL: small pure helpers that turn data into display text.
// Easy to unit test because they have no React and no network.
import type { FarmRole, InvitationItem } from "./entities/FarmItem";

const ROLE_LABEL: Record<FarmRole, string> = {
  owner: "Farm owner",
  worker: "Farm worker",
};

export function formatInvitationMeta(invitation: InvitationItem): string {
  return [
    invitation.location,
    `Invited by ${invitation.invitedBy}`,
    ROLE_LABEL[invitation.role],
  ].join("  ·  ");
}

export function formatExpiry(days: number): string {
  if (days <= 0) return "Expires today";
  if (days === 1) return "Expires tomorrow";
  return `Expires in ${days} days`;
}

export function formatRole(role: FarmRole): string {
  return ROLE_LABEL[role];
}