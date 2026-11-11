import Footer from "@/components/Footer";
import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-7 pt-20 pb-12 sm:px-8 sm:pt-28 sm:pb-16">
      {/* 상단: 원형 프로필 사진, 이름, 한 줄 소개 */}
      <ProfileHeader name={profile.name} bio={profile.bio} imageUrl={profile.imageUrl} />

      {/* 하단: 링크 카드 세로 배치 + 클릭 수 */}
      <LinkList links={profile.links} />

      <Footer />
    </main>
  );
}
