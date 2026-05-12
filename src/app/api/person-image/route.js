import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    if (!name) {
        return NextResponse.json({ image: null });
    }

    try {
        // Ask Wikipedia for the page summary -- it includes a thumbnail image
        const encoded = encodeURIComponent(name);
        const res = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`,
            {
                headers: {
                    // Wikipedia asks that you identify your app in the user agent
                    "User-Agent": "BuddyApp/1.0 (https://buddy.app)"
                }
            }
        );

        if (!res.ok) {
            return NextResponse.json({ image: null });
        }

        const data = await res.json();

        // Wikipedia returns thumbnail and originalimage -- prefer the larger one
        const image = data.originalimage?.source || data.thumbnail?.source || null;

        return NextResponse.json({ image });

    } catch {
        return NextResponse.json({ image: null });
    }
}