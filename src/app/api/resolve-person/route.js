import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    if (!name) return NextResponse.json({ resolvedName: name });

    try {
        const encoded = encodeURIComponent(name);

        // Step 1 -- search for the term to get the best matching page title
        const searchRes = await fetch(
            `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encoded}&format=json&srlimit=1&origin=*`,
            { headers: { "User-Agent": "BuddyApp/1.0 (https://buddy.app)" } }
        );

        if (!searchRes.ok) return NextResponse.json({ resolvedName: name });

        const searchData = await searchRes.json();
        const topTitle = searchData.query?.search?.[0]?.title;

        if (!topTitle) return NextResponse.json({ resolvedName: name });

        // Step 2 -- fetch the summary of that page to get the clean display title
        const summaryRes = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topTitle)}`,
            { headers: { "User-Agent": "BuddyApp/1.0 (https://buddy.app)" } }
        );

        if (!summaryRes.ok) return NextResponse.json({ resolvedName: topTitle });

        const summaryData = await summaryRes.json();

        // displaytitle is the proper human-readable name e.g. "Lionel Messi"
        const resolvedName = summaryData.title || topTitle;

        return NextResponse.json({ resolvedName });

    } catch {
        return NextResponse.json({ resolvedName: name });
    }
}