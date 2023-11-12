import { axiosInstance } from "./axios"
import { type Tip } from "@prisma/client";

/// Tips

type CreateTipsParams = {
    content: string;
    writerName: string;
    userId?: string;
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

export type GetTipsByUserIdParams = {
    userId: string;
};

export type GetTipsByUserIdResponse = Tip[];

export const getTipsByUserId = async (params : GetTipsByUserIdParams) : Promise<GetTipsByUserIdResponse> => {
    const { data } = await axiosInstance.get<GetTipsByUserIdResponse>(`/api/tip/${params.userId}`);
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

export type DeleteTipsParams = {
    id: string;
};

export type DeleteTipsResponse = Tip;

export const deleteTips = async (params : DeleteTipsParams) : Promise<DeleteTipsResponse> => {
    const { data } = await axiosInstance.delete<DeleteTipsResponse>("/api/tip", { data: params });
    return data
}

/// Auth

export type RegisterParams = {
    email: string;
    password: string;
};

export type RegisterResponse = {
    id: string;
    email: string;
    emailVerified: Date;
};

export const register = async (params : RegisterParams) : Promise<RegisterResponse> => {
    const { data } = await axiosInstance.post<RegisterResponse>("/api/register", params);
    return data
}

export type ChangePasswordParams = {
    username: string;
    password: string;
    newPassword: string;
};

export type ChangePasswordResponse = {
    id: string;
    email: string;
    emailVerified: Date;
    error?: string 
};

export const changePassword = async (params : ChangePasswordParams) : Promise<ChangePasswordResponse> => {
    const { data } = await axiosInstance.post<ChangePasswordResponse>("/api/change/password", params);
    return data
}

export type ChangeUsernameParams = {
    username: string;
    password: string;
    newUsername: string;
};

export type ChangeUsernameResponse = {
    id: string;
    email: string;
    emailVerified: Date;
    error?: string 
};

export const changeUsername = async (params : ChangeUsernameParams) : Promise<ChangeUsernameResponse> => {
    const { data } = await axiosInstance.post<ChangeUsernameResponse>("/api/change/username", params);
    return data
}
