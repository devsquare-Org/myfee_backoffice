"use server";

import { createClientOnServer } from "@/lib/supabase/supabase-server";
import {
  deleteWipItemsSchema,
  insertWipItemsSchema,
  updateWipItemsSchema,
} from "./schema";
import { z } from "zod";

export async function insertWipItems(
  params: z.infer<typeof insertWipItemsSchema>
) {
  const validParams = insertWipItemsSchema.safeParse(params);

  if (!validParams.success) return { error: validParams.error.message };

  const { data, error } = await createClientOnServer()
    .from("wip_items")
    .insert({
      review_item_id: validParams.data.reviewItemId,
      admin_id: validParams.data.adminId,
      status: validParams.data.status,
    });

  if (error) return { error: error.message };

  return { data };
}

export async function updateWipItems(
  params: z.infer<typeof updateWipItemsSchema>
) {
  const validParams = updateWipItemsSchema.safeParse(params);

  if (!validParams.success) return { error: validParams.error.message };

  const { data, error } = await createClientOnServer()
    .from("wip_items")
    .update({
      review_item_id: validParams.data.reviewItemId,
      admin_id: validParams.data.adminId,
      status: validParams.data.status,
      completed_at: validParams.data.completedAt,
    })
    .eq("review_item_id", validParams.data.reviewItemId);

  if (error) return { error: error.message };

  return { data };
}

export async function deleteWipItems(
  params: z.infer<typeof deleteWipItemsSchema>
) {
  const validParams = deleteWipItemsSchema.safeParse(params);

  if (!validParams.success) return { error: validParams.error.message };

  const { data, error } = await createClientOnServer()
    .from("wip_items")
    .delete()
    .eq("review_item_id", validParams.data.reviewItemId)
    .eq("status", "viewing")
    .is("completed_at", null); // completed_at이 null인 경우에만 삭제

  if (error) return { error: error.message };

  return { data };
}

export async function fetchWipItems() {
  const { data, error } = await createClientOnServer()
    .from("wip_items")
    .select("*");

  if (error) return { error: error.message };

  return { data };
}
