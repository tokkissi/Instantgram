import { SimplePost } from "@/model/post";
import Image from "next/image";
import PostUserAvatar from "./PostUserAvatar";
import ActionBar from "./ActionBar";
import Avatar from "./ui/Avatar";
import UseFullPost from "@/hooks/useFullPost";

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, username, userImage, image } = post;
  const { post: data, postComment } = UseFullPost(id);
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
        <ActionBar post={post} onComment={postComment} />
      </div>
    </section>
  );
}
