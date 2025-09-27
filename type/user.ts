export type User = {
  id: number;
  name: string;
  email: string;
  date_of_birth: string;
  image: string | null;
  phone: string | null;
  gender?: "man" | "woman";
};

export type CreateAddress = Partial<{
  first_name: string;
  last_name: string;
  street_address: string;
  address_line2: string;
  postal_code: string;
  city: string;
  phone_number: string;
  country: string;
  comments: string;
}>;

export type UpdateUser = Partial<{
  name: string;
  email: string;
  role: string;
  image: string | null;
  phone: string | null;
  date_of_birth: string;
  language: "german" | "italian";
  is_active: boolean;
  suspend: boolean;
  latitude: number | null;
  longitude: number | null;
  match_score: number;
  notes: string;
}>;
