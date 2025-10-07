export const normalizeError = (err: any): Error => {
    if(err instanceof Error){
        return err
    }
    return new Error("Unknown error")
}

export const normalizeErrorCode = (err: any): number => {
  if (err && typeof err.status === "number") {
    return err.status;
  }
  return 1;
};