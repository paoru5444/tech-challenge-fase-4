export interface IUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
  isAnonymous: boolean;
  providerId: string;
  tenantId: string | null;
}

export interface IUserCredentials {
  email: string;
  password: string;
  passwordConfirm?: string;
}

export function validatePassword({
  password,
  passwordConfirm,
}: IUserCredentials) {
  return password === passwordConfirm;
}
