"use server";

import { loginFormSchema } from "@/app/signin/_action/schema";
import { actionClient } from "@/lib/utils";

export const loginAction = actionClient
  .inputSchema(loginFormSchema)
  .action(async ({ parsedInput }) => {
    console.log(parsedInput);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // throw new Error("Login Failed");
    return { message: "Login Success" };
  });
