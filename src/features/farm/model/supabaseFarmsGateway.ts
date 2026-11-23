import { apiClient } from '../../../app/providers/clients/api_client';
import { FarmEndpoints } from '../../../app/providers/endpoints/farm_endpoints';
import type { FarmsGateway } from './yourFarms.types';

interface FarmApiItem {
  farm_id: string;
  farm_name: string;
  created_by: string;
  province?: string;
  city_municipality?: string;
  address_line?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const supabaseFarmsGateway: FarmsGateway = {
  async getMyFarms() {
    const data = await apiClient.get<FarmApiItem[]>(
      FarmEndpoints.getList,
    );

    return data.map((farm) => ({
      id: String(farm.farm_id),
      name: String(farm.farm_name),
      location: [
        farm.address_line,
        farm.city_municipality,
        farm.province,
      ].filter((part): part is string => Boolean(part)).join(', '),
      role: 'owner',
    }));
  },

  async getPendingInvitations() {
    return [];
  },

  async acceptInvitation(invitationId: string) {
    await apiClient.post(
      FarmEndpoints.acceptInvitation(invitationId),
    );
  },

  async declineInvitation(invitationId: string) {
    await apiClient.post(
      FarmEndpoints.declineInvitation(invitationId),
    );
  },
};
