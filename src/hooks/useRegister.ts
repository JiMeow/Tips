import { register } from "@/server/service";
import { useMutation } from "@tanstack/react-query";

type RegisterParams = {
    onSuccess?: () => void;
};

export const useRegister = (params?: RegisterParams) => {
    return useMutation({
        mutationFn: register,
        onSuccess: () => {
            params?.onSuccess && params.onSuccess();
        },
    })
};