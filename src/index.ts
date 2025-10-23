import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { makeSpaceXApiRequest, makeSpaceXApiQueryRequest } from "./functions/generic/api.js";
import { formatLaunches, Launches } from "./domain/types/launch.js";
import { formatCapsules, Capsules } from "./domain/types/capsule.js";
import { formatCompany, Company } from "./domain/types/company.js";
import { formatCores, Cores } from "./domain/types/core.js";
import { formatCrews, Crews } from "./domain/types/crew.js";
import { formatHistories, Histories } from "./domain/types/history.js";
import { formatLandpads, Landpads } from "./domain/types/landpad.js";
import { formatLaunchpads, Launchpads } from "./domain/types/launchpad.js";
import { formatPayloads, Payloads } from "./domain/types/payload.js";
import { formatRoadster, Roadster } from "./domain/types/roadster.js";
import { formatRockets, Rockets } from "./domain/types/rocket.js";
import { formatShips, Ships } from "./domain/types/ship.js";
import { formatStarlinks, Starlinks } from "./domain/types/starlink.js";

const SPACEX_API_BASE = "https://api.spacexdata.com/v4";

const server = new McpServer({
    name: "spacex",
    version: "1.0.0",
    description: "A MCP server for SpaceX data",
    capabilities: {
        resources: {},
        tools: {},
    }
});

server.tool("get_launches", "Get all SpaceX launches", {}, async () => {
    const launchesUrl = `${SPACEX_API_BASE}/launches`;
    const launchesData = await makeSpaceXApiRequest<Launches>(launchesUrl);

    if(!launchesData){
        return {
            content: [
                {
                    type: "text",
                    text: "Failed to retrieve launch data"
                }
            ]
        }
    }

    const formattedLaunches = formatLaunches(launchesData);

    return {
        content: [
            {
                type: "text",
                text: `These are the launches: \n\n ${formattedLaunches}`
            }
        ]
    }
});

server.tool("get_capsules", "Get all SpaceX capsules", {}, async () => {
    const data = await makeSpaceXApiRequest<Capsules>(`${SPACEX_API_BASE}/capsules`);
    if(!data) return { content: [{ type: "text", text: "Failed to retrieve capsule data" }] };
    return { content: [{ type: "text", text: formatCapsules(data) }] };
});

server.tool("get_company", "Get SpaceX company information", {}, async () => {
    const data = await makeSpaceXApiRequest<Company>(`${SPACEX_API_BASE}/company`);
    if(!data) return { content: [{ type: "text", text: "Failed to retrieve company data" }] };
    return { content: [{ type: "text", text: formatCompany(data) }] };
});

server.tool("get_cores", "Get all SpaceX rocket cores", {}, async () => {
    const data = await makeSpaceXApiRequest<Cores>(`${SPACEX_API_BASE}/cores`);
    if(!data) return { content: [{ type: "text", text: "Failed to retrieve core data" }] };
    return { content: [{ type: "text", text: formatCores(data) }] };
});

server.tool("get_crew", "Get all SpaceX crew members", {}, async () => {
    const data = await makeSpaceXApiRequest<Crews>(`${SPACEX_API_BASE}/crew`);
    if(!data) return { content: [{ type: "text", text: "Failed to retrieve crew data" }] };
    return { content: [{ type: "text", text: formatCrews(data) }] };
});

server.tool("get_history", "Get SpaceX historical events", {}, async () => {
    const data = await makeSpaceXApiRequest<Histories>(`${SPACEX_API_BASE}/history`);
    if(!data) return { content: [{ type: "text", text: "Failed to retrieve history data" }] };
    return { content: [{ type: "text", text: formatHistories(data) }] };
});

server.tool("get_landpads", "Get all SpaceX landing pads", {}, async () => {
    const data = await makeSpaceXApiRequest<Landpads>(`${SPACEX_API_BASE}/landpads`);
    if(!data) return { content: [{ type: "text", text: "Failed to retrieve landpad data" }] };
    return { content: [{ type: "text", text: formatLandpads(data) }] };
});

server.tool("get_launchpads", "Get all SpaceX launch pads", {}, async () => {
    const data = await makeSpaceXApiRequest<Launchpads>(`${SPACEX_API_BASE}/launchpads`);
    if(!data) return { content: [{ type: "text", text: "Failed to retrieve launchpad data" }] };
    return { content: [{ type: "text", text: formatLaunchpads(data) }] };
});

server.tool("get_payloads", "Get all SpaceX payloads", {}, async () => {
    const data = await makeSpaceXApiRequest<Payloads>(`${SPACEX_API_BASE}/payloads`);
    if(!data) return { content: [{ type: "text", text: "Failed to retrieve payload data" }] };
    return { content: [{ type: "text", text: formatPayloads(data) }] };
});

