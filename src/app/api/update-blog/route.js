import connectToDB from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const EditBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function UPDATE(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const getBlogID = searchParams.get("id");

    if (!getBlogID) {
      return NextResponse.json({
        success: false,
        message: "Blog Id is required! Blog id is missing",
      });
    }

    const { title, description } = await req.json();
    const { error } = EditBlog.validate({
      title,
      description,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const updateBlogId = await Blog.findOneAndUpdate(
      { _id: getBlogID },
      {
        title,
        description,
      },
      { new: true }
    );

    if (updateBlogId) {
      return NextResponse.json({
        success: true,
        message: "Blog updated!",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong! Please try again later",
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later!",
    });
  }
}
