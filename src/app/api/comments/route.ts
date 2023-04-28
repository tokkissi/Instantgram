import { addComment } from "@/service/posts";
import { withSessionUser } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id: postId, comment } = await req.json();

    if (!postId || comment == null) {
      return new Response("Bad Request", { status: 400 });
    }

    return addComment(postId, user.id, comment) //
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
