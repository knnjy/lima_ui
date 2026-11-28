import { apiClient } from "../../../../../app/providers/clients/api_client";
import { AnimalEndpoints } from "../../../../../app/providers/endpoints/animal_endpoints";
import type {
  AnimalApiResponse,
  AnimalListApiResponse,
  CreateAnimalPayload,
} from "../entities/Animal";
import type { AnimalRepository } from "./AnimalRepository";

export const supabaseAnimalRepository: AnimalRepository = {
  getMyAnimals(farmId: string) {
    return apiClient.get<AnimalListApiResponse>(
      AnimalEndpoints.getList(farmId),
    );
  },

  createAnimal(payload: CreateAnimalPayload) {
    return apiClient.post<AnimalApiResponse>(AnimalEndpoints.create, payload);
  },
};

export const supabaseAnimalGateway = supabaseAnimalRepository;
