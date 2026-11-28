import type {
  AnimalGroupApiResponse,
  AnimalGroupListApiResponse,
  CreateAnimalGroupPayload,
  UpdateAnimalGroupPayload,
} from "../entities/AnimalGroup";

export interface AnimalGroupRepository {
  getMyAnimalGroups(): Promise<AnimalGroupListApiResponse>;
  getAnimalGroup(groupId: string): Promise<AnimalGroupApiResponse>;
  createAnimalGroup(
    payload: CreateAnimalGroupPayload,
  ): Promise<AnimalGroupApiResponse>;
  updateAnimalGroup(
    groupId: string,
    payload: UpdateAnimalGroupPayload,
  ): Promise<AnimalGroupApiResponse>;
}

export type AnimalGroupGateway = AnimalGroupRepository;
