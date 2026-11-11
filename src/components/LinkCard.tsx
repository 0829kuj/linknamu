type LinkCardProps = {
  title: string;
  url: string;
};

export default function LinkCard({ title, url }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      // 흰색 불투명 배경이라 다크 모드에서도 글자는 항상 짙은 색으로 고정합니다
      className="block w-full rounded-2xl border border-black/5 bg-white px-6 py-4 text-center text-[15px] font-medium text-[#1f2b3d] shadow-[0_8px_24px_-16px_rgb(var(--shadow-tint)/0.4)] transition-shadow duration-300 ease-out hover:shadow-[0_12px_28px_-14px_rgb(var(--shadow-tint)/0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
    >
      {title}
    </a>
  );
}
