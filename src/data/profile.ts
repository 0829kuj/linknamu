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
  name: "홍길동",
  bio: "한 줄 소개를 여기에 적어 주세요",
  imageUrl: "/profile.svg",
  links: [
    { id: "github", title: "GitHub", url: "https://github.com" },
    { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com" },
    { id: "blog", title: "Blog", url: "https://example.com" },
  ],
};
