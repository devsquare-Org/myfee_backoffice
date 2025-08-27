import { redirect } from "next/navigation";

export default function Page() {
  // middleware에서 인증 처리하므로 여기서는 단순히 대시보드로 리다이렉트
  redirect("/dashboard");
}
