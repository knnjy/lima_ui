import type { FarmCreate } from "../entities/FarmCreate";
import type { FarmUpdate } from "../entities/FarmUpdate";
import type {
  FarmItem,
} from "../entities/FarmItem";
import type { InvitationRepository } from "./InvitationRepository";

export interface FarmsRepository {
  getMyFarms(): Promise<FarmItem[]>;
  createFarm(farmData: FarmCreate): Promise<FarmItem>;
  getFarmById?(farmId: string): Promise<FarmItem>;
  updateFarm?(farmId: string, farmData: FarmUpdate): Promise<FarmItem>;

  acceptInvitation(invitationId: string): Promise<void>;
  declineInvitation(invitationId: string): Promise<void>;
}

export type FarmsGateway = FarmsRepository;

export interface YourFarmsDeps {
  repository?: FarmsRepository;
  gateway?: FarmsRepository;
  invitationRepository: InvitationRepository;
  navigate: (path: string) => void;
}
