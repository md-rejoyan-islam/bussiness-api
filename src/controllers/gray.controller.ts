import { prismaClient } from "./../helper/prisma";
import asyncHandler from "express-async-handler";
import { successResponse } from "../helper/responseHandler";
import { Request, Response } from "express";
import createError from "http-errors";

/**
 *
 * @description        Get All Grays
 * @method             GET
 *
 * @route              /api/v1/grays
 * @access             Private
 *
 * @params             [ page = number ]     default page = 1
 * @params             [ limit = number ]    min = 1, default = 10
 * @params             [ search query ]
 *
 * @success            { success : true , message, pagination , data }
 * @failed             { success : false, error : { status : code , message} }
 * @error              ( Not Found 404 )   No Grays data found
 *
 */

export const getAllGrays = asyncHandler(
  async (_req: Request, res: Response) => {
    // get all grays from database
    const grays = await prismaClient.gray.findMany({
      include: {
        products: {
          include: {
            gray_payments: true,
          },
        },
      },
    });

    // if data is empty
    // if (!grays.length)
    //   throw createError.NotFound("Couldn't find any grays data.");

    successResponse(res, {
      statusCode: 200,
      message: "All grays data fetched successfully.",
      payload: {
        total: grays?.length || 0,
        data: grays || [],
      },
    });
  }
);

/**
 *
 * @description        Get gray by id
 * @method             GET
 *
 * @route              /api/v1/grays/:id
 * @access             Private
 *
 * @params             [ id = number ]
 *
 * @success            { success : true  , data }
 * @failed             { success : false, error : { status : code , message} }
 * @error              ( Not Found 404 )   No Grays data found
 *
 */

export const getGrayById = asyncHandler(async (req: Request, res: Response) => {
  const gray = await prismaClient.gray.findUnique({
    where: {
      id: +req.params.id,
    },
    include: {
      products: {
        include: {
          gray_payments: true,
        },
      },
    },
  });

  if (!gray) throw createError.NotFound("Counldn't find any gray data.");

  successResponse(res, {
    statusCode: 200,
    message: "gray data fetched successfully.",
    payload: {
      data: gray,
    },
  });
});

/**
 *
 * @description        Create new gray
 * @method             POST
 *
 * @route              /api/v1/grays
 * @access             Private
 *
 * @body               { name, description, price, stock }
 *
 * @success            { success : true  , data }
 * @failed             { success : false, error : { status : code , message} }
 * @error              ( Bad Request 400 )   Invalid input
 *
 */

export const createGray = asyncHandler(async (req: Request, res: Response) => {
  // check name is exist or not
  const exist = await prismaClient.gray.findUnique({
    where: {
      name: req.body.name,
    },
  });
  if (exist) throw createError.BadRequest("Name already exist.");

  const gray = await prismaClient.gray.create({
    data: req.body,
  });

  successResponse(res, {
    statusCode: 201,
    message: "gray created successfully.",
    payload: {
      data: gray,
    },
  });
});

/**
 *
 * @description        Update gray by id
 * @method             PUT
 *
 * @route              /api/v1/grays/:id
 * @access             Private
 *
 * @params             [ id = number ]
 * @body               { name, description, price, stock }
 *
 * @success            { success : true  , data }
 * @failed             { success : false, error : { status : code , message} }
 * @error              ( Not Found 404 )   No Grays data found
 *
 */

export const updateGrayById = asyncHandler(
  async (req: Request, res: Response) => {
    const exist = await prismaClient.gray.findUnique({
      where: { id: +req.params.id },
    });

    if (!exist) throw createError("Couldn't find gray by this id.");

    const gray = await prismaClient.gray.update({
      where: {
        id: +req.params.id,
      },
      data: req.body,
    });

    if (!gray) throw createError.NotFound("Couldn't find any gray data.");

    successResponse(res, {
      statusCode: 200,
      message: "gray updated successfully.",
      payload: {
        data: gray,
      },
    });
  }
);

/**
 *@description           Delete gray by id
 *@method                DELETE
 *
 *@route                 /api/v1/grays/:id
 *@access                private
 *
 *@success              { success : true  , data }
 *@failed               { success : false, error : { status : code , message} }
 *@error                ( Not Found 404 )   No Grays data found
 *
 */

export const deleteGrayById = asyncHandler(
  async (req: Request, res: Response) => {
    const gray = await prismaClient.gray.findUnique({
      where: { id: +req.params.id },
      include: {
        products: true,
      },
    });
    if (!gray) throw createError.NotFound("Couldn't find any gray data.");

    // delete releted product
    await prismaClient.product.deleteMany({
      where: {
        grayId: gray.id,
      },
    });

    // delete
    await prismaClient.gray.delete({
      where: {
        id: +req.params.id,
      },
    });

    successResponse(res, {
      statusCode: 200,
      message: "Gray data deleted successfully.",
      payload: {
        data: gray,
      },
    });
  }
);

// gray payment
export const grayPayment = asyncHandler(async (req: Request, res: Response) => {
  const { productId, grayId } = req.body;

  // gray check
  const gray = await prismaClient.gray.findUnique({
    where: { id: grayId },
    include: {
      products: true,
    },
  });
  if (!gray) throw createError.NotFound("Gray data not found!");

  // product check in gray
  const product = gray?.products.find((product) => product.id === productId);
  if (!product) throw createError.NotFound("Product not found in gray data.");

  // create gray payment
  const payment = await prismaClient.grayPayment.create({
    data: {
      ...req.body,
    },
  });

  // response send
  successResponse(res, {
    statusCode: 200,
    message: "Payment successfully",
    payload: {
      data: payment,
    },
  });
});

// update gray payment by id
export const updateGrayPaymentById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const payment = await prismaClient.grayPayment.findUnique({
      where: { id: +id },
    });

    if (!payment) throw createError.NotFound("Payment not found!");

    const updatedPayment = await prismaClient.grayPayment.update({
      where: { id: +id },
      data: req.body,
    });

    // response send
    successResponse(res, {
      statusCode: 200,
      message: "Payment updated successfully",
      payload: {
        data: updatedPayment,
      },
    });
  }
);

// delete payment by id
export const deleteGrayPaymentById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const payment = await prismaClient.grayPayment.findUnique({
      where: { id: +id },
    });

    if (!payment) throw createError.NotFound("Payment not found!");

    // delete
    await prismaClient.grayPayment.delete({
      where: { id: +id },
    });

    // response send
    successResponse(res, {
      statusCode: 200,
      message: "Payment deleted successfully",
      payload: {
        data: payment,
      },
    });
  }
);
