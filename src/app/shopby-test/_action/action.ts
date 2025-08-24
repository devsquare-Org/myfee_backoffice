"use server";

export async function calculatePrice(optionNo: string[], productNo: number) {
  const clientId = process.env.CLIENT_ID;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!clientId || !baseUrl) {
    throw new Error("환경변수가 설정되지 않았습니다.");
  }

  // 중복된 옵션 ID의 개수를 계산
  const optionCounts = optionNo.reduce((acc, option) => {
    acc[option] = (acc[option] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 중복 제거하고 개수만큼 orderCnt 설정
  const body = Object.entries(optionCounts).map(([option, count]) => ({
    productNo: productNo,
    optionNo: option,
    orderCnt: count,
  }));

  const res = await fetch(`https://${baseUrl}/guest/cart`, {
    method: "POST",
    headers: {
      Version: "1.0",
      "Content-Type": "application/json",
      clientId: clientId,
      platform: "PC",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return data;
}
