export type APIResponse<T> = {
  status: string;
  message: string;
  result: T;
};

export type User = {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photo: string;
  role: string;
  languages: string[];
  address: string;
  city: string;
  state: string;
  country: string;
  bio: string;
  wishList: string[];
  isPhoneVerified: false;
  isOnboard: false;
  isVerifiedSpecialist: true;
  isActive: true;
  isRecommended: false;
  isTopRated: false;
  slug: string;
  updatedAt: string;
  howHeardAboutUs: string;
  specialistVerifyDate: string;
  onboardingStep: number;
  servicesOffered: {
    identifier: string;
    name: string;
    NGN: number;
    EUR: number;
    standard: string;
  }[];
  createdAt: string;
};

export type Service = {
  _id: string;
  name: string;
  picture: string;
  NGN: number;
  EUR: number;
  createdAt: string;
  updatedAt: string;
};
