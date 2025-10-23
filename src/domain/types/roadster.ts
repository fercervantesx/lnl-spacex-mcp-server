import { z } from "zod";

export const RoadsterSchema = z.object({
    flickr_images: z.array(z.string()),
    name: z.string(),
    launch_date_utc: z.string().datetime(),
    launch_date_unix: z.number(),
    launch_mass_kg: z.number(),
    launch_mass_lbs: z.number(),
    norad_id: z.number(),
    epoch_jd: z.number(),
    orbit_type: z.string(),
    apoapsis_au: z.number(),
    periapsis_au: z.number(),
    semi_major_axis_au: z.number(),
    eccentricity: z.number(),
    inclination: z.number(),
    longitude: z.number(),
    periapsis_arg: z.number(),
    period_days: z.number(),
    speed_kph: z.number(),
    speed_mph: z.number(),
    earth_distance_km: z.number(),
    earth_distance_mi: z.number(),
    mars_distance_km: z.number(),
    mars_distance_mi: z.number(),
    wikipedia: z.string(),
    video: z.string(),
    details: z.string(),
    id: z.string(),
});

export type Roadster = z.infer<typeof RoadsterSchema>;

export const formatRoadster = (roadster: Roadster) => {
    return `${roadster.name} - Launched ${roadster.launch_date_utc.split('T')[0]}
Orbit Type: ${roadster.orbit_type}
Speed: ${roadster.speed_kph.toLocaleString()} km/h (${roadster.speed_mph.toLocaleString()} mph)
Distance from Earth: ${roadster.earth_distance_km.toLocaleString()} km (${roadster.earth_distance_mi.toLocaleString()} mi)
Distance from Mars: ${roadster.mars_distance_km.toLocaleString()} km (${roadster.mars_distance_mi.toLocaleString()} mi)
Orbital Period: ${roadster.period_days.toFixed(2)} days

${roadster.details}

Wikipedia: ${roadster.wikipedia}
Video: ${roadster.video}`;
}
