import { db } from "@/server/db";
import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method === "GET") {
        try {
            const tips = await db.tip.findMany({
                orderBy: {
                    id: "desc"
                }
            });
            return res.status(200).json(tips);
        } catch(err){
            console.error(err);
            return res.status(500).end();
        }
    }
    else if (req.method === "POST") {
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
    return res.status(405).end();
}