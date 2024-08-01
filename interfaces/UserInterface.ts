export default interface UserInterface {
  name: string;
  email: string;
  mobile: number | string;
  password?: string;
  dob: string;
  gender?: string;
  segment?: string;
  class?: number | string;
  personal_address: string;
  institute_address: string;
  registration_type?: number | string;
  registration_token?: string;
  user_id?: string;
  birthday?: string;
  school_id?: number | string | null;
  level?: number | string | null;
  section?: number | string | null;
  plan?: number | string | null;
  remaning_days?: number | string | null;
}
