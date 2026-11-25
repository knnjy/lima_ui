export interface FarmLocationApi {
  province: string | null;
  city_municipality: string | null;
  address_line: string | null;
}

export interface FarmMembershipRoleApi {
  membership_id: string;
  role_id: number;
  role_name: string;
}

export interface FarmApiItem {
  farm_id: string;
  farm_name: string;
  location: FarmLocationApi | null;
  role: FarmMembershipRoleApi;
}

export interface PageMetaApi {
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}

export interface FarmQuotaApi {
  owned_count: number;
  max_owned: number;
}

export interface FarmListApiResponse {
  data: FarmApiItem[];
  meta: PageMetaApi;
  quota?: FarmQuotaApi;
}

// ---------- Domain layer (what the UI uses) ----------

export type FarmRole = "owner" | "worker";

export interface FarmItem {
  id: string;
  name: string;
  location: string; // display text, e.g. "San Jose, Camarines Sur"
  role: FarmRole;
  membershipId: string;
}

export interface FarmQuota {
  ownedCount: number;
  maxOwned: number;
  canCreate: boolean;
}

export interface FarmList {
  farms: FarmItem[];
  total: number;
  quota: FarmQuota | null;
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

// ---------- Mapping (keep in the infrastructure layer) ----------

const toFarmRole = (
  roleId: number | string | undefined,
  roleName: string | undefined,
): FarmRole => {
  const role = `${roleId ?? ""} ${roleName ?? ""}`.toLowerCase();
  return role.includes("owner") ? "owner" : "worker";
};

export const toFarmItem = (api: FarmApiItem): FarmItem => ({
  id: api.farm_id,
  name: api.farm_name,
  location: [
    api.location?.address_line,
    api.location?.city_municipality,
    api.location?.province,
  ]
    .filter(Boolean)
    .join(", "),
  role: toFarmRole(api.role.role_id, api.role.role_name),
  membershipId: api.role.membership_id,
});

export const toFarmList = (api: FarmListApiResponse): FarmList => ({
  farms: api.data.map(toFarmItem),
  total: api.meta.total,
  quota: api.quota
    ? {
        ownedCount: api.quota.owned_count,
        maxOwned: api.quota.max_owned,
        canCreate: api.quota.owned_count < api.quota.max_owned,
      }
    : null,
});