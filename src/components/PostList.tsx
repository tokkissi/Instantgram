"use client";

import PostListCard from "./PostListCard";
import GridSpinner from "./ui/GridSpinner";
import UsePosts from "@/hooks/usePosts";

const PostList = () => {
  const { posts, isLoading: loading } = UsePosts();
  return (
    <section>
      {loading && (
        <div className="text-center mt-32">
          <GridSpinner />
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post, index) => (
            <li key={post.id} className="mb-4">
              <PostListCard post={post} priority={index < 2} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PostList;
