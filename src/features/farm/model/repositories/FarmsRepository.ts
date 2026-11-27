import type {
  FarmItem,
} from "../entities/FarmItem";
import type { InvitationRepository } from "./InvitationRepository";

export interface FarmsRepository {
  getMyFarms(): Promise<FarmItem[]>;
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
