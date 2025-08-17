declare interface GeneratePaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

declare interface GeneratePaymentProps {
    method: PaymentMethod;
}

declare type PaymentMethod = 'bca' | 'qris' | 'mandiri';

declare interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
    data?: {
        [field: string]: string[];
    };
    token?: {
        [field: string]: string[];
    };
}

declare interface RegisterInput {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
}

declare interface LoginInput {
    email: string;
    password: string;
}

declare interface ForgotPasswordInput {
    email: string;
}

declare interface ResetPasswordInput {
    password: string;
    confirm_password: string;
}

declare interface OtpInput {
    otp: string;
}

declare interface FormErrorsRegister {
    username?: string[];
    email?: string[];
    password?: string[];
    new_password?: string[];
    confirm_password?: string[];
    password_security?: string[];
    password_match?: string[];
}

declare interface FormErrorsForgotPassword {
    email?: string[];
}

declare interface FormErrorsResetPassword {
    password?: string[];
    confirm_password?: string[];
    password_security?: string[];
    password_match?: string[];
}

declare interface FormErrorsLogin {
    email?: string[];
    password?: string[];
}

declare interface FormErrorsOtp {
    otp?: string[];
}

declare interface User {
    id: string;
    username: string;
    email: string | null;
    is_active: boolean;
    updated_at: Date;
    created_at: Date;
    avatar: string;
    deleted_at: Date | null;
    provider: string;
}

declare interface Token {
    created_at: Date;
    id: string;
    updated_at: Date;
    token_web: string;
}

declare interface ApiResponse {
    data?: Token | User;
    message: string;
    user: User;
    errors?: {
        [field: string]: string[];
    };
    token?: {
        [field: string]: string[];
    };
}

declare interface RegisterProps {
    showPassword: boolean;
    showConfirmPassword: boolean;
    togglePasswordVisibility: () => void;
    toggleConfirmPasswordVisibility: () => void;
    RegisterFormik: FormikProps<RegisterFormValues>;
    formErrors: FormErrorsRegister;
    isUsernameError: boolean;
    isEmailError: boolean;
    isPasswordError: boolean;
    isConfirmPasswordError: boolean;
    validateField: (fieldValues: Partial<RegisterFormValues>) => void;
    errorPasswordMerged: {
        [field: string]: string[];
    };
    isPasswordMergedError: boolean;
    redirectToLogin: () => void;
    redirectToRegister: () => void;
}
