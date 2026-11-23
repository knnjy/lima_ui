import { supabase } from '../../../app/providers/supabase_client';
import type { FarmsGateway } from './yourFarms.types';

export const supabaseFarmsGateway: FarmsGateway = {
  async getMyFarms() {
    const { data, error } = await supabase
      .from('farms')
      .select('id, name, location, role');

    if (error) {
      throw error;
    }

    return (data ?? []).map((farm) => ({
      id: String(farm.id),
      name: String(farm.name),
      location: String(farm.location ?? ''),
      role: farm.role === 'worker' ? 'worker' : 'owner',
    }));
  },

  async getPendingInvitations() {
    const { data, error } = await supabase
      .from('farm_invitations')
      .select('id, farm_name, location, invited_by, role, expires_in_days');

    if (error) {
      throw error;
    }

    return (data ?? []).map((invitation) => ({
      id: String(invitation.id),
      farmName: String(invitation.farm_name),
      location: String(invitation.location ?? ''),
      invitedBy: String(invitation.invited_by ?? ''),
      role: invitation.role === 'worker' ? 'worker' : 'owner',
      expiresInDays: Number(invitation.expires_in_days ?? 0),
    }));
  },

  async acceptInvitation(invitationId: string) {
    const { error } = await supabase
      .from('farm_invitations')
      .update({ status: 'accepted' })
      .eq('id', invitationId);

    if (error) {
      throw error;
    }
  },

  async declineInvitation(invitationId: string) {
    const { error } = await supabase
      .from('farm_invitations')
      .update({ status: 'declined' })
      .eq('id', invitationId);

    if (error) {
      throw error;
    }
  },
};
