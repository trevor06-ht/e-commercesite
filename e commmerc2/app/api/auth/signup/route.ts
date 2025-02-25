import { signUp } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()
    const user = await signUp(name, email, password)
    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 400 })
  }
}

