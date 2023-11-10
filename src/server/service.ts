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

export type UpdateTipsParams = {
    id: string;
    approved?: boolean;
    rejected?: boolean;
    content?: string;
    writerName?: string;
};

export type UpdateTipsResponse = Tip;

export const updateTips = async (params : UpdateTipsParams) : Promise<UpdateTipsResponse> => {
    const { data } = await axiosInstance.patch<UpdateTipsResponse>("/api/tip", params);
    return data
}