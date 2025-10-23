import { z } from "zod";

export const CapsuleSchema = z.object({
    reuse_count: z.number(),
    water_landings: z.number(),
    land_landings: z.number(),
    last_update: z.string().nullable(),
    launches: z.array(z.string()),
    serial: z.string(),
    status: z.string(),
    type: z.string(),
    id: z.string(),
});

export type Capsule = z.infer<typeof CapsuleSchema>;
export const CapsulesSchema = z.array(CapsuleSchema);
export type Capsules = z.infer<typeof CapsulesSchema>;

export const formatCapsules = (capsules: Capsules) => {
    return capsules.map((capsule) => {
        return `${capsule.serial} (${capsule.type}) - Status: ${capsule.status} - Reused ${capsule.reuse_count} times (ID: ${capsule.id})`;
    }).join("\n");
}
