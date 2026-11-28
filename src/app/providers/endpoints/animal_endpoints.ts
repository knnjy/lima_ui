export class AnimalEndpoints {
  // Animals
  static getList = (farmId: string) => `/me/animals/${farmId}`;
  static readonly create = '/me/animals';

  static getById = (animalId: string) => `/me/animals/${animalId}`;
  static update = (animalId: string) => `/me/animals/${animalId}`;

  // Animal groups
  static readonly getGroupList = '/me/animal-groups';
  static readonly createGroup = '/me/animal-groups';

  static getGroupById = (groupId: string) => `/me/animal-groups/${groupId}`;
  static updateGroup = (groupId: string) => `/me/animal-groups/${groupId}`;
}