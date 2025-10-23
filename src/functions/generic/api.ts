// Helper function for making SpaceX API requests

export async function makeSpaceXApiRequest<T>(url: string): Promise<T | null> {
    const headers = {
        "User-Agent": "spacex-mcp-server",
        "Content-Type": "application/json",
    }

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return data as T;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

