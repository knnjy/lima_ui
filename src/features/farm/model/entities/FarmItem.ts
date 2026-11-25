export interface FarmApiItem {
  farm_id: string;
  farm_name: string;
  created_by: string;
  province?: string;
  city_municipality?: string;
  address_line?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

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