import { FullPost, SimplePost } from "@/model/post";
import Image from "next/image";
import useSWR from "swr";
import PostUserAvatar from "./PostUserAvatar";
import ActionBar from "./ActionBar";
import CommentForm from "./CommentForm";
import Avatar from "./ui/Avatar";

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, username, userImage, image, likes, text, createdAt } = post;
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;
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
        <CommentForm />
      </div>
    </section>
  );
}
