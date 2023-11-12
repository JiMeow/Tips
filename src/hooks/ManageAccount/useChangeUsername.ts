import { changeUsername } from "@/server/service";
import { useMutation } from "@tanstack/react-query";

type ChangeUsernameParams = {
    onSuccess?: () => void;
};

export const useChangeUsername = (params?: ChangeUsernameParams) => {
    return useMutation({
        mutationFn: changeUsername,
        onSuccess: () => {
            params?.onSuccess && params.onSuccess();
        },
    })
};