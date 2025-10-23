# SpaceX MCP Server

A Model Context Protocol (MCP) server that provides access to SpaceX launch data.

## Installation

```bash
npm install
npm run build
```

## Usage

This server is designed to be used with MCP clients. It provides tools to query SpaceX launch information from the official SpaceX API.

### Available Tools

- `get_launches` - Retrieves all SpaceX launches with their names, dates, and IDs

## Configuration

Add to your MCP client configuration:

```json
{
  "mcpServers": {
    "spacex": {
      "command": "node",
      "args": ["/path/to/spacex-mcp-server/build/index.js"]
    }
  }
}
```

## Development

```bash
npm run build
```

## Data Source

Uses the [SpaceX API v4](https://github.com/r-spacex/SpaceX-API)
