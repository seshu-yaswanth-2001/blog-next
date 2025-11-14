"use client";

import { useEffect, useState } from "react";
import AddBlog from "../add-new-blog/AddBlog";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const initialBlogFormData = {
  title: "",
  description: "",
};

const BlogOverView = (props) => {
  const { blogList } = props;

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  const [openDialog, setOpenDialog] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);
  const [loading, setLoading] = useState(false);
  const [currentEditedBlogId, setCurrentEditedBlogId] = useState(null);

  const handleSaveData = async () => {
    try {
      setLoading(true);
      const APIResponse =
        currentEditedBlogId !== null
          ? await fetch(`/api/update-blog?id=${currentEditedBlogId}`, {
              method: "PUT",
              body: JSON.stringify(blogFormData),
            })
          : await fetch(`/api/add-blog/`, {
              method: "POST",
              body: JSON.stringify(blogFormData),
            });

      const result = await APIResponse.json();

      if (result?.success) {
        setBlogFormData(initialBlogFormData);
        setOpenDialog(false);
        setLoading(false);
        setCurrentEditedBlogId(null);
        router.refresh();
      } else {
        setLoading(false);
      }
      console.log(result);
    } catch (error) {
      setLoading(false);
      setBlogFormData(initialBlogFormData);
      console.log(error);
    }
  };

  const handleDeleteBlog = async (getCurrentID) => {
    try {
      const fetchAPI = await fetch(`/api/delete-blog?id=${getCurrentID}`, {
        method: "DELETE",
      });

      const result = await fetchAPI.json();

      if (result?.success) return router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  const handleBlogUpdate = async (blogItem) => {
    if (!blogItem) return;
    setCurrentEditedBlogId(blogItem._id ?? null);
    setBlogFormData({
      title: blogItem?.title ?? "",
      description: blogItem?.description ?? "",
    });
    setOpenDialog(true);
  };

  return (
    <div className="min-h-screen flex flex-col gap-10 bg-linear-to-r from-purple-500 to-blue-600 p-6">
      <AddBlog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        loading={loading}
        handleSaveData={handleSaveData}
        currentEditedBlogId={currentEditedBlogId}
        setCurrentEditedBlogId={setCurrentEditedBlogId}
      />

      {/* Show Blogs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {blogList && blogList.length > 0 ? (
          blogList?.map((blog, index) => (
            <Card className="p-5" key={index}>
              <CardContent>
                <CardTitle className="mb-5">{blog?.title}</CardTitle>
                <CardDescription>{blog?.description}</CardDescription>
                <div className="mt-5 flex gap-5  items-center">
                  <Button onClick={() => handleBlogUpdate(blog._id)}>
                    Edit
                  </Button>
                  <Button onClick={() => handleDeleteBlog(blog._id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Label className="text-3xl font-extrabold">
            No Blog found! Please add One
          </Label>
        )}
      </div>
    </div>
  );
};

export default BlogOverView;
