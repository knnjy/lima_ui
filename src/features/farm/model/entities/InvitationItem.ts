

export const InvitationStatus = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  EXPIRED: "expired",
} as const;

export type InvitationStatus =
  (typeof InvitationStatus)[keyof typeof InvitationStatus];

export interface FarmInvitationResponse {
  invitation_id: string; // UUID
  farm_id: string;       // UUID
  farm_name: string;
  role: string;
  status: InvitationStatus;
  expires_at: string;    // ISO 8601 datetime
  created_at: string;    // ISO 8601 datetime

  // token_hash is deliberately excluded.
}

export interface FarmInvitationListResponse {
  invitations: FarmInvitationResponse[];
}

export interface InvitationItem {
  id: string;
  farmName: string;
  role: string;
  expiresAt: string;
}

export const toInvitationItem = (
  invitation: FarmInvitationResponse,
): InvitationItem => ({
  id: invitation.invitation_id,
  farmName: invitation.farm_name,
  role: invitation.role,
  expiresAt: invitation.expires_at,
});