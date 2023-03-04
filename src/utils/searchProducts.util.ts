/*
 * 🚮 utility function to search products by name and/or price and/or category and/or price range
 * @param name - name of the product 📛
 * @param category - category of the product 👔
 * @param minPrice - minimum price of the product 💰
 * @param maxPrice - maximum price of the product 🤑
 * @returns products - array of products that match the search criteria 🚛
 */

import { Op, WhereOptions } from "sequelize";
import { IQueryParams } from "../interfaces";
import Product from "../database/models/Product.model";

export const searchProductsUtility = async (params: IQueryParams) => {
  const { name, category, minPrice, maxPrice } = params;

  const whereClause: WhereOptions = {};
  /*
   * in case you want to search against lowercase data,
   * 1️⃣ first:
   * convert the search query to lower case
   * 2️⃣ second:
   * modify the Op condition to search for iLike where the data from the db
   * will first be converted to lowercase
   */
  const lowercaseName = name ? name.toLowerCase() : undefined;
  try {
    // switch statement with a boolean expression
    switch (true) {
      case !!name: // use `!!` operator to coerce/convert the value to a boolean
        whereClause.name = { [Op.iLike]: `%${lowercaseName}%` }; // use `Op.iLike` to search for a case insensitive match
        break; // break out of the switch statement
      /*
       * if just want to search against strict values, it's just as simple as this.
       */
      case !!category:
        whereClause.category = category;
        break;
      case !!minPrice && !maxPrice: // here we are using the logical NOT operator `!` to check if there is a minPrice but no maxPrice
        whereClause.price = { [Op.gte]: minPrice };
        break;
      case !!maxPrice && !minPrice: // here we are using the logical NOT operator `!` to check if there is a maxPrice but no minPrice
        whereClause.price = { [Op.lte]: maxPrice };
        break;
      case !!minPrice && !!maxPrice: // here we checking if there is a minPrice and a maxPrice
        whereClause.price = { [Op.between]: [minPrice, maxPrice] };
        break;
      default:
        // do nothing if no search criteria is provided 🤷‍♂️ 🤷‍♀️
        // and return all available products
        break;
    }
    const products = await Product.findAll({ where: whereClause });
    return products;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      console.log(
        `🍎 Something went wrong when searching for a product: `,
        error,
      );
    }
  }
};
