import { db } from "@/server/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method === "GET") return res.status(200).json({"message": "Hello World"});
    if (req.method !== "POST") return res.status(405).end();

    try {
        const { content, writerName } = req.body as { content: string, writerName: string };
        if (!content || !writerName) return res.status(400).end()

        const tip = await db.tip.create({
            data: {
                content,
                writerName
            }
        });

        return res.status(201).json(tip);
    } catch(err){
        console.error(err);
        return res.status(500).end();
    }
}