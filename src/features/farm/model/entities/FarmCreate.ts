export interface FarmCreate {
  farm_name: string;
  created_by?: string | null; // UUID
  province: string;
  city_municipality: string;
  address_line?: string | null;
  is_active?: boolean;
}

export interface FarmCreateApiResponse {
  status: string;
  success: boolean;
  message: string;
  data: { farm_id: string } | null;
}

export interface FarmCreateResult {
  id: string;
}

