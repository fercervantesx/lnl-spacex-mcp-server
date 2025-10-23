import { z } from "zod";

export const CrewSchema = z.object({
    name: z.string(),
    agency: z.string(),
    image: z.string(),
    wikipedia: z.string(),
    launches: z.array(z.string()),
    status: z.string(),
    id: z.string(),
});

export type Crew = z.infer<typeof CrewSchema>;
export const CrewsSchema = z.array(CrewSchema);
export type Crews = z.infer<typeof CrewsSchema>;

export const formatCrews = (crews: Crews) => {
    return crews.map((crew) => {
        return `${crew.name} (${crew.agency}) - Status: ${crew.status} - ${crew.launches.length} launches (ID: ${crew.id})`;
    }).join("\n");
}
