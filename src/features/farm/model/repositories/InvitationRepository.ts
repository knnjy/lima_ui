import type { FarmInvitationListResponse } from "../entities/InvitationItem";

export interface InvitationRepository {
    getPendingInvitations(): Promise<FarmInvitationListResponse>;
}