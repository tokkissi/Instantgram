import { FullPost, SimplePost } from "@/model/post";
import Image from "next/image";
import useSWR from "swr";
import PostUserAvatar from "./PostUserAvatar";
import ActionBar from "./ActionBar";
import CommentForm from "./CommentForm";
import Avatar from "./ui/Avatar";
import UseFullPost from "@/hooks/useFullPost";
import useMe from "@/hooks/useMe";

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, username, userImage, image, likes, text, createdAt } = post;
  const { post: data, postComment } = UseFullPost(id);
  const { user } = useMe();
  const comments = data?.comments;
  const handlePostComment = (comment: string) => {
    user &&
      postComment({ comment, username: user.username, image: user.image });
  };

  return (
    <section className="w-full h-full flex">
      <div className="relative basis-3/5">
        <Image
          src={image}
          alt={`photo by ${username}`}
          className="object-cover"
          sizes="650px"
          priority
          fill
        />
      </div>
      <div className="w-full basis-2/5 flex flex-col">
        <PostUserAvatar image={userImage} username={username} />
        <ul className="border-t border-gray-200 h-full overflow-y-auto p-4 mb-2">
          {comments &&
            comments.map(
              ({ image, username: commentUSername, comment }, index) => (
                <li key={index} className="flex items-center mb-1">
                  <Avatar
                    image={image}
                    size="small"
                    highlight={commentUSername === username}
                  />
                  <div className="ml-2">
                    <span className="font-bold mr-1">{commentUSername}</span>
                    <span>{comment}</span>
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar post={post} />
        <CommentForm onPostComment={handlePostComment} />
      </div>
    </section>
  );
}
