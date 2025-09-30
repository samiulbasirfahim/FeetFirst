import { useMutation } from "@tanstack/react-query";
import { fetcher } from "../fetcher";
import { ContactUsBody } from "@/type/contact-us";

export function useContactUs() {
    return useMutation({
        mutationFn: (body: ContactUsBody) =>
            fetcher("/api/contactus/", {
                method: "POST",
                auth: true,
                body,
            }),
    });
}
