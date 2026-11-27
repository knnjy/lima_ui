// MODEL: small pure helpers that turn data into display text.
// Easy to unit test because they have no React and no network.
import type { FarmRole } from "./entities/FarmItem";
import type { InvitationItem } from "./entities/InvitationItem";

const ROLE_LABEL: Record<FarmRole, string> = {
  owner: "Farm owner",
  worker: "Farm worker",
};

export function formatInvitationMeta(invitation: InvitationItem): string {
  return `Role: ${invitation.role}`;
}

export function formatExpiry(expiresAt: string): string {
  const date = new Date(expiresAt);
  return `Expires ${new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date)}`;
}

export function formatRole(role: FarmRole): string {
  return ROLE_LABEL[role];
}