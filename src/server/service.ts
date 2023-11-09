import { axiosInstance } from "./axios"
import { type Tip } from "@prisma/client";


type CreateTipsParams = {
    content: string;
    writerName: string;
};

type CreateTipsResponse = Tip;

export const createTips = async (params : CreateTipsParams) : Promise<CreateTipsResponse> => {
    const { data } = await axiosInstance.post<CreateTipsResponse>("/api/tip", params);
    return data
} 


type GetTipsResponse = Tip[];

export const getTips = async () : Promise<GetTipsResponse> => {
    const { data } = await axiosInstance.get<GetTipsResponse>("/api/tip");
    return data
}