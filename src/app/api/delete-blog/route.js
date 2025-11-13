import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const getCurrentBlogID = searchParams.get("id");

    if (!getCurrentBlogID) {
      return NextResponse.json({
        success: false,
        message: "Blog ID is required to delete the blog from server.",
      });
    }

    const deleteCurrentBlogId = await Blog.findByIdAndDelete(getCurrentBlogID);

    if (deleteCurrentBlogId) {
      return NextResponse.json({
        success: true,
        message: "Blog Deleted successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong! Please try again later.",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later.",
    });
  }
}
