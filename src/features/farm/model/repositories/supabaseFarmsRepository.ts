import { apiClient } from "../../../../app/providers/clients/api_client";
import { FarmEndpoints } from "../../../../app/providers/endpoints/farm_endpoints";
import { toFarmList, type FarmListApiResponse } from "../entities/FarmItem";
import type { FarmsRepository } from "./FarmsRepository";

export const supabaseFarmsRepository: FarmsRepository = {
  async getMyFarms() {
    const data = await apiClient.get<FarmListApiResponse>(
      FarmEndpoints.getList,
    );

    return toFarmList(data).farms;
  },

  async getPendingInvitations() {
    return [];
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
