// RESPONSE
export type Service = {
  _id: string;
  name: string;
  picture: string;
  NGN: number;
  EUR: number;
  createdAt: string;
  updatedAt: string;
};

export type ServicesResponse = {
  page: number;
  perPage: number;
  nextPage: string;
  prevPage: string;
  totalResults: 1;
  services: Service[];
};

// REQUEST
