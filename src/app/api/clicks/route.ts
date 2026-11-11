import { connection } from "next/server";
import { profile } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

// 프로필에 등록된 링크 id만 집계합니다 (아무 값이나 DB에 쌓이지 않도록).
const linkIds = profile.links.map((link) => link.id);

/** 모든 링크의 클릭 수를 한 번에 돌려줍니다. 예: { github: 40, blog: 3, email: 0 } */
export async function GET() {
  // 요청마다 DB의 최신 값을 읽도록 미리 렌더링하지 않습니다.
  await connection();

  try {
    const clicks = await getClicksCollection();
    const docs = await clicks.find({ _id: { $in: linkIds } }).toArray();

    const counts: Record<string, number> = Object.fromEntries(linkIds.map((id) => [id, 0]));
    for (const doc of docs) counts[doc._id] = doc.count;

    return Response.json(counts);
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return Response.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}

/** 요청 본문 { id } 에 해당하는 링크의 클릭 수를 1 늘리고, 늘어난 값을 돌려줍니다. */
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  if (typeof id !== "string" || !linkIds.includes(id)) {
    return Response.json({ error: "존재하지 않는 링크입니다." }, { status: 400 });
  }

  try {
    const clicks = await getClicksCollection();
    const doc = await clicks.findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return Response.json({ id, count: doc?.count ?? 1 });
  } catch (error) {
    console.error("클릭 수 저장 실패:", error);
    return Response.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}
