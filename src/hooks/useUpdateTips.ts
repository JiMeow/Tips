import { queryClient } from "@/pages/_app";
import { updateTips } from "@/server/service";
import { useMutation } from "@tanstack/react-query";

type UpdateTipsParams = {
    onSuccess?: () => void;
};

export const useUpdateTip = (params?: UpdateTipsParams) => {
    return useMutation({
        mutationFn: updateTips,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['useAllTips'] })
            params?.onSuccess && params.onSuccess();
        },
    })
};