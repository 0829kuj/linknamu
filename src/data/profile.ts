export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  imageUrl: string;
  links: LinkItem[];
};

// TODO: 보여 주기용 더미 값입니다. 진짜 내용으로 교체하세요.
export const profile: Profile = {
  name: "0829kuj",
  bio: "백엔드 개발초심자 | AI개발 도전중",
  imageUrl: "/flight-unsplash.jpg",
  links: [
    { id: "github", title: "🐙 GitHub", url: "https://github.com/0829kuj" },
    { id: "blog", title: "📝 블로그", url: "https://velog.io/@0829kuj" },
    { id: "email", title: "✉️ 이메일", url: "mailto:0829kuj@gmail.com" },
  ],
};
