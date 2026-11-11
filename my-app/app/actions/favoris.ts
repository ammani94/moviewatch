"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";
import { getSession } from "@/lib/auth";

const AddFavoriteInput = z.object({
  tmdbId: z.number().int().positive(),
});

export async function addFavorite(input: unknown) {
  const session = await getSession();
  if (!session) return { error: "NOT_AUTHENTICATED" as const };

  const parsed = AddFavoriteInput.safeParse(input);
  if (!parsed.success) return { error: "INVALID_INPUT" as const };

  const res = await fetch(`${process.env.FAVORIS_API_URL}/favoris`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tmdbId: parsed.data.tmdbId,
      userEmail: session.email,
      type: "film",
    }),
  });

  if (!res.ok) return { error: "API_ERROR" as const };

  revalidateTag("favoris");
  return { success: true as const };
}