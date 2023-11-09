import { createTips as createTip } from "@/server/service";
import { useMutation } from "@tanstack/react-query";

type CreateTipsParams = {
    onSuccess?: () => void;
};

export const useCreateTip = (params?: CreateTipsParams) => {
    return useMutation({
        mutationFn: createTip,
        onSuccess: () => {
            params?.onSuccess && params.onSuccess();
        },
    })
};