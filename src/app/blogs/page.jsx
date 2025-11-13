import BlogOverView from "@/components/blog-overview/BlogOverview";

async function fetchBlogs() {
  try {
    const fetchAPI = await fetch("http://localhost:3000/api/get-blog", {
      method: "GET",
      cache: "no-store",
    });

    const result = await fetchAPI.json();
    return result?.data;
  } catch (err) {
    throw new Error(err);
  }
}

const Blogs = async () => {
  const blogList = await fetchBlogs();
  console.log(blogList);
  return (
    <>
      <BlogOverView blogList={blogList} />
    </>
  );
};

export default Blogs;
