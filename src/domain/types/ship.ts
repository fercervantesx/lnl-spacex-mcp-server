import { z } from "zod";

export const ShipSchema = z.object({
    legacy_id: z.string().nullable(),
    model: z.string().nullable(),
    type: z.string(),
    roles: z.array(z.string()),
    imo: z.number().nullable(),
    mmsi: z.number().nullable(),
    abs: z.number().nullable(),
    class: z.number().nullable(),
    mass_kg: z.number().nullable(),
    mass_lbs: z.number().nullable(),
    year_built: z.number().nullable(),
    home_port: z.string(),
    status: z.string().nullable(),
    speed_kn: z.number().nullable(),
    course_deg: z.number().nullable(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
    last_ais_update: z.string().nullable(),
    link: z.string(),
    image: z.string().nullable(),
    launches: z.array(z.string()),
    name: z.string(),
    active: z.boolean(),
    id: z.string(),
});

export type Ship = z.infer<typeof ShipSchema>;
export const ShipsSchema = z.array(ShipSchema);
export type Ships = z.infer<typeof ShipsSchema>;

export const formatShips = (ships: Ships) => {
    return ships.map((ship) => {
        const status = ship.active ? 'Active' : 'Inactive';
        const location = ship.latitude && ship.longitude ? `Location: ${ship.latitude}, ${ship.longitude}` : 'Location: Unknown';
        return `${ship.name} (${ship.type}) - ${status}
  Home Port: ${ship.home_port} | Year Built: ${ship.year_built ?? 'Unknown'}
  Roles: ${ship.roles.join(', ')}
  ${location}
  Launches: ${ship.launches.length} (ID: ${ship.id})`;
    }).join("\n\n");
}
