import { PrismaClient } from "@prisma/client"
import { hash, compare } from "bcryptjs"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const prisma = new PrismaClient()
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key"

export async function signUp(name: string, email: string, password: string) {
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (exists) {
    throw new Error("User already exists")
  }

  const hashedPassword = await hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  const token = await new SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(new TextEncoder().encode(SECRET_KEY))

  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 86400, // 24 hours
  })

  return user
}

export async function signIn(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    throw new Error("User does not exist")
  }

  const isValid = await compare(password, user.password)

  if (!isValid) {
    throw new Error("Invalid password")
  }

  const token = await new SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(new TextEncoder().encode(SECRET_KEY))

  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 86400, // 24 hours
  })

  return user
}

export async function signOut() {
  cookies().delete("token")
}

export async function getSession() {
  const token = cookies().get("token")

  if (!token) {
    return null
  }

  try {
    const verified = await jwtVerify(token.value, new TextEncoder().encode(SECRET_KEY))
    return verified.payload
  } catch (err) {
    return null
  }
}

export async function getCurrentUser() {
  const session = await getSession()

  if (!session) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.userId as string,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  })

  return user
}

