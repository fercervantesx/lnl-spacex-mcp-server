import { z } from "zod";

export const LandpadSchema = z.object({
    name: z.string(),
    full_name: z.string(),
    status: z.string(),
    type: z.string(),
    locality: z.string(),
    region: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    landing_attempts: z.number(),
    landing_successes: z.number(),
    wikipedia: z.string(),
    details: z.string(),
    launches: z.array(z.string()),
    id: z.string(),
});

export type Landpad = z.infer<typeof LandpadSchema>;
export const LandpadsSchema = z.array(LandpadSchema);
export type Landpads = z.infer<typeof LandpadsSchema>;

export const formatLandpads = (landpads: Landpads) => {
    return landpads.map((landpad) => {
        return `${landpad.full_name} (${landpad.name}) - ${landpad.locality}, ${landpad.region}
  Status: ${landpad.status} | Type: ${landpad.type}
  Landings: ${landpad.landing_successes}/${landpad.landing_attempts} successful
  Location: ${landpad.latitude}, ${landpad.longitude} (ID: ${landpad.id})`;
    }).join("\n\n");
}
