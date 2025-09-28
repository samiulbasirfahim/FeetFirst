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
    task: string;
};

export type VerifyOtpRequest = {
    email: string;
    otp_code: string;
};

export type AutoLoginBody = {
    access_token: string;
    refresh_token: string;
};

export type ResetPassword = {
    email: string;
    new_password: string;
    access_token: string;
};

export type ChangePassword = {
    old_password: string;
    new_password: string;
    confirm_password: string;
};
