import { queryClient } from "@/pages/_app";
import { createTips as createTip } from "@/server/service";
import { useMutation } from "@tanstack/react-query";

type CreateTipsParams = {
    onSuccess?: () => void;
};

export const useCreateTip = (params?: CreateTipsParams) => {
    return useMutation({
        mutationFn: createTip,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['useAllTips'] })
            params?.onSuccess && params.onSuccess();
        },
    })
};