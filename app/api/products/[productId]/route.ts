
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    { params }: { params: { productId: string } }
  ) => {
    try {
      await connectDB();
      const productDetail = await Product.findById(params.productId);
      if (!productDetail) {
        return new NextResponse("Product not found", { status: 404 });
      }
      return NextResponse.json(productDetail, { status: 200 });
    } catch (error) {
      console.log(error);
      return new NextResponse("Internal Errors", { status: 500 });
    }
  };