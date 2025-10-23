import { z } from "zod";

export const LaunchpadSchema = z.object({
    name: z.string(),
    full_name: z.string(),
    locality: z.string(),
    region: z.string(),
    timezone: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    launch_attempts: z.number(),
    launch_successes: z.number(),
    rockets: z.array(z.string()),
    launches: z.array(z.string()),
    status: z.string(),
    id: z.string(),
    details: z.string().optional(),
});

export type Launchpad = z.infer<typeof LaunchpadSchema>;
export const LaunchpadsSchema = z.array(LaunchpadSchema);
export type Launchpads = z.infer<typeof LaunchpadsSchema>;

export const formatLaunchpads = (launchpads: Launchpads) => {
    return launchpads.map((launchpad) => {
        return `${launchpad.full_name} (${launchpad.name}) - ${launchpad.locality}, ${launchpad.region}
  Status: ${launchpad.status} | Timezone: ${launchpad.timezone}
  Launches: ${launchpad.launch_successes}/${launchpad.launch_attempts} successful
  Location: ${launchpad.latitude}, ${launchpad.longitude} (ID: ${launchpad.id})`;
    }).join("\n\n");
}
