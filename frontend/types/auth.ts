export interface User {
    id: number;
    full_name: string;
    email: string;
    is_active: boolean;
    is_verified: boolean;
}

export interface Token {
    access_token: string;
    token_type: string;
}