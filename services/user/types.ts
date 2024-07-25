// RESPONSE

// REQUEST
export type UpdateMePayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  languages?: string[];
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  bio?: string;
  wishList?: string[];
  howHeardAboutUs?: string;
  onboardingStep?: number;
  servicesOffered?: {
    identifier: string;
    name: string;
    NGN: number;
    EUR: number;
    standard: string;
  }[];
};
