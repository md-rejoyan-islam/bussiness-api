import asyncHandler from "express-async-handler";
import { successResponse } from "../helper/responseHandler";
import { Request, Response } from "express";
import createError from "http-errors";

/**
 *
 * @description        Get All Buyers
 * @method             GET
 *
 * @route              /api/v1/buyers
 * @access             Private
 *
 * @params             [ page = number ]     default page = 1
 * @params             [ limit = number ]    min = 1, default = 10
 * @params             [ search query ]
 *
 * @success         { success : true , message, pagination , data }
 * @failed          { success : false, error : { status : code , message} }
 * @error           ( Not Found 404 )   No Buyers data found
 *
 */

export const getAllBuyers = asyncHandler(
  async (_req: Request, res: Response) => {
    // get all buyers from database
    const buyers = [];

    // if data is empty
    if (!buyers.length)
      throw createError.NotFound("Couldn't find any buyers data.");

    successResponse(res, {
      statusCode: 200,
      message: "All buyers data fetched successfully.",
      payload: {
        data: null,
      },
    });
  }
);

/**
 *
 * @description        Get buyer by id
 * @method             GET
 *
 * @route              /api/v1/buyers/:id
 * @access             Private
 *
 * @params             [ id = number ]
 *
 * @success            { success : true  , data }
 * @failed             { success : false, error : { status : code , message} }
 * @error              ( Not Found 404 )   No Buyers data found
 *
 */

export const getBuyerById = asyncHandler(
  async (_req: Request, res: Response) => {
    const buyer = {};

    if (!buyer) throw createError.NotFound("Counldn't find any buyer data.");

    successResponse(res, {
      statusCode: 200,
      message: "buyer data fetched successfully.",
      payload: {
        data: null,
      },
    });
  }
);

/**
 *
 * @description        Create new buyer
 * @method             POST
 *
 * @route              /api/v1/buyers
 * @access             Private
 *
 * @body               { name, description, price, stock }
 *
 * @success            { success : true  , data }
 * @failed             { success : false, error : { status : code , message} }
 * @error              ( Bad Request 400 )   Invalid input
 *
 */

export const createBuyer = asyncHandler(
  async (_req: Request, res: Response) => {
    const buyer = {};

    successResponse(res, {
      statusCode: 201,
      message: "buyer created successfully.",
      payload: {
        data: buyer,
      },
    });
  }
);

/**
 *
 * @description        Update buyer by id
 * @method             PUT
 *
 * @route              /api/v1/buyers/:id
 * @access             Private
 *
 * @params             [ id = number ]
 * @body               { name, description, price, stock }
 *
 * @success            { success : true  , data }
 * @failed             { success : false, error : { status : code , message} }
 * @error              ( Not Found 404 )   No Buyers data found
 *
 */

export const updateBuyerById = asyncHandler(
  async (_req: Request, res: Response) => {
    const buyer = {};

    if (!buyer) throw createError.NotFound("Couldn't find any buyer data.");

    successResponse(res, {
      statusCode: 200,
      message: "buyer updated successfully.",
      payload: {
        data: null,
      },
    });
  }
);

/**
 *@description           Delete buyer by id
 *@method                DELETE
 *
 *@route                 /api/v1/buyers/:id
 *@access                private
 *
 *@success              { success : true  , data }
 *@failed               { success : false, error : { status : code , message} }
 *@error                ( Not Found 404 )   No Buyers data found
 *
 */

export const deleteBuyerById = asyncHandler(
  async (_req: Request, res: Response) => {
    const buyer = {};

    if (!buyer) throw createError.NotFound("Couldn't find any buyer data.");

    successResponse(res, {
      statusCode: 200,
      message: "buyer deleted successfully.",
      payload: {
        data: null,
      },
    });
  }
);
