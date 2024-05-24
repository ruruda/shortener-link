import { NextRequest } from "next/server";
import { prewarmConnection } from "../../../lib/prewarmConnection";

export async function GET(request: NextRequest) {
  try {
    await prewarmConnection();
  } catch (error: any) {
    console.log("Error in GET /api/prewarming: ", error.message);
  }
}