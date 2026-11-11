"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type LinkListProps = {
  links: LinkItem[];
};

export default function LinkList({ links }: LinkListProps) {
  // 데이터를 받기 전에는 모든 링크를 0회로 보여 줍니다.
  const [counts, setCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(links.map((link) => [link.id, 0])),
  );

  // 페이지가 열리면 모든 링크의 클릭 수를 한 번에 가져옵니다.
  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/clicks", { signal: controller.signal, cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: Record<string, number>) => {
        // 받아 오는 사이에 누른 클릭이 사라지지 않도록 더 큰 값을 유지합니다.
        setCounts((prev) => {
          const next = { ...prev };
          for (const [id, count] of Object.entries(data)) {
            next[id] = Math.max(prev[id] ?? 0, count);
          }
          return next;
        });
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error("클릭 수를 불러오지 못했습니다:", error);
      });

    return () => controller.abort();
  }, []);

  function handleClick(id: string) {
    // 화면에는 바로 1을 더해 보여 주고, 서버에는 뒤에서 기록합니다.
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      keepalive: true, // 링크로 이동하는 중에도 요청이 끝까지 전송되도록
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { id: string; count: number }) => {
        setCounts((prev) => ({ ...prev, [data.id]: Math.max(prev[data.id] ?? 0, data.count) }));
      })
      .catch((error) => {
        console.error("클릭 수를 저장하지 못했습니다:", error);
      });
  }

  return (
    <ul className="mt-12 flex flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            title={link.title}
            url={link.url}
            count={counts[link.id] ?? 0}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
