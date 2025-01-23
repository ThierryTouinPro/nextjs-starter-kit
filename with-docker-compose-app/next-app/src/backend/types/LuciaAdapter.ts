export interface AdapterUser {
  id: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  phone?: string;
  gender?: string;
}

export interface AdapterSession {
  id: string;
  userId: string;
  activeExpires: number | bigint;
  idleExpires: number | bigint;
}

export interface AdapterKey {
  id: string;
  hashed_password: string;
  primary_key: boolean;
  user_id: string;
  expires: number;
}
