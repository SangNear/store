
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectDB();
    const productDetail = await Product.findById(params.productId).populate({ path: "collections", model: Collection });
    if (!productDetail) {
      return new NextResponse("Product not found", { status: 404 });
    }
    return new NextResponse(JSON.stringify(productDetail), { status: 200 })
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Errors", { status: 500 });
  }
};
export const POST = async (req:NextRequest, {params} : {params:{productId: string}}) => {
  try {
    const {userId} = auth()
    if(!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await connectDB()
    const product = await Product.findById(params.productId)

    if(!product) {
      return new NextResponse("Product not found", {status: 404})
    }

    const {title, description, media, category, collections, tags, colors, sizes, price, expense} = await req.json()

    if(!title || !description || !media || !category || !price || !expense) {
      return new NextResponse("not enough data to update", { status: 500})
    }

    const addCollections = collections.filter((collectionId: string) => product.collections.includes(collectionId))
    

  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Errors", {status: 500})
    
  }
}