import { z } from "zod";

export const PayloadSchema = z.object({
    dragon: z.object({
        capsule: z.string().nullable(),
        mass_returned_kg: z.number().nullable(),
        mass_returned_lbs: z.number().nullable(),
        flight_time_sec: z.number().nullable(),
        manifest: z.string().nullable(),
        water_landing: z.boolean().nullable(),
        land_landing: z.boolean().nullable(),
    }).nullable(),
    name: z.string(),
    type: z.string(),
    reused: z.boolean(),
    launch: z.string().nullable(),
    customers: z.array(z.string()),
    norad_ids: z.array(z.number()),
    nationalities: z.array(z.string()),
    manufacturers: z.array(z.string()),
    mass_kg: z.number().nullable(),
    mass_lbs: z.number().nullable(),
    orbit: z.string(),
    reference_system: z.string().nullable(),
    regime: z.string().nullable(),
    longitude: z.number().nullable(),
    semi_major_axis_km: z.number().nullable(),
    eccentricity: z.number().nullable(),
    periapsis_km: z.number().nullable(),
    apoapsis_km: z.number().nullable(),
    inclination_deg: z.number().nullable(),
    period_min: z.number().nullable(),
    lifespan_years: z.number().nullable(),
    epoch: z.string().nullable(),
    mean_motion: z.number().nullable(),
    raan: z.number().nullable(),
    arg_of_pericenter: z.number().nullable(),
    mean_anomaly: z.number().nullable(),
    id: z.string(),
});

export type Payload = z.infer<typeof PayloadSchema>;
export const PayloadsSchema = z.array(PayloadSchema);
export type Payloads = z.infer<typeof PayloadsSchema>;

export const formatPayloads = (payloads: Payloads) => {
    return payloads.map((payload) => {
        const mass = payload.mass_kg ? `${payload.mass_kg} kg` : 'N/A';
        const orbit = payload.orbit ? payload.orbit : 'Unknown';
        return `${payload.name} (${payload.type})
  Customers: ${payload.customers.join(', ')}
  Manufacturers: ${payload.manufacturers.join(', ')}
  Mass: ${mass} | Orbit: ${orbit}
  Reused: ${payload.reused ? 'Yes' : 'No'} (ID: ${payload.id})`;
    }).join("\n\n");
}
