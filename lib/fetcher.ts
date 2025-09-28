import { getString } from "@/store/mmkv";

export const BASE_URL = "https://ape-in-eft.ngrok-free.app";

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
            finalHeaders["Authorization"] = `Bearer ${token}`;
        }
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: finalHeaders,
        body: body ? JSON.stringify(body) : undefined,
        credentials: "include",
    });

    let data: any;
    try {
        data = await res.json();
    } catch {
        data = null;
    }
    // console.log("Final Header: ", finalHeaders);
    console.log("DATA", data);

    if (!res.ok) {
        throw new ApiError(res.status, data);
    }

    return data as T;
}
