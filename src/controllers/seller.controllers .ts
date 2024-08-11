import asyncHandler from "express-async-handler";
import { successResponse } from "../helper/responseHandler";
import { Request, Response } from "express";
import createError from "http-errors";

/**
 *
 * @description        Get All Sellers
 * @method             GET
 *
 * @route              /api/v1/sellers
 * @access             Private
 *
 * @params             [ page = number ]     default page = 1
 * @params             [ limit = number ]    min = 1, default = 10
 * @params             [ search query ]
 *
 * @apiSuccess         { success : true , message, pagination , data }
 * @apiFailed          { success : false, error : { status : code , message} }
 * @apiError           ( Not Found 404 )   No Sellers data found
 *
 */

export const getAllSellers = asyncHandler(
  async (_req: Request, res: Response) => {
    // get all sellers from database
    const sellers = [];

    // check if sellers exists
    if (!sellers.length)
      throw createError.NotFound("Couldn't find any seller data.");

    successResponse(res, {
      statusCode: 200,
      message: "All sellers data fetched successfully.",
      payload: {
        data: null,
      },
    });
  }
);

/**
 *
 * @description        Get seller by id
 * @method             GET
 *
 * @route              /api/v1/sellers/:id
 * @access             Private
 *
 * @params             [ id = number ]
 *
 * @success            { success : true  , data }
 * @failed             { success : false, error : { status : code , message} }
 * @error              ( Not Found 404 )   No Sellers data found
 *
 */

export const getSellerById = asyncHandler(
  async (_req: Request, res: Response) => {
    const seller = {};

    if (!seller) throw createError.NotFound("Counldn't find any seller data.");

    successResponse(res, {
      statusCode: 200,
      message: "Seller data fetched successfully.",
      payload: {
        data: null,
      },
    });
  }
);

/**
 *
 * @description        Create new seller
 * @method             POST
 *
 * @route              /api/v1/sellers
 * @access             Private
 *
 * @body               { name, description, price, stock }
 *
 * @success            { success : true  , data }
 * @failed             { success : false, error : { status : code , message} }
 * @error              ( Bad Request 400 )   Invalid input
 *
 */

export const createSeller = asyncHandler(
  async (_req: Request, res: Response) => {
    const seller = {};

    successResponse(res, {
      statusCode: 201,
      message: "Seller created successfully.",
      payload: {
        data: seller,
      },
    });
  }
);

/**
 *
 * @description        Update seller by id
 * @method             PUT
 *
 * @route              /api/v1/sellers/:id
 * @access             Private
 *
 * @params             [ id = number ]
 * @body               { name, description, price, stock }
 *
 * @success            { success : true  , data }
 * @failed             { success : false, error : { status : code , message} }
 * @error              ( Not Found 404 )   No Sellers data found
 *
 */

export const updateSellerById = asyncHandler(
  async (_req: Request, res: Response) => {
    const seller = {};

    if (!seller) throw createError.NotFound("Couldn't find any seller data.");

    successResponse(res, {
      statusCode: 200,
      message: "Seller data updated successfully.",
      payload: {
        data: null,
      },
    });
  }
);

/**
 *@description           Delete seller by id
 *@method                DELETE
 *
 *@route                 /api/v1/producst/:id
 *@access                private
 *
 *@success              { success : true  , data }
 *@failed               { success : false, error : { status : code , message} }
 *@error                ( Not Found 404 )   No Sellers data found
 *
 */

export const deleteSellerById = asyncHandler(
  async (_req: Request, res: Response) => {
    const seller = {};

    if (!seller) throw createError.NotFound("Couldn't find any seller data.");

    successResponse(res, {
      statusCode: 200,
      message: "Seller data deleted successfully.",
      payload: {
        data: null,
      },
    });
  }
);
