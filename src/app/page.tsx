import Footer from "@/components/Footer";
import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 pt-20 pb-12 sm:pt-24 sm:pb-16">
      {/* 상단: 원형 프로필 사진, 이름, 한 줄 소개 */}
      <ProfileHeader name={profile.name} bio={profile.bio} imageUrl={profile.imageUrl} />

      {/* 하단: 링크 카드 세로 배치 */}
      <ul className="mt-10 flex flex-col gap-6">
        {profile.links.map((link) => (
          <li key={link.id}>
            <LinkCard title={link.title} url={link.url} />
          </li>
        ))}
      </ul>

      <Footer />
    </main>
  );
}
