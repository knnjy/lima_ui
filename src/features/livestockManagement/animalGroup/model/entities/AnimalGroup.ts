export interface CreateAnimalGroupPayload {
  farm_id: string;
  species_id: number;
  breed_id: number | null;
  group_name: string;
  sex: string;
  date_established: string;
  initial_head_count: number;
  current_head_count: number;
  status: string;
  remarks: string;
}

export interface UpdateAnimalGroupPayload {
  group_name?: string;
  current_head_count?: number;
  status?: string;
  remarks?: string;
}

// The Postman collection has no response samples; leave record fields open
// until the backend response contract is available.
export type AnimalGroupRecord = Record<string, unknown>;
export interface AnimalGroupListApiResponse {
  data: AnimalGroupRecord[];
  meta?: { page?: number; page_size?: number; total?: number; total_pages?: number };
}
export type AnimalGroupApiResponse = AnimalGroupRecord;
