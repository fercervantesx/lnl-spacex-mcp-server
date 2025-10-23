import { z } from "zod";

export const HistorySchema = z.object({
    title: z.string(),
    event_date_utc: z.string().datetime(),
    event_date_unix: z.number(),
    details: z.string(),
    links: z.object({
        article: z.string().nullable(),
    }),
    id: z.string(),
});

export type History = z.infer<typeof HistorySchema>;
export const HistoriesSchema = z.array(HistorySchema);
export type Histories = z.infer<typeof HistoriesSchema>;

export const formatHistories = (histories: Histories) => {
    return histories.map((history) => {
        return `${history.event_date_utc.split('T')[0]} - ${history.title}\n  ${history.details}${history.links.article ? `\n  Article: ${history.links.article}` : ''}`;
    }).join("\n\n");
}