server.tool("get_roadster", "Get Elon's Tesla Roadster location and orbit data", {}, async () => {
    const data = await makeSpaceXApiRequest<Roadster>(`${SPACEX_API_BASE}/roadster`);
    if(!data) return { content: [{ type: "text", text: "Failed to retrieve roadster data" }] };
    return { content: [{ type: "text", text: formatRoadster(data) }] };
});

server.tool("get_rockets", "Get all SpaceX rockets", {}, async () => {
    const data = await makeSpaceXApiRequest<Rockets>(`${SPACEX_API_BASE}/rockets`);
    if(!data) return { content: [{ type: "text", text: "Failed to retrieve rocket data" }] };
    return { content: [{ type: "text", text: formatRockets(data) }] };
});

server.tool("get_ships", "Get all SpaceX ships", {}, async () => {
    const data = await makeSpaceXApiRequest<Ships>(`${SPACEX_API_BASE}/ships`);
    if(!data) return { content: [{ type: "text", text: "Failed to retrieve ship data" }] };
    return { content: [{ type: "text", text: formatShips(data) }] };
});

server.tool("get_starlink", "Get Starlink satellite data", {}, async () => {
    const data = await makeSpaceXApiRequest<Starlinks>(`${SPACEX_API_BASE}/starlink`);
    if(!data) return { content: [{ type: "text", text: "Failed to retrieve Starlink data" }] };
    return { content: [{ type: "text", text: formatStarlinks(data) }] };
});

server.tool("get_latest_launch", "Get the most recent SpaceX launch", {}, async () => {
    const data = await makeSpaceXApiRequest<any>(`${SPACEX_API_BASE}/launches/latest`);
    if(!data) return { content: [{ type: "text", text: "Failed to retrieve latest launch" }] };
    return { content: [{ type: "text", text: formatLaunches([data]) }] };
});

server.tool("get_next_launch", "Get the next upcoming SpaceX launch", {}, async () => {
    const data = await makeSpaceXApiRequest<any>(`${SPACEX_API_BASE}/launches/next`);
    if(!data) return { content: [{ type: "text", text: "Failed to retrieve next launch" }] };
    return { content: [{ type: "text", text: formatLaunches([data]) }] };
});

server.tool("get_upcoming_launches", "Get upcoming SpaceX launches", {
    limit: z.number().optional().describe("Maximum number of launches to return (default: 10)")
}, async (params) => {
    const limit = params.limit ?? 10;
    const queryBody = {
        query: { upcoming: true },
        options: {
            limit,
            sort: { date_utc: "asc" }
        }
    };
    const data = await makeSpaceXApiQueryRequest<{ docs: Launches }>(`${SPACEX_API_BASE}/launches/query`, queryBody);
    if(!data || !data.docs) return { content: [{ type: "text", text: "Failed to retrieve upcoming launches" }] };
    return { content: [{ type: "text", text: formatLaunches(data.docs) }] };
});

server.tool("get_past_launches", "Get past SpaceX launches with optional date filtering", {
    start_date: z.string().optional().describe("Start date in ISO format (e.g., 2020-01-01T00:00:00.000Z)"),
    end_date: z.string().optional().describe("End date in ISO format (e.g., 2020-12-31T23:59:59.999Z)"),
    limit: z.number().optional().describe("Maximum number of launches to return (default: 10)")
}, async (params) => {
    const limit = params.limit ?? 10;
    const query: any = { upcoming: false };
    
    if (params.start_date || params.end_date) {
        query.date_utc = {};
        if (params.start_date) query.date_utc.$gte = params.start_date;
        if (params.end_date) query.date_utc.$lte = params.end_date;
    }
    
    const queryBody = {
        query,
        options: {
            limit,
            sort: { date_utc: "desc" }
        }
    };
    const data = await makeSpaceXApiQueryRequest<{ docs: Launches }>(`${SPACEX_API_BASE}/launches/query`, queryBody);
    if(!data || !data.docs) return { content: [{ type: "text", text: "Failed to retrieve past launches" }] };
    return { content: [{ type: "text", text: formatLaunches(data.docs) }] };
});

server.tool("search_launches", "Search SpaceX launches by text (searches name, details, and other text fields)", {
    search_text: z.string().describe("Text to search for in launch data"),
    limit: z.number().optional().describe("Maximum number of launches to return (default: 10)")
}, async (params) => {
    const limit = params.limit ?? 10;
    const queryBody = {
        query: {
            $text: { $search: params.search_text }
        },
        options: {
            limit,
            sort: { date_utc: "desc" }
        }
    };
    const data = await makeSpaceXApiQueryRequest<{ docs: Launches }>(`${SPACEX_API_BASE}/launches/query`, queryBody);
    if(!data || !data.docs) return { content: [{ type: "text", text: "Failed to search launches" }] };
    if(data.docs.length === 0) return { content: [{ type: "text", text: `No launches found matching "${params.search_text}"` }] };
    return { content: [{ type: "text", text: formatLaunches(data.docs) }] };
});

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("SpaceX MCP Server is running on stdio");
}

main().catch((error) => {
    console.error("Error starting server:", error);
    process.exit(1);
});