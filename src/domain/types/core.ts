import { z } from "zod";

export const CoreSchema = z.object({
    block: z.number().nullable(),
    reuse_count: z.number(),
    rtls_attempts: z.number(),
    rtls_landings: z.number(),
    asds_attempts: z.number(),
    asds_landings: z.number(),
    last_update: z.string().nullable(),
    launches: z.array(z.string()),
    serial: z.string(),
    status: z.string(),
    id: z.string(),
});

export type Core = z.infer<typeof CoreSchema>;
export const CoresSchema = z.array(CoreSchema);
export type Cores = z.infer<typeof CoresSchema>;

export const formatCores = (cores: Cores) => {
    return cores.map((core) => {
        return `${core.serial} - Status: ${core.status} - Block ${core.block ?? 'N/A'} - Reused ${core.reuse_count} times - RTLS: ${core.rtls_landings}/${core.rtls_attempts}, ASDS: ${core.asds_landings}/${core.asds_attempts} (ID: ${core.id})`;
    }).join("\n");
}
