import { prismaClient } from "./../helper/prisma";
import asyncHandler from "express-async-handler";
import { successResponse } from "../helper/responseHandler";
import { Request, Response } from "express";
import createError from "http-errors";
import { Thaan } from "../app/definition";

/**
 *
 * @description        Get All Products
 * @method             GET
 *
 * @route              /api/v1/products
 * @access             Private
 *
 * @params             [ page = number ]     default page = 1
 * @params             [ limit = number ]    min = 1, default = 10
 * @params             [ search query ]
 *
 * @success            { success : true , message, pagination , data }
 * @failed             { success : false, error : { status : code , message} }
 * @error              ( Not Found 404 )   No Products data found
 *
 */

export const getAllProducts = asyncHandler(
  async (_req: Request, res: Response) => {
    // get all products from database
    const products = await prismaClient.product.findMany({
      include: {
        chalan: true,
        gray: true,
        dyeing: true,
        dyeing_payments: true,
        gray_payments: true,
        thaan_count: true,
      },
    });

    // if data is empty
    // if (!products.length)
    //   throw createError.NotFound("Couldn't find any product data.");

    successResponse(res, {
      statusCode: 200,
      message: "All Products data fetched successfully.",
      payload: {
        totalProduct: products?.length,
        data: products || [],
      },
    });
  }
);

/**
 *
 * @description        Get product by id
 * @method             GET
 *
 * @route              /api/v1/products/:id
 * @access             Private
 *
 * @params             [ id = number ]
 *
 * @success            { success : true  , data }
 * @failed             { success : false, error : { status : code , message} }
 * @error              ( Not Found 404 )   No Products data found
 *
 */

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await prismaClient.product.findUnique({
      where: {
        id: +req.params.id,
      },
      include: {
        gray: true,
        dyeing: true,
        gray_payments: true,
        dyeing_payments: true,
        thaan_count: true,
      },
    });

    if (!product)
      throw createError.NotFound("Counldn't find any product data.");

    successResponse(res, {
      statusCode: 200,
      message: "Product data fetched successfully.",
      payload: {
        data: product,
      },
    });
  }
);

/**
 *
 * @description        Create new product
 * @method             POST
 *
 * @route              /api/v1/products
 * @access             Private
 *
 * @body               { name, description, price, stock }
 *
 * @success            { success : true  , data }
 * @failed             { success : false, error : { status : code , message} }
 * @error              ( Bad Request 400 )   Invalid input
 *
 */

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    let { chalanNumber } = req.body;
    const { grayId } = req.body;

    // gray id check
    const gray = await prismaClient.gray.findUnique({
      where: { id: +grayId },
    });

    if (!gray) throw createError("Couldn't find any gray by grayId.");

    // chalan id check
    if (chalanNumber) {
      const chalan = await prismaClient.chalan.findUnique({
        where: {
          chalanNumber,
        },
      });
      if (!chalan) throw createError("Invalid chalan id.");
      if (chalan.productId) throw createError("Already use this chalan id");
    } else {
      const chalans = await prismaClient.chalan.findMany({
        orderBy: [
          {
            chalanNumber: "desc",
          },
        ],
      });

      const chalan = await prismaClient.chalan.create({
        data: {
          grayId: +req.body.grayId,
          chalanNumber: +chalans[0]?.chalanNumber + 1 || 1,
        },
      });
      console.log(chalan);

      chalanNumber = chalan.chalanNumber;
    }
    console.log(3);

    // console.log(chalanId);

    const product = await prismaClient.product.create({
      data: {
        ...req.body,
        chalanNumber,
      },
    });

    // update chalan data

    await prismaClient.chalan.update({
      where: {
        // chalanId: product.chalanId,
        chalanNumber: product.chalanNumber,
      },
      data: {
        productId: product.id,
      },
    });

    successResponse(res, {
      statusCode: 201,
      message: "Product created successfully.",
      payload: {
        data: product,
      },
    });
  }
);

/**
 *
 * @description        Update product by id
 * @method             PUT
 *
 * @route              /api/v1/products/:id
 * @access             Private
 *
 * @params             [ id = number ]
 * @body               { name, description, price, stock }
 *
 * @success            { success : true  , data }
 * @failed             { success : false, error : { status : code , message} }
 * @error              ( Not Found 404 )   No Products data found
 *
 */

