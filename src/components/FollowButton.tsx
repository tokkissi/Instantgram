"use client";

import { ProfileUser } from "@/model/user";
import Button from "./ui/Button";
import UseMe from "@/hooks/useMe";

type Props = {
  user: ProfileUser;
};

const FollowButton = ({ user }: Props) => {
  const { username } = user;
  const { user: loggedInUser } = UseMe();
  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);
  const text = following ? "Unfollow" : "Follow";
  return (
    <>
      {showButton && (
        <Button text={text} onClick={() => {}} red={text === "Unfollow"} />
      )}
    </>
  );
};

export default FollowButton;
