import { changePassword } from "@/server/service";
import { useMutation } from "@tanstack/react-query";

type ChangePasswordParams = {
    onSuccess?: () => void;
};

export const useChangePassword = (params?: ChangePasswordParams) => {
    return useMutation({
        mutationFn: changePassword,
        onSuccess: () => {
            params?.onSuccess && params.onSuccess();
        },
    })
};