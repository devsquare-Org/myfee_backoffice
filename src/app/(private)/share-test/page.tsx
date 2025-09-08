"use client";

import { Button } from "@/components/ui/button";

export default function ShareTest() {
  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "내 웹사이트",
          text: "유용한 정보를 확인하세요!",
          url: window.location.href,
        });
        console.log("공유 성공");
      } catch (err) {
        console.error("공유 실패:", err);
      }
    } else {
      alert("이 브라우저는 공유 기능을 지원하지 않습니다.");
    }
  };
  return (
    <div>
      <Button onClick={handleShare}>test</Button>
    </div>
  );
}
