import "server-only";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error(".env.local에 MONGODB_URI 환경 변수가 없습니다.");
}

// 개발 서버는 코드가 바뀔 때마다 모듈을 다시 불러오므로,
// 연결을 전역에 보관해 매번 새 연결이 쌓이지 않게 합니다.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

const clientPromise =
  globalForMongo._mongoClientPromise ?? new MongoClient(uri).connect();

if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClientPromise = clientPromise;
}

/** 링크별 클릭 수 문서: { _id: 링크 id, count: 클릭 수 } */
type ClickDoc = { _id: string; count: number };

export async function getClicksCollection() {
  const client = await clientPromise;
  // 데이터베이스 이름은 MONGODB_URI 주소의 경로(/linknamu)를 따릅니다.
  return client.db().collection<ClickDoc>("clicks");
}
