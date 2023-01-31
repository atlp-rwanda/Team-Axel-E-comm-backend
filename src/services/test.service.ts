/*
 * The services will be the functions that directly 'talk' with our db.
 * This will help us in separating compounded levels of logic
 * i.e: 🎴
 * the logic between client - middleware
 * the logic between middleware - controller
 * the  logic between controller - service
 * the logic between service - db
 */

/*
 * Here is simple service to find all users, assuming we have a schema to work with.
 * 🛑 Please not the grammar of the naming convention.
 * There is a <purpose>Service & <purpose>Request for a go-to reference.
 */

/* import { User } from '../db/schemas';

export const findAllUsersService = async () => {
  const findUsersRequest = await User.findAll();
  return findUsersRequest;
}; */
