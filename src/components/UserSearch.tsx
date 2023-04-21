"use client";

import { SearchUser } from "@/model/user";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import GridSpinner from "./ui/GridSpinner";
import UserCard from "./UserCard";
import useDebounce from "@/hooks/useDebounce";

const UserSearch = () => {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword);
  const {
    data: users,
    error,
    isLoading,
  } = useSWR<SearchUser[]>(`/api/search/${debouncedKeyword}`);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="w-full max-w-2xl my-4 flex flex-col items-center">
      <form className="w-full mb-4" onSubmit={onSubmit}>
        <input
          className="w-full text-xl p-3 outline-none border border-gray-400"
          type="text"
          autoFocus
          placeholder="Search for a username or name"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      {error && <p>검색 결과 로딩 중에 에러가 발생했습니다😭</p>}
      {isLoading && <GridSpinner />}
      {!isLoading && !error && users?.length === 0 && (
        <p>검색 조건의 사용자가 없습니다🙄</p>
      )}
      <ul className="w-full p-4">
        {users &&
          users.map((user) => (
            <li key={user.username}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default UserSearch;
