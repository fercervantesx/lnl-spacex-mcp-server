import { z } from "zod";

const CrewMemberSchema = z.object({
  name: z.string(),
  agency: z.string(),
  image: z.string(),
  wikipedia: z.string(),
  launches: z.array(z.string()),
  status: z.string(),
  id: z.string(),
});

const CrewSchema = z.array(CrewMemberSchema);

export type Crew = z.infer<typeof CrewSchema>;

export const formatCrew = (crew: Crew) => {
  return crew
    .map((crew) => {
      return `${crew.name}, ${crew.agency} - Status: ${crew.status}`;
    })
    .join("\n");
};
