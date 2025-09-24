import { getString, setItem } from "@/store/mmkv";
import { fetcher } from "./fetcher";
import { AutoLoginBody } from "@/type/auth";
import { User } from "@/type/user";
import { useAuthStore } from "@/store/auth";

export async function autoLogin(callback: (user: User) => void) {
    const access = getString("access_token");
    const refresh = getString("refresh_token");

    if (!access || !refresh) {
        return { success: false, user: null };
    }

    console.log("AutoLogin started with tokens:", { access, refresh });

    try {
        const data: any = await fetcher("/api/users/verify-access/", {
            body: {
                access_token: access,
                refresh_token: refresh,
            } as AutoLoginBody,
            method: "POST",
        });

        const mappedUser: User = {
            id: data.user.id,
            name: data.user.name ?? "",
            email: data.user.email,
            date_of_birth: data.user.date_of_birth ?? "",
            image: data.user.image,
            phone: data.user.phone,
        };

        if (data.access) {
            setItem("access_token", data.access);
            callback(mappedUser);
        }

        return { success: true, user: mappedUser };
    } catch (err) {
        console.log("AutoLogin failed:", err);
        return { success: false, user: null };
    }
}
