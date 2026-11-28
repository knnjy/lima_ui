export interface AnimalEntryPayload {
  event_type: string;
  event_date: string;
  remarks: string;
}

export interface CreateAnimalPayload {
  farm_id: string;
  species_id: number;
  breed_id: number | null;
  animal_group_id: string | null;
  identifier_number: string;
  name: string;
  sex: string;
  birth_date: string;
  remarks: string;
  entry: AnimalEntryPayload;
}

// The collection does not include saved response examples, so keep returned
// records open while documenting the fields sent by the create request.
export type AnimalRecord = Record<string, unknown>;
export interface AnimalListApiResponse {
  data: AnimalRecord[];
  meta?: { page?: number; page_size?: number; total?: number; total_pages?: number };
}
export type AnimalApiResponse = AnimalRecord;
