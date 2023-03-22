import { Suspense } from "react";
import { useLoaderData, defer, Await } from "react-router-dom";

import Posts from "../components/Posts";
import { getSlowPosts } from "../util/api";

function DeferredBlogPostsPage() {
  const loaderData = useLoaderData();

  return (
    <>
      <h1>Our Blog Posts</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Await
          resolve={loaderData.posts}
          errorElement={<p>Error loading blog posts</p>}
        >
          {(loadposts) => <Posts blogPosts={loadposts} />}
        </Await>
      </Suspense>
    </>
  );
}

export default DeferredBlogPostsPage;

export async function loader() {
  return defer({ posts: getSlowPosts() });
}
// if we add "await" - defer({ posts: await getSlowPosts() }), the whole page will wait until the getSlowPosts() has a result. otherwise, other components will just render first
