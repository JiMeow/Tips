import { queryClient } from "@/pages/_app";
import { updateTips } from "@/server/service";
import { useMutation } from "@tanstack/react-query";

type UpdateTipParams = {
    onSuccess?: () => void;
};

export const useUpdateTip = (params?: UpdateTipParams) => {
    return useMutation({
        mutationFn: updateTips,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['useAllTips'] })
            void queryClient.invalidateQueries({ queryKey: ['useTipsByUserId'] })
            params?.onSuccess && params.onSuccess();
        },
    })
};