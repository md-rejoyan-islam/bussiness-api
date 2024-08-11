import { prismaClient } from "./../helper/prisma";
import asyncHandler from "express-async-handler";
import { successResponse } from "../helper/responseHandler";
import { Request, Response } from "express";
import createError from "http-errors";

/**
 *
 * @description        Get All Chalans
 * @method             GET
 *
 * @route              /api/v1/chalans
 * @access             Private
 *
 * @params             [ page = number ]     default page = 1
 * @params             [ limit = number ]    min = 1, default = 10
 * @params             [ search query ]
 *
 * @success            { success : true , message, pagination , data }
 * @failed             { success : false, error : { status : code , message} }
 * @error              ( Not Found 404 )   No Chalans data found
 *
 */

export const getAllChalans = asyncHandler(
  async (_req: Request, res: Response) => {
    // get all chalan from database
    const chalan = await prismaClient.chalan.findMany({
      include: {
        product: true,
        gray: true,
        dyeing: true,
      },
    });

    // if data is empty
    if (!chalan.length)
      throw createError.NotFound("Couldn't find any chalan data.");

    successResponse(res, {
      statusCode: 200,
      message: "All chalan data fetched successfully.",
      payload: {
        total: chalan.length,
        data: chalan,
      },
    });
  }
);

/**
 *
 * @description        Get chalan by id
 * @method             GET
 *
 * @route              /api/v1/chalans/:id
 * @access             Private
 *
 * @params             [ id = number ]
 *
 * @success            { success : true  , data }
 * @failed             { success : false, error : { status : code , message} }
 * @error              ( Not Found 404 )   No Chalans data found
 *
 */

export const getChalanById = asyncHandler(
  async (req: Request, res: Response) => {
    const chalan = await prismaClient.chalan.findUnique({
      where: {
        id: +req.params.id,
      },
    });

    if (!chalan) throw createError.NotFound("Counldn't find any chalan data.");

    successResponse(res, {
      statusCode: 200,
      message: "chalan data fetched successfully.",
      payload: {
        data: chalan,
      },
    });
  }
);

/**
 *
 * @description        Create new chalan
 * @method             POST
 *
 * @route              /api/v1/chalans
 * @access             Private
 *
 * @body               { name, description, price, stock }
 *
 * @success            { success : true  , data }
 * @failed             { success : false, error : { status : code , message} }
 * @error              ( Bad Request 400 )   Invalid input
 *
 */

export const createChalan = asyncHandler(
  async (req: Request, res: Response) => {
    const { grayId } = req.body;

    const gray = await prismaClient.gray.findUnique({
      where: {
        id: +grayId,
      },
    });

    if (!gray) throw createError("Invalid gray id.");

    const chalan = await prismaClient.chalan.create({
      data: req.body,
    });

    successResponse(res, {
      statusCode: 201,
      message: "chalan created successfully.",
      payload: {
        data: chalan,
      },
    });
  }
);

/**
 *
 * @description        Update chalan by id
 * @method             PUT
 *
 * @route              /api/v1/chalans/:id
 * @access             Private
 *
 * @params             [ id = number ]
 * @body               { name, description, price, stock }
 *
 * @success            { success : true  , data }
 * @failed             { success : false, error : { status : code , message} }
 * @error              ( Not Found 404 )   No Chalans data found
 *
 */

export const updateChalanById = asyncHandler(
  async (req: Request, res: Response) => {
    const exist = await prismaClient.chalan.findUnique({
      where: { id: +req.params.id },
    });

    if (!exist) throw createError("Couldn't find chalan by this id.");

    const chalan = await prismaClient.chalan.update({
      where: {
        id: +req.params.id,
      },
      data: req.body,
    });

    if (!chalan) throw createError.NotFound("Couldn't find any chalan data.");

    successResponse(res, {
      statusCode: 200,
      message: "chalan updated successfully.",
      payload: {
        data: chalan,
      },
    });
  }
);

/**
 *@description           Delete chalan by id
 *@method                DELETE
 *
 *@route                 /api/v1/chalans/:id
 *@access                private
 *
 *@success              { success : true  , data }
 *@failed               { success : false, error : { status : code , message} }
 *@error                ( Not Found 404 )   No Chalans data found
 *
 */

export const deleteChalanById = asyncHandler(
  async (req: Request, res: Response) => {
    const chalan = await prismaClient.chalan.findUnique({
      where: { id: +req.params.id },
    });
    if (!chalan) throw createError.NotFound("Couldn't find any chalan data.");

    // delete
    await prismaClient.chalan.delete({
      where: {
        id: +req.params.id,
      },
    });

    successResponse(res, {
      statusCode: 200,
      message: "Chalan data deleted successfully.",
      payload: {
        data: chalan,
      },
    });
  }
);
