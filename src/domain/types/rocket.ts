import { z } from "zod";

const MeasurementSchema = z.object({
    meters: z.number().nullable(),
    feet: z.number().nullable(),
});

const MassSchema = z.object({
    kg: z.number(),
    lb: z.number(),
});

const ThrustSchema = z.object({
    kN: z.number(),
    lbf: z.number(),
});

export const RocketSchema = z.object({
    height: MeasurementSchema,
    diameter: MeasurementSchema,
    mass: MassSchema,
    first_stage: z.object({
        thrust_sea_level: ThrustSchema,
        thrust_vacuum: ThrustSchema,
        reusable: z.boolean(),
        engines: z.number(),
        fuel_amount_tons: z.number(),
        burn_time_sec: z.number().nullable(),
    }),
    second_stage: z.object({
        thrust: ThrustSchema,
        payloads: z.object({
            composite_fairing: z.object({
                height: MeasurementSchema,
                diameter: MeasurementSchema,
            }).optional(),
            option_1: z.string().optional(),
        }),
        reusable: z.boolean(),
        engines: z.number(),
        fuel_amount_tons: z.number(),
        burn_time_sec: z.number().nullable(),
    }),
    engines: z.object({
        isp: z.object({
            sea_level: z.number(),
            vacuum: z.number(),
        }),
        thrust_sea_level: ThrustSchema,
        thrust_vacuum: ThrustSchema,
        number: z.number(),
        type: z.string(),
        version: z.string(),
        layout: z.string().nullable(),
        engine_loss_max: z.number().nullable(),
        propellant_1: z.string(),
        propellant_2: z.string(),
        thrust_to_weight: z.number(),
    }),
    landing_legs: z.object({
        number: z.number(),
        material: z.string().nullable(),
    }),
    payload_weights: z.array(z.object({
        id: z.string(),
        name: z.string(),
        kg: z.number(),
        lb: z.number(),
    })),
    flickr_images: z.array(z.string()),
    name: z.string(),
    type: z.string(),
    active: z.boolean(),
    stages: z.number(),
    boosters: z.number(),
    cost_per_launch: z.number(),
    success_rate_pct: z.number(),
    first_flight: z.string(),
    country: z.string(),
    company: z.string(),
    wikipedia: z.string(),
    description: z.string(),
    id: z.string(),
});

export type Rocket = z.infer<typeof RocketSchema>;
export const RocketsSchema = z.array(RocketSchema);
export type Rockets = z.infer<typeof RocketsSchema>;

export const formatRockets = (rockets: Rockets) => {
    return rockets.map((rocket) => {
        return `${rocket.name} (${rocket.type})
  Status: ${rocket.active ? 'Active' : 'Inactive'} | First Flight: ${rocket.first_flight}
  Stages: ${rocket.stages} | Success Rate: ${rocket.success_rate_pct}%
  Cost per Launch: $${rocket.cost_per_launch.toLocaleString()}
  Height: ${rocket.height.meters}m | Mass: ${rocket.mass.kg.toLocaleString()}kg
  ${rocket.description.substring(0, 100)}... (ID: ${rocket.id})`;
    }).join("\n\n");
}
