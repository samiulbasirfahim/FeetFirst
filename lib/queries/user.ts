import { useMutation } from "@tanstack/react-query";
import { fetcher } from "../fetcher";
import { UpdateUser } from "@/type/user";


export function useUpdateUser() {
    return useMutation({
        mutationFn: (data: UpdateUser) =>
            fetcher("/api/users/update/", {
                method: "PATCH",
                auth: true,
                body: data,
            }),
    });
}
