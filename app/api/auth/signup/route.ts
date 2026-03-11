import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { hashPassword, createToken } from "@/lib/auth";
import { z } from "zod";
import { randomUUID } from "crypto";

type UserRow = {
  _id: string;
  email: string;
  password: string | null;
  createdAt: Date;
};

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = signupSchema.parse(body);

    // Check if user already exists
    const existing = await query<UserRow>(
      "SELECT _id FROM users WHERE email = $1",
      [email.toLowerCase()]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password and create user
    const passwordHash = await hashPassword(password);
    const userId = randomUUID();
    const { rows } = await query<UserRow>(
      "INSERT INTO users (_id, email, password) VALUES ($1, $2, $3) RETURNING _id, email",
      [userId, email.toLowerCase(), passwordHash]
    );

    const user = rows[0];

    // Create JWT token
    const token = await createToken({
      userId: user._id,
      email: user.email,
    });

    return NextResponse.json(
      { 
        token, 
        user: { 
          id: user._id, 
          email: user.email 
        } 
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      return NextResponse.json(
        { error: firstError?.message || "Invalid input" },
        { status: 400 }
      );
    }
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}

