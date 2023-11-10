import { queryClient } from "@/pages/_app";
import { createTips as createTip } from "@/server/service";
import { useMutation } from "@tanstack/react-query";

type CreateTipParams = {
    onSuccess?: () => void;
};

export const useCreateTip = (params?: CreateTipParams) => {
    return useMutation({
        mutationFn: createTip,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['useAllTips'] })
            params?.onSuccess && params.onSuccess();
        },
    })
};