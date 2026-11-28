import { apiClient } from "../../../../app/providers/clients/api_client";
import { FarmEndpoints } from "../../../../app/providers/endpoints/farm_endpoints";
import type { FarmCreate } from "../entities/FarmCreate";
import type { FarmUpdate } from "../entities/FarmUpdate";
import {
  toFarmItem,
  toFarmList,
  type FarmApiItem,
  type FarmListApiResponse,
} from "../entities/FarmItem";
import type { FarmsRepository } from "./FarmsRepository";

type FarmApiEnvelope = { data: FarmApiItem };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isFarmApiItem = (value: unknown): value is FarmApiItem => {
  if (
    !isRecord(value) ||
    typeof value.farm_id !== "string" ||
    typeof value.farm_name !== "string" ||
    !isRecord(value.role)
  ) {
    return false;
  }

  return (
    typeof value.role.membership_id === "string" &&
    (typeof value.role.role_id === "number" ||
      typeof value.role.role_id === "string") &&
    typeof value.role.role_name === "string" &&
    (value.location === null ||
      (isRecord(value.location) &&
        (typeof value.location.province === "string" ||
          value.location.province === null) &&
        (typeof value.location.city_municipality === "string" ||
          value.location.city_municipality === null) &&
        (typeof value.location.address_line === "string" ||
          value.location.address_line === null)))
  );
};

export const supabaseFarmsRepository: FarmsRepository = {
  async getMyFarms() {
    const data = await apiClient.get<FarmListApiResponse>(
      FarmEndpoints.getList,
    );

    return toFarmList(data).farms;
  },

  async createFarm(farmData: FarmCreate) {
    const response = await apiClient.post<unknown>(
      FarmEndpoints.create,
      farmData,
    );
    const payload =
      isRecord(response) && "data" in response
        ? response.data
        : response;
    const farm = Array.isArray(payload) ? payload[0] : payload;

    if (!isFarmApiItem(farm)) {
      throw new Error(
        "The farm was created, but the server returned an invalid farm record.",
      );
    }

    return toFarmItem(farm);
  },

  async getFarmById(farmId: string) {
    const data = await apiClient.get<FarmApiItem | FarmApiEnvelope>(
      FarmEndpoints.getById(farmId),
    );
    return toFarmItem("data" in data ? data.data : data);
  },

  async updateFarm(farmId: string, farmData: FarmUpdate) {
    const data = await apiClient.patch<FarmApiItem | FarmApiEnvelope>(
      FarmEndpoints.update(farmId),
      farmData,
    );
    return toFarmItem("data" in data ? data.data : data);
  },
  
  async acceptInvitation(invitationId: string) {
    await apiClient.post(
      FarmEndpoints.acceptInvitation(invitationId),
    );
  },

  async declineInvitation(invitationId: string) {
    await apiClient.post(
      FarmEndpoints.declineInvitation(invitationId),
    );
  },
};

export const supabaseFarmsGateway = supabaseFarmsRepository;
