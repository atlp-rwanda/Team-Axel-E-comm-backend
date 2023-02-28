// a function to check if a string is a valid UUID
// example of a valid UUID: 3fa85f64-5717-4562-b3fc-2c963f66afa6
// example of where this function is used: src/controllers/Cart.controller.ts 📐 line 20
export const isValidUUID = (uuid: string) => {
  const uuid_regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuid_regex.test(uuid);
};
