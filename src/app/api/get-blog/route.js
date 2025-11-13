import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const extractBlogs = await Blog.find({});

    if (extractBlogs) {
      return NextResponse.json({
        success: true,
        data: extractBlogs,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong! Please try again later",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
