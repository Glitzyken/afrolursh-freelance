import type { Service } from "../types";

// RESPONSE
export type ServicesResponse = {
  page: number;
  perPage: number;
  nextPage: string;
  prevPage: string;
  totalResults: 1;
  services: Service[];
};

// REQUEST
