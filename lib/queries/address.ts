import { useMutation } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import type { CreateAddress, UpdateUser } from "@/type/user";

export function useUpdateUser() {
  return useMutation({
    mutationFn: (data: UpdateUser & { access_token: string }) =>
      fetcher("/api/users/update/", {
        method: "PATCH",
        auth: true,
        body: data,
      }),
  });
}

export function useCreateAddress() {
  return useMutation({
    mutationFn: (data: CreateAddress) =>
      fetcher("/api/users/addresses/", {
        method: "POST",
        auth: true,
      }),
  });
}
