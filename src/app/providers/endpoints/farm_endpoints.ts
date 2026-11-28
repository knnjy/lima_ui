
export class FarmEndpoints {
  static readonly getList = '/farms';
  static readonly create = '/farms';

  static createFarm = 'farms';

  static getById = (farmId: string) => `/farms/${farmId}`;
  static update = (farmId: string) => `/farms/${farmId}`;
  static delete = (farmId: string) => `/farms/${farmId}`;

  static readonly getInvitationList = '/farm-invitations';
  static acceptInvitation = (invitationId: string) =>
    `/farm-invitations/${invitationId}/accept`;
  static declineInvitation = (invitationId: string) =>
    `/farm-invitations/${invitationId}/decline`;
}
    

