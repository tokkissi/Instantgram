"use client";

import { ProfileUser } from "@/model/user";
import { useState } from "react";
import PostIcon from "./ui/icons/PostIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import PostGrid from "./PostGrid";
import { CacheKeysContext } from "@/context/CacheKeysContext";

type Props = {
  user: ProfileUser;
};

const tabs = [
  {
    type: "posts",
    icon: <PostIcon />,
  },
  {
    type: "liked",
    icon: <HeartIcon className={"w-3 h-3"} />,
  },
  {
    type: "saved",
    icon: <BookmarkIcon className={"w-3 h-3"} />,
  },
];

const UserPosts = ({ user: { username } }: Props) => {
  const [query, setQuery] = useState(tabs[0].type);

  return (
    <section>
      <ul className="flex justify-center uppercase">
        {tabs.map(({ type, icon }) => (
          <li
            className={`flex items-center mx-12 p-4 cursor-pointer border-black ${
              type === query && "font-bold border-t"
            }`}
            key={type}
            onClick={() => setQuery(type)}
          >
            <button className="scale-150 md:scale-100">{icon}</button>
            <span className="ml-1 hidden md:inline">{type}</span>
          </li>
        ))}
      </ul>
      <CacheKeysContext.Provider
        value={{ postsKey: `/api/users/${username}/${query}` }}
      >
        <PostGrid />
      </CacheKeysContext.Provider>
    </section>
  );
};

export default UserPosts;
