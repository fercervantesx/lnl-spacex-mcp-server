import { z } from "zod";

export const StarlinkSchema = z.object({
    spaceTrack: z.object({
        CCSDS_OMM_VERS: z.string(),
        COMMENT: z.string(),
        CREATION_DATE: z.string(),
        ORIGINATOR: z.string(),
        OBJECT_NAME: z.string(),
        OBJECT_ID: z.string(),
        CENTER_NAME: z.string(),
        REF_FRAME: z.string(),
        TIME_SYSTEM: z.string(),
        MEAN_ELEMENT_THEORY: z.string(),
        EPOCH: z.string(),
        MEAN_MOTION: z.number(),
        ECCENTRICITY: z.number(),
        INCLINATION: z.number(),
        RA_OF_ASC_NODE: z.number(),
        ARG_OF_PERICENTER: z.number(),
        MEAN_ANOMALY: z.number(),
        EPHEMERIS_TYPE: z.number(),
        CLASSIFICATION_TYPE: z.string(),
        NORAD_CAT_ID: z.number(),
        ELEMENT_SET_NO: z.number(),
        REV_AT_EPOCH: z.number(),
        BSTAR: z.number(),
        MEAN_MOTION_DOT: z.number(),
        MEAN_MOTION_DDOT: z.number(),
        SEMIMAJOR_AXIS: z.number(),
        PERIOD: z.number(),
        APOAPSIS: z.number(),
        PERIAPSIS: z.number(),
        OBJECT_TYPE: z.string(),
        RCS_SIZE: z.string().nullable(),
        COUNTRY_CODE: z.string(),
        LAUNCH_DATE: z.string(),
        SITE: z.string(),
        DECAY_DATE: z.string().nullable(),
        DECAYED: z.number(),
        FILE: z.number(),
        GP_ID: z.number(),
        TLE_LINE0: z.string(),
        TLE_LINE1: z.string(),
        TLE_LINE2: z.string(),
    }),
    version: z.string().optional(),
    launch: z.string().optional(),
    longitude: z.number().nullable().optional(),
    latitude: z.number().nullable().optional(),
    height_km: z.number().nullable().optional(),
    velocity_kms: z.number().nullable().optional(),
    id: z.string(),
});

export type Starlink = z.infer<typeof StarlinkSchema>;
export const StarlinksSchema = z.array(StarlinkSchema);
export type Starlinks = z.infer<typeof StarlinksSchema>;

export const formatStarlinks = (starlinks: Starlinks) => {
    return starlinks.map((starlink) => {
        const loc = starlink.latitude && starlink.longitude ? 
            `Location: ${starlink.latitude.toFixed(2)}, ${starlink.longitude.toFixed(2)}` : 
            'Location: N/A';
        const height = starlink.height_km ? `Height: ${starlink.height_km.toFixed(2)} km` : 'Height: N/A';
        return `${starlink.spaceTrack.OBJECT_NAME} (${starlink.version ?? 'Unknown version'})
  NORAD ID: ${starlink.spaceTrack.NORAD_CAT_ID} | ${loc}
  ${height} | Inclination: ${starlink.spaceTrack.INCLINATION.toFixed(2)}°
  Period: ${starlink.spaceTrack.PERIOD.toFixed(2)} min (ID: ${starlink.id})`;
    }).join("\n\n");
}
