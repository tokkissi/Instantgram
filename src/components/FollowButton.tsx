"use client";

import { ProfileUser } from "@/model/user";
import Button from "./ui/Button";
import UseMe from "@/hooks/useMe";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";

type Props = {
  user: ProfileUser;
};

const FollowButton = ({ user: targetUser }: Props) => {
  const { user: loggedInUser, toggleFollow } = UseMe();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;

  const showButton =
    loggedInUser && loggedInUser.username !== targetUser.username;
  const following =
    loggedInUser &&
    loggedInUser.following.find(
      (item) => item.username === targetUser.username
    );
  const text = following ? "Unfollow" : "Follow";

  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(targetUser.id, !following);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      {showButton && (
        <div className="relative">
          {isUpdating && (
            <div className="absolute z-20 inset-0 flex justify-center items-center">
              <PulseLoader size={6} />
            </div>
          )}
          <Button
            text={text}
            onClick={handleFollow}
            red={text === "Unfollow"}
            disabled={isUpdating}
          />
        </div>
      )}
    </>
  );
};

export default FollowButton;
