import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { makeSpaceXApiRequest } from "./functions/generic/api.js";
import { formatLaunches, Launch, Launches } from "./domain/types/launch.js";
import { formatCrew, Crew } from "./domain/types/crew.js";

const SPACEX_API_BASE = "https://api.spacexdata.com/v4";

const server = new McpServer({
  name: "spacex",
  version: "1.0.0",
  description: "A MCP server for SpaceX data",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool("get_launches", "Get all SpaceX launches", {}, async () => {
  const launchesUrl = `${SPACEX_API_BASE}/launches`;
  const launchesData = await makeSpaceXApiRequest<Launches>(launchesUrl);

  if (!launchesData) {
    return {
      content: [
        {
          type: "text",
          text: "Failed to retrieve launch data",
        },
      ],
    };
  }

  const formattedLaunches = formatLaunches(launchesData);

  return {
    content: [
      {
        type: "text",
        text: `These are the launches: \n\n ${formattedLaunches}`,
      },
    ],
  };
});

server.tool("get_crew_all", "Get all SpaceX crew members", {}, async () => {
  const crewUrl = `${SPACEX_API_BASE}/crew`;
  const crewData = await makeSpaceXApiRequest<Crew>(crewUrl);

  if (!crewData) {
    return {
      content: [
        {
          type: "text",
          text: "Failed to retrieve crew data",
        },
      ],
    };
  }

  const formattedCrew = formatCrew(crewData);

  return {
    content: [
      {
        type: "text",
        text: `This is the crew data: \n\n ${formattedCrew}`,
      },
    ],
  };
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
