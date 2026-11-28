import { apiClient } from "../../../../app/providers/clients/api_client";
import { FarmEndpoints } from "../../../../app/providers/endpoints/farm_endpoints";
import type {
  FarmCreate,
  FarmCreateApiResponse,
  FarmCreateResult,
} from "../entities/FarmCreate";
import type { FarmUpdate } from "../entities/FarmUpdate";
import {
  toFarmItem,
  toFarmList,
  type FarmApiItem,
  type FarmListApiResponse,
} from "../entities/FarmItem";
import type { FarmsRepository } from "./FarmsRepository";

type FarmApiEnvelope = { data: FarmApiItem };

export const supabaseFarmsRepository: FarmsRepository = {
  async getMyFarms() {
    const data = await apiClient.get<FarmListApiResponse>(
      FarmEndpoints.getList,
    );

    return toFarmList(data).farms;
  },

  async createFarm(farmData: FarmCreate) {
    const response = await apiClient.post<FarmCreateApiResponse>(
      FarmEndpoints.create,
      farmData,
    );

    if (!response.success) {
      throw new Error(response.message || "We couldn't create this farm.");
    }

    if (!response.data?.farm_id) {
      throw new Error(
        "The farm was created, but the server response didn't include its ID.",
      );
    }

    const result: FarmCreateResult = { id: response.data.farm_id };
    return result;
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
