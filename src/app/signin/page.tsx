import { LoginForm } from "@/app/signin/_components/login-form";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Suspense fallback={<div>로딩 중...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
