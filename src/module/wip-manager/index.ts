import { SupabaseClient } from "@supabase/supabase-js";
import { createClientOnServer } from "./supabase/server";
import { Database } from "./supabase/types";

export interface WipItem {
  id: string;
  reviewItemId: number;
  adminId: string;
  status: "viewing" | "reviewed";
  createdAt: string | null;
  completedAt: string | null;
}

export interface AddItemParams {
  reviewItemId: number;
  adminId: string;
  status?: "viewing" | "reviewed";
}

export interface UpdateItemParams {
  reviewItemId: number;
  adminId: string;
  status: "viewing" | "reviewed";
  completedAt?: string | null;
}

export interface RemoveItemParams {
  reviewItemId: number;
}

class WipManager {
  private static instance: WipManager;
  private supabaseServer: SupabaseClient<Database>;

  private constructor() {
    this.supabaseServer = createClientOnServer();
  }

  static getInstance(): WipManager {
    if (!WipManager.instance) {
      WipManager.instance = new WipManager();
    }
    return WipManager.instance;
  }

  async addItem(params: AddItemParams) {
    const { data, error } = await this.supabaseServer.from("wip_items").insert({
      review_item_id: params.reviewItemId,
      admin_id: params.adminId,
      status: params.status || "viewing",
    });

    if (error) {
      throw new Error(`WIP 아이템 생성 실패: ${error.message}`);
    }

    return { data };
  }

  async updateItem(params: UpdateItemParams) {
    const { data, error } = await this.supabaseServer
      .from("wip_items")
      .update({
        review_item_id: params.reviewItemId,
        admin_id: params.adminId,
        status: params.status,
        completed_at: params.completedAt,
      })
      .eq("review_item_id", params.reviewItemId);

    if (error) {
      throw new Error(`WIP 아이템 업데이트 실패: ${error.message}`);
    }

    return { data };
  }

  async removeItem(params: RemoveItemParams) {
    const { data, error } = await this.supabaseServer
      .from("wip_items")
      .delete()
      .eq("review_item_id", params.reviewItemId)
      .eq("status", "viewing")
      .is("completed_at", null);

    if (error) {
      throw new Error(`WIP 아이템 삭제 실패: ${error.message}`);
    }

    return { data };
  }

  async getItems() {
    const { data, error } = await this.supabaseServer
      .from("wip_items")
      .select("*");

    if (error) {
      throw new Error(`WIP 아이템 조회 실패: ${error.message}`);
    }

    return { data };
  }
}

export default WipManager.getInstance();
