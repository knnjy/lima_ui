import { apiClient } from "../../../../../app/providers/clients/api_client";
import { AnimalEndpoints } from "../../../../../app/providers/endpoints/animal_endpoints";
import type {
  AnimalGroupApiResponse,
  AnimalGroupListApiResponse,
  CreateAnimalGroupPayload,
  UpdateAnimalGroupPayload,
} from "../entities/AnimalGroup";
import type { AnimalGroupRepository } from "./AnimalGroupRepository";

export const supabaseAnimalGroupRepository: AnimalGroupRepository = {
  getMyAnimalGroups() {
    return apiClient.get<AnimalGroupListApiResponse>(
      AnimalEndpoints.getGroupList,
    );
  },

  getAnimalGroup(groupId: string) {
    return apiClient.get<AnimalGroupApiResponse>(
      AnimalEndpoints.getGroupById(groupId),
    );
  },

  createAnimalGroup(payload: CreateAnimalGroupPayload) {
    return apiClient.post<AnimalGroupApiResponse>(
      AnimalEndpoints.createGroup,
      payload,
    );
  },

  updateAnimalGroup(groupId: string, payload: UpdateAnimalGroupPayload) {
    return apiClient.patch<AnimalGroupApiResponse>(
      AnimalEndpoints.updateGroup(groupId),
      payload,
    );
  },
};

export const supabaseAnimalGroupGateway = supabaseAnimalGroupRepository;
