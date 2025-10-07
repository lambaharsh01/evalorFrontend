export const generateCaptcha = (): string => {
  const chars: string = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789abcdefghijkmnopqrst";
  let rand: string = "";

  for (let i = 0; i < 6; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return rand;
};