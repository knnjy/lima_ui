import type {
  FarmItem,
  InvitationItem,
} from "../entities/FarmItem";

export interface FarmsRepository {
  getMyFarms(): Promise<FarmItem[]>;
  getPendingInvitations(): Promise<InvitationItem[]>;
  acceptInvitation(invitationId: string): Promise<void>;
  declineInvitation(invitationId: string): Promise<void>;
}

export type FarmsGateway = FarmsRepository;

export interface YourFarmsDeps {
  repository?: FarmsRepository;
  gateway?: FarmsRepository;
  navigate: (path: string) => void;
}
