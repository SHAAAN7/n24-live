import { NextResponse } from "next/server";

import {
  getTimingData,
} from "@/lib/timing";

export async function GET() {
  try {
    const data =
      await getTimingData();

    return NextResponse.json(
      data
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Timing fetch failed",
      },
      { status: 500 }
    );
  }
}