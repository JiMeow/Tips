import { db } from "@/server/db";
import { type UpdateTipsParams } from "@/server/service";
import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    switch (req.method) {
        case "GET":
            return await getTips(req, res);
        case "POST":
            return await createTips(req, res);
        case "PATCH":
            return await updateTips(req, res);
        case "DELETE":
            return await deleteTips(req, res);
        default:
            return res.status(405).end();
    }
}

async function getTips(req: NextApiRequest, res: NextApiResponse)
{
    try {
        const tips = await db.tip.findMany({
            orderBy: {
                id: "desc"
            },
            where: {
                OR: [
                    {
                        deleted: false
                    },
                    {
                        deleted: {
                            isSet: false
                        }
                    }
                ]
            }
        });
        return res.status(200).json(tips);
    } catch(err){
        console.error(err);
        return res.status(500).end();
    }
}

async function createTips(req: NextApiRequest, res: NextApiResponse)
{
    try {
        const { content, writerName, userId } = req.body as { content: string, writerName: string, userId?: string };
        if (!content || !writerName) return res.status(400).end()

        const tip = await db.tip.create({
            data: {
                content,
                writerName,
                userId
            }
        });

        return res.status(201).json(tip);
    } catch(err){
        console.error(err);
        return res.status(500).end();
    }
}

async function updateTips(req: NextApiRequest, res: NextApiResponse)
{
    try {
        const { id, approved, rejected, content, writerName } = req.body as UpdateTipsParams;
        if (!id) return res.status(400).end()
        const tip = await db.tip.update({
            where: {
                id
            },
            data: {
                approved,
                rejected,
                content,
                writerName
            }
        });
        
        return res.status(200).json(tip);
    } catch(err){
        console.error(err);
        return res.status(500).end();
    }
}

async function deleteTips(req: NextApiRequest, res: NextApiResponse)
{
    try {
        const { id } = req.body as { id: string };
        if (!id) return res.status(400).end()
        const tip = await db.tip.update({
            where: {
                id
            },
            data: {
                deleted: true
            }
        });
        
        return res.status(200).json(tip);
    } catch(err){
        console.error(err);
        return res.status(500).end();
    }
}