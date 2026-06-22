import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();

  const client = new Client({ name: "mytrine-dashboard", version: "1.0.0" });

  const transport = new StdioClientTransport({
    command:
      "C:\\Users\\Sam Aravind\\mytrine\\mytrine-mcp-server\\node_modules\\.bin\\tsx.cmd",
    args: ["src/server.ts"],
    cwd: "C:\\Users\\Sam Aravind\\mytrine\\mytrine-mcp-server",
  });

  try {
    await client.connect(transport);

    const result = await client.callTool({
      name: "placeFoodOrder",
      arguments: {
        orderDraftId: body.orderDraftId,
        userApproved: Boolean(body.userApproved),
      },
    });

    await client.close();
    return NextResponse.json({ success: true, result });
  } catch {
    await client.close().catch(() => {});
    return NextResponse.json(
      { success: false, error: "MCP place order failed" },
      { status: 500 }
    );
  }
}