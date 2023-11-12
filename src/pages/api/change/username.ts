import { type NextApiRequest, type NextApiResponse } from "next";

import { compare } from "bcrypt";
import { db } from "@/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
       return res.status(405).end(); 
    }

    try {
        const {username:email, password, newUsername } = req.body as {username:string, password: string, newUsername: string};

        const existingUser = await db.user.findUnique({
            where: {
                email
            }
        });

        if (!existingUser) {
            return res.status(422).json({error: 'Email is not exists!'});
        }
 
        const isCorrectPassword = await compare(password, existingUser.hashedPassword ?? "")

        if (!isCorrectPassword) {
            return res.status(422).json({error: 'Invalid email or password!'});
        }

        const user = await db.user.update({
            where: {
                email
            },
            data: {
                email: newUsername
            }
        });


        return res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        return res.status(400).end();
    }
};