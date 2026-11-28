import type {
  AnimalApiResponse,
  AnimalListApiResponse,
  CreateAnimalPayload,
} from "../entities/Animal";

export interface AnimalRepository {
  getMyAnimals(): Promise<AnimalListApiResponse>;
  createAnimal(payload: CreateAnimalPayload): Promise<AnimalApiResponse>;
}

export type AnimalGateway = AnimalRepository;
