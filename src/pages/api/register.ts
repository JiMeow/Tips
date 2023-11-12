import { type NextApiRequest, type NextApiResponse } from "next";

import { hash } from "bcrypt";
import { db } from "@/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
       return res.status(405).end(); 
    }

    try {
        const { email, password } = req.body as { email: string, password: string};

        const existingUser = await db.user.findUnique({
            where: {
                email
            }
        });

        if (existingUser) {
            return res.status(422).json({error: 'Email already exists!'});
        }

        const hashedPassword = await hash(password, 12);
        const user = await db.user.create({
            data: {
                email,
                hashedPassword,
                emailVerified: new Date(),
            }
        });

        return res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        return res.status(400).end();
    }
};