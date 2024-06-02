import Collection from "@/lib/models/Collection";
import { connectDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    await connectDB();
    const collectionDetail = await Collection.findById(params.collectionId);
    if (!collectionDetail) {
      return new NextResponse("Collections not found", { status: 404 });
    }
    return NextResponse.json(collectionDetail, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Errors", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();
    await Collection.findByIdAndDelete(params.collectionId);
    return new NextResponse("Collection is deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 404 });
    }
    await connectDB();
    const { title, description, image } = await req.json();

    
    let collectionUpdate = await Collection.findByIdAndUpdate(
      params.collectionId,
      { title, description, image },
      { new: true }
    );

    if (!title || !image) {
      return new NextResponse("Title and image is not empty", { status: 400 });
    }

    await collectionUpdate.save();
    return NextResponse.json(collectionUpdate, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
