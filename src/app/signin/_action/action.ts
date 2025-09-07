"use server";

import { loginFormSchema } from "@/app/signin/_action/schema";
import { actionClient } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const dummyAccessToken = "1234567890";

export const loginAction = actionClient
  .inputSchema(loginFormSchema)
  .action(async ({ parsedInput }) => {
    console.log(parsedInput);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const cookieStore = await cookies();
    cookieStore.set("accessToken", dummyAccessToken);
    cookieStore.set("userId", parsedInput.email);

    // throw new Error("Login Failed");
    return { message: "Login Success" };
  });

export const logoutAction = actionClient.action(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("userId");
  redirect("/signin");
});
