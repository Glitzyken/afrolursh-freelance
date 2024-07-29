// RESPONSE
export type Country = {
  name: {
    common: string;
  };
  cca2: string;
  ccn3: string;
  currencies: {
    NGN: {
      name: string;
      symbol: string;
    };
  };
  flag: string;
  flags: {
    png: string;
    svg: string;
  };
};

export type IpCountry = {
  ip: string;
  country_code2: string;
  country_name: string;
  state: string;
};

// REQUEST
