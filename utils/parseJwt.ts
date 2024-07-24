export const parseJwt = (token: string) => {
  const { email, exp, iat } = JSON.parse(atob(token?.split(".")[1]));

  return { email, exp, iat };
};