export const updateProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const exist = await prismaClient.product.findUnique({
      where: {
        id: +req.params.id,
      },
    });

    if (!exist) throw createError.NotFound("Couldn't find any product data.");

    const product = await prismaClient.product.update({
      where: { id: +req.params.id },
      data: req.body,
    });

    successResponse(res, {
      statusCode: 200,
      message: "Product updated successfully.",
      payload: {
        data: product,
      },
    });
  }
);

/**
 *@description           Delete product by id
 *@method                DELETE
 *
 *@route                 /api/v1/products/:id
 *@access                private
 *
 *@success              { success : true  , data }
 *@failed               { success : false, error : { status : code , message} }
 *@error                ( Not Found 404 )   No Products data found
 *
 */

export const deleteProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const exist = await prismaClient.product.findUnique({
      where: {
        id: +req.params.id,
      },
    });

    if (!exist) throw createError.NotFound("Couldn't find any product data.");

    // delete related gray products payment
    if (
      exist &&
      "gray_payments" in exist &&
      Array.isArray(exist.gray_payments) &&
      exist?.gray_payments?.length
    ) {
      await prismaClient.grayPayment.deleteMany({
        where: { id: exist?.grayId },
      });
    }

    // delete related dyeing products payment
    if (
      "dyeing_payments" in exist &&
      Array.isArray(exist?.dyeing_payments) &&
      exist.dyeing_payments.length &&
      "dyeingId" in exist &&
      exist.dyeingId
    ) {
      await prismaClient.dyeingPayment.deleteMany({
        where: { id: exist?.dyeingId },
      });
    }

    // delete related customer data
    // if (
    //   "customers" in exist &&
    //   Array.isArray(exist.customers) &&
    //   exist?.customers.length
    // ) {
    //   await prismaClient.customer.deleteMany({
    //     where: {
    //       customerProduct: exist.id,
    //     },
    //   });
    // }

    // delete chalan data
    if ("chalanNumber" in exist && exist?.chalanNumber) {
      await prismaClient.chalan.delete({
        where: { chalanNumber: exist?.chalanNumber },
      });
    }

    // delete product
    await prismaClient.product.delete({
      where: { id: +req.params.id },
    });

    successResponse(res, {
      statusCode: 200,
      message: "Product deleted successfully.",
      payload: {
        data: exist,
      },
    });
  }
);

/**
 *@description           Product  add to dyeing
 *@method                PATCH
 *
 *@route                 /api/v1/products/add-to-dyeing
 *@access                private
 *
 *@success              { success : true  , data }
 *@failed               { success : false, error : { status : code , message} }
 *@error                ( Not Found 404 )   No Products data found
 *
 */

export const productAddToDyeing = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId, dyeingId } = req.body;

    // product check
    const product = await prismaClient.product.findUnique({
      where: { id: productId },
    });

    if (!product) throw createError.NotFound("Couldn't find any product.");

    // dyeing check
    const dyeing = await prismaClient.dyeing.findUnique({
      where: { id: dyeingId },
    });
    if (!dyeing)
      throw createError.NotFound("Couldn't find dyeing id in database.");

    console.log(2);

    const updatedProduct = await prismaClient.product.update({
      where: {
        id: productId,
      },
      data: {
        dyeingId,
        dyeing_date: req.body.dyeing_date,
        dyeing_rate: req.body.dyeing_rate,
        // thaan_amount: req.body.thaan_amount,
      },
    });

    // update chalan data
    await prismaClient.chalan.update({
      where: { chalanNumber: product.chalanNumber },
      data: {
        productId: updatedProduct.id,
        dyeingId: updatedProduct.dyeingId,
      },
    });

    successResponse(res, {
      statusCode: 200,
      message: "Product Add to Dyeing",
      payload: {
        data: updatedProduct,
      },
    });
  }
);

// thaan count
export const thaanCountAddToProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId, thaanData } = req.body;
    console.log(req.body);

    // product check
    const product = await prismaClient.product.findUnique({
      where: { id: +productId },
    });

    if (!product) throw createError.NotFound("Couldn't find any product.");

    // thaan data
    const thaans = await prismaClient.thaanCount.createMany({
      data: thaanData?.map((thaan: Thaan) => {
        return {
          ...thaan,
          productId,
        };
      }),
    });

    successResponse(res, {
      statusCode: 200,
      message: "Thaan Count Add to Product",
      payload: {
        data: thaans,
      },
    });
  }
);
