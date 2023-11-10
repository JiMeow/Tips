import { queryClient } from "@/pages/_app";
import { deleteTips } from "@/server/service";
import { useMutation } from "@tanstack/react-query";

type DeleteTipParams = {
    onSuccess?: () => void;
};

export const useDeleteTip = (params?: DeleteTipParams) => {
    return useMutation({
        mutationFn: deleteTips,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['useAllTips'] })
            params?.onSuccess && params.onSuccess();
        },
    })
};