import {getTips } from "@/server/service";
import { useQuery } from "@tanstack/react-query";

export const useAllTips = () => {
    return useQuery({
        queryKey: ["useAllTips"],
        queryFn: getTips,
    })
};