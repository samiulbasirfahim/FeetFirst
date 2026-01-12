import { getString } from "@/store/mmkv";

// export const BASE_URL = "https://admin.feetf1rst.com";
export const BASE_URL = "https://hecticly-rural-kittie.ngrok-free.dev";

export class ApiError extends Error {
    public status: number;
    public data: any;

    constructor(status: number, data: any) {
        super("API Error");
        this.status = status;
        this.data = data;
    }
}

type Options = {
    method?: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
    body?: any;
    headers?: Record<string, string>;
    auth?: boolean;
};

export async function fetcher<T>(
    endpoint: string,
    options: Options = {},
): Promise<T> {
    const { method = "GET", body, headers = {}, auth = false } = options;

    const finalHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        ...headers,
    };

    if (auth) {
        const token = getString("access_token");
        if (token) {
            finalHeaders["X-Authorization"] = `Bearer ${token}`;
            finalHeaders["Authorization"] = `Bearer ${token}`;
        }
    }

    let res: any;

    try {
        res = await fetch(`${BASE_URL}${endpoint}`, {
            method,
            headers: finalHeaders,
            body: body ? JSON.stringify(body) : undefined,
            credentials: "include",
        });
    } catch (err) {
        console.log("THIS IS THE ERR: ", err);
    }

    let data: any;
    try {
        data = await res.json();
    } catch {
        data = null;
    }

    if (!res.ok) {
        console.error("[API ERROR]", {
            endpoint,
            method,
            status: res.status,
            statusText: res.statusText,
            response: data,
        });

        throw new ApiError(res.status, data);
    }

    console.log("[API SUCCESS]", {
        endpoint,
        method,
        status: res.status,
        response: data,
    });

    return data as T;
}
