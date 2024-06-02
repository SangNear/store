import Collection from "@/lib/models/Collection";
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
    const { title, description, image } = await req.json();

    if (!title || !image) {
      return new NextResponse("Title and image is not empty", { status: 400 });
    }

    const existingCollection = await Collection.findOne({ title });
    if (existingCollection) {
      return new NextResponse("Collection is already exist", { status: 400 });
    }

    const newCollection = await Collection.create({
      title,
      description,
      image,
    });

    await newCollection.save();
    return NextResponse.json(newCollection, { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized user", { status: 403 });
    }
    await connectDB();
    const collections = await Collection.find().sort({ createdAt: "desc" });
    return NextResponse.json(collections, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Errors", { status: 500 });
  }
};
