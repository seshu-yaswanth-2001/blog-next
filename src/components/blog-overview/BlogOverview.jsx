"use client";

import { useState } from "react";
import AddBlog from "../add-new-blog/AddBlog";


const initialBlogFormData = {
    title: "",
    description: "",
}

const BlogOverView = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [blogFormData, setBlogFormData] = useState(initialBlogFormData);
    const [loading, setLoading] = useState(false);

    const handleSaveData = async() => {
        try{
            setLoading(true);
            const APIResponse = await fetch(`/api/add-blog/`, {
                method: "POST",
                body: JSON.stringify(blogFormData),
            });

            const result = await APIResponse.json();

            if(result?.success) {
                setBlogFormData(initialBlogFormData);
                setOpenDialog(false);
                setLoading(false);
            }
            console.log(result);
        }catch(error) {
            setLoading(false);
            setBlogFormData(initialBlogFormData);
            throw new Error(error)
        }
    }

    return (
        <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6">
            <AddBlog 
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                blogFormData={blogFormData}
                setBlogFormData={setBlogFormData}
                loading={loading}
                handleSaveData={handleSaveData}
            />
        </div>
    )
}

export default BlogOverView;