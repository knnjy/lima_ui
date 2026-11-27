export class InvitationEndpoints {

  static readonly get = (invitationId: string) => `/invitations/${invitationId}`;
  static readonly getInvitations = '/invitations';

  static getList = (farmId: string) => `/farms/${farmId}/invitations`;

  static create = (farmId: string) => `/farms/${farmId}/invitations`;

  static cancel = (invitationId: string, farmId: string) =>
    `/farms/${farmId}/invitations/${invitationId}`;

  static readonly accept = `/invitations/accept`;
  static readonly decline = (invitationId: string) =>
    `/invitations/${invitationId}/decline`;
}
