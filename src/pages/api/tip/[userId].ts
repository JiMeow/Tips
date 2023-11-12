import { db } from "@/server/db";
import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    switch (req.method) {
        case "GET":
            return await getTips(req, res);
        default:
            return res.status(405).end();
    }
}

async function getTips(req: NextApiRequest, res: NextApiResponse)
{
    try {
        const { userId } = req.query;
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
                    },
                ],
                AND: [
                    {
                        userId: userId as string
                    }
                ],
            }
        });
        return res.status(200).json(tips);
    } catch(err){
        console.error(err);
        return res.status(500).end();
    }
}
