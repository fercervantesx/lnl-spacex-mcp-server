import { z } from "zod";

export const CompanySchema = z.object({
    headquarters: z.object({
        address: z.string(),
        city: z.string(),
        state: z.string(),
    }),
    links: z.object({
        website: z.string(),
        flickr: z.string(),
        twitter: z.string(),
        elon_twitter: z.string(),
    }),
    name: z.string(),
    founder: z.string(),
    founded: z.number(),
    employees: z.number(),
    vehicles: z.number(),
    launch_sites: z.number(),
    test_sites: z.number(),
    ceo: z.string(),
    cto: z.string(),
    coo: z.string(),
    cto_propulsion: z.string(),
    valuation: z.number(),
    summary: z.string(),
    id: z.string(),
});

export type Company = z.infer<typeof CompanySchema>;

export const formatCompany = (company: Company) => {
    return `${company.name}
Founded: ${company.founded} by ${company.founder}
CEO: ${company.ceo} | CTO: ${company.cto} | COO: ${company.coo}
Employees: ${company.employees} | Valuation: $${company.valuation.toLocaleString()}
Headquarters: ${company.headquarters.address}, ${company.headquarters.city}, ${company.headquarters.state}
Launch Sites: ${company.launch_sites} | Test Sites: ${company.test_sites} | Vehicles: ${company.vehicles}

${company.summary}

Website: ${company.links.website}`;
}
