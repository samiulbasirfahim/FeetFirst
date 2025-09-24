import { User } from "./user";

export type LoginForm = {
    email: string;
    password: string;
};

export type RegisterForm = {
    name: string;
    email: string;
    password: string;
    date_of_birth: string;
    language: string;
};

export type OtpRequest = {
    email: string;
    task: "reset_password";
};


export type VerifyOtpRequest = {
    email: string;
    otp: string;
};


export type AutoLoginBody = {
    access_token: string;
    refresh_token: string;
}
