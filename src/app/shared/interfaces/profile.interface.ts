
export interface IProfile {
  email: string;
  family_name: string;
  given_name: string;
  granted_scopes: string;
  id: string;
  locale: string;
  name: string;
  picture: string | null;
  verified_email: boolean;
}
