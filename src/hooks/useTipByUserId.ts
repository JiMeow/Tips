import { getTipsByUserId } from "@/server/service";
import { useQuery } from "@tanstack/react-query";

type UseTipByUserIdParams = {
    userId: string;
};

export const useTipByUserId = (params: UseTipByUserIdParams) => {
    return useQuery({
        queryKey: ["useTipsByUserId"],
        queryFn: () => getTipsByUserId({userId: params.userId}),
        refetchInterval: 10000,
    })
};