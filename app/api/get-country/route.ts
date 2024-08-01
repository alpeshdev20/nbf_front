import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  try {
    const response = await fetch("http://ip-api.com/json");
    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({ country: data.country });
    } else {
      return NextResponse.json(
        { error: "Failed to fetch country" },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
