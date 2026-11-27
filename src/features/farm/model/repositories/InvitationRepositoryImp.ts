import { apiClient } from "../../../../app/providers/clients/api_client";
import { InvitationEndpoints } from "../../../../app/providers/endpoints/InvitationEndpoints";
import type { FarmInvitationListResponse } from "../entities/InvitationItem";
import type { InvitationRepository } from "./InvitationRepository";

export const InvitationRepositoryImp: InvitationRepository = {
  async getPendingInvitations() {
    const data = await apiClient.get<FarmInvitationListResponse>(
      InvitationEndpoints.getInvitations,
    );
    return data;
  },
};