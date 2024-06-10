import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    await connectDB();
    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await req.json();
    if (!title || !description || !media || !category || !price || !expense) {
      return new NextResponse("not enough data to create a product", {
        status: 400,
      });
    }

    const newProduct = await Product.create({
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    });

    await newProduct.save();
    return NextResponse.json(newProduct, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    
    await connectDB()
    const products = await Product.find()
      
      
    return NextResponse.json(products, { status: 200 })
  } catch (error) {
    console.log(error);

    return new NextResponse("Internal Errors", { status: 500 })
  }
}
