import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  imageUrl: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={imageUrl}
        alt={`${name} 프로필 사진`}
        width={192}
        height={192}
        priority
        unoptimized={imageUrl.endsWith(".svg")}
        className="h-40 w-40 rounded-full border border-black/10 object-cover sm:h-48 sm:w-48 dark:border-white/15"
      />
      <h1 className="mt-6 text-2xl font-bold">{name}</h1>
      <p className="mt-2 text-sm text-foreground/70">{bio}</p>
    </header>
  );
}
