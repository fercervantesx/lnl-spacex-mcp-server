import { z } from "zod";

const FairingsSchema = z.object({
    reused: z.boolean().nullable(),
    recovery_attempt: z.boolean().nullable(),
    recovered: z.boolean().nullable(),
    ships: z.array(z.string()),
}).nullable();

const PatchSchema = z.object({
    small: z.string().nullable(),
    large: z.string().nullable(),
});

const RedditSchema = z.object({
    campaign: z.string().nullable(),
    launch: z.string().nullable(),
    media: z.string().nullable(),
    recovery: z.string().nullable(),
});

const FlickrSchema = z.object({
    small: z.array(z.string()),
    original: z.array(z.string()),
});

const LinksSchema = z.object({
    patch: PatchSchema,
    reddit: RedditSchema,
    flickr: FlickrSchema,
    presskit: z.string().nullable(),
    webcast: z.string().nullable(),
    youtube_id: z.string().nullable(),
    article: z.string().nullable(),
    wikipedia: z.string().nullable(),
});

const CoreSchema = z.object({
    core: z.string().nullable(),
    flight: z.number().nullable(),
    gridfins: z.boolean().nullable(),
    legs: z.boolean().nullable(),
    reused: z.boolean().nullable(),
    landing_attempt: z.boolean().nullable(),
    landing_success: z.boolean().nullable(),
    landing_type: z.string().nullable(),
    landpad: z.string().nullable(),
});

export const LaunchSchema = z.object({
    fairings: FairingsSchema,
    links: LinksSchema,
    static_fire_date_utc: z.string().datetime().nullable(),
    static_fire_date_unix: z.number().nullable(),
    tdb: z.boolean(),
    net: z.boolean(),
    window: z.number().nullable(),
    rocket: z.string().nullable(),
    success: z.boolean().nullable(),
    failures: z.array(z.any()), // The sample shows an empty array, type can be refined if structure is known
    details: z.string().nullable(),
    crew: z.array(z.string()),
    ships: z.array(z.string()),
    capsules: z.array(z.string()),
    payloads: z.array(z.string()),
    launchpad: z.string(),
    auto_update: z.boolean(),
    flight_number: z.number(),
    name: z.string(),
    date_utc: z.string().datetime(),
    date_unix: z.number(),
    date_local: z.string(),
    date_precision: z.string(),
    upcoming: z.boolean(),
    cores: z.array(CoreSchema),
    id: z.string(),
});

export type Launch = z.infer<typeof LaunchSchema>;

export const LaunchesSchema = z.array(LaunchSchema);
export type Launches = z.infer<typeof LaunchesSchema>;

export const formatLaunches = (launches: Launches) => {
    return launches.map((launch) => {
        return `${launch.name} - ${launch.date_utc} (ID: ${launch.id})`;
    }).join("\n");
}