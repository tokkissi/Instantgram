import { searchUsers } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    keyword: string;
  };
};

export async function GET(_: NextRequest, context: Context) {
  console.log("keyword는 이거임: ", context.params.keyword);
  return searchUsers(context.params.keyword) //
    .then((data) => NextResponse.json(data));
}
