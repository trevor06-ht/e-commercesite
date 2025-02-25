import { signIn } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    const user = await signIn(email, password)
    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
  }
}

