// MODEL: the shapes of data this page works with, plus what it needs from outside.
// No React in this folder, only plain TypeScript.

export type FarmRole = "owner" | "worker";

export interface FarmItem {
  id: string;
  name: string;
  location: string;
  role: FarmRole;
}

export interface InvitationItem {
  id: string;
  farmName: string;
  location: string;
  invitedBy: string;
  role: FarmRole;
  expiresInDays: number;
}

export type LoadStatus = "loading" | "error" | "ready";

/**
 * What the ViewModel needs from the rest of your app.
 * Implement `gateway` with your existing application/data layer
 * (FastAPI + Supabase) and pass it in from the route.
 * Keep the `gateway` object stable (useMemo or a module constant).
 */
export interface FarmsGateway {
  getMyFarms(): Promise<FarmItem[]>;
  getPendingInvitations(): Promise<InvitationItem[]>;
  acceptInvitation(invitationId: string): Promise<void>;
  declineInvitation(invitationId: string): Promise<void>;
}

export interface YourFarmsDeps {
  gateway: FarmsGateway;
  /** Wrap your router's navigate, e.g. (path) => navigate(path) */
  navigate: (path: string) => void;
}