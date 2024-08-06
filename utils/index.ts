export const parseJwt = (token: string) => {
  const { email, exp, iat } = JSON.parse(atob(token?.split(".")[1]));

  return { email, exp, iat };
};

export function convertBytesToMB(bytes: number): number {
  return Number((bytes / (1024 * 1024)).toFixed(2)); // Convert to MB and round to 2 decimal places
}
