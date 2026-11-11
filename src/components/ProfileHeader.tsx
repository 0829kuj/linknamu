import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  imageUrl: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* 겹친 그림자로 살짝 떠 있는 입체감 */}
      <Image
        src={imageUrl}
        alt={`${name} 프로필 사진`}
        width={240}
        height={240}
        priority
        unoptimized={imageUrl.endsWith(".svg")}
        // 날개 끝과 햇살이 원 안에 들어오도록 오른쪽으로 치우쳐 자릅니다
        className="h-36 w-36 rounded-full object-cover object-[72%_55%] shadow-[0_2px_4px_rgb(var(--shadow-tint)/0.12),0_16px_36px_-12px_rgb(var(--shadow-tint)/0.45)] sm:h-40 sm:w-40"
      />
      <h1 className="mt-6 text-xl font-bold tracking-tight">{name}</h1>
      <p className="mt-2 text-sm text-foreground/60">{bio}</p>
    </header>
  );
}
