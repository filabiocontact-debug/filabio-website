import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const PRESETS: Record<string, string> = {
  hand: "held naturally in a person's hand, soft natural daylight, shallow depth of field",
  nature: "placed outdoors in a natural Moroccan landscape at golden hour, warm sunlight, plants and stones",
  studio: "on a minimalist studio set, seamless warm beige backdrop, soft diffused light, subtle shadow",
  gym: "on a bench in a modern gym, warm ambient lighting, blurred equipment in the background",
};

export const generateStudioImage = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        image: z.string().startsWith("data:image/").max(8_000_000),
        preset: z.enum(["hand", "nature", "studio", "gym"]),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Service IA indisponible");
    const prompt = `Create a premium realistic marketing photograph of this exact product, ${PRESETS[data.preset]}. Keep the product packaging, label, logo, text and colors exactly identical — do not redesign or alter it.`;
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        modalities: ["image", "text"],
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: data.image } },
            ],
          },
        ],
      }),
    });
    if (res.status === 429) throw new Error("Trop de demandes, réessayez dans un instant.");
    if (res.status === 402) throw new Error("Crédits IA épuisés.");
    if (!res.ok) throw new Error("La génération a échoué.");
    const json = (await res.json()) as {
      choices?: { message?: { images?: { image_url?: { url?: string } }[] } }[];
    };
    const url = json.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (!url) throw new Error("Aucune image reçue.");
    return { url };
  });
