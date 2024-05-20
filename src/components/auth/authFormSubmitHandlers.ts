type successResponse = {
    username: string;
    role: string;
    groupID: null;
    accessToken: string;
    refreshToken: string;
};

type errorResponse = {
    message: string;
    error: string;
    statusCode: number;
};

type errorDetail = {
    emailError: null | string;
    passwordError: null | string;
    usernameError: null | string;
    serverError: null | string;
};

export type signUpFormData = {
    email: string;
    username: string;
    password: string;
    role: string | null;
};

export type signInFormData = { username: string; password: string };

async function sendData(
    url: string,
    formData: signInFormData | signUpFormData,
    setIsLoading: CallableFunction,
): Promise<{ isSuccess: boolean; data: successResponse | errorResponse } | null> {
    try {
        setIsLoading(true);

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const successData: successResponse = await response.json();

            return { isSuccess: true, data: successData };
        } else {
            const errorData: errorResponse = await response.json();

            return { isSuccess: false, data: errorData };
        }
    } catch (error: any) {
        console.log(error.message);

        return null;
    } finally {
        setIsLoading(false);
    }
}

export async function handleSignUpSubmit(formData: signUpFormData, setSubmitError: CallableFunction, setIsLoading: CallableFunction) {
    const url = 'http://localhost:9000/auth/signup';
    const response = await sendData(url, formData, setIsLoading);
    const errorDetails: errorDetail = { emailError: null, passwordError: null, usernameError: null, serverError: null };

    if (!response) {
        errorDetails.serverError = 'Server Error';
    } else if (response.isSuccess) {
        localStorage.setItem('loginData', JSON.stringify(response.data));
    } else {
        if (response.data && 'message' in response.data) {
            const errorMessage = response.data.message;
            const isErrorAboutUsername = errorMessage.includes('username');

            if (isErrorAboutUsername) {
                errorDetails.usernameError = errorMessage;
            } else {
                errorDetails.emailError = errorMessage;
            }
        }
    }
    setSubmitError(errorDetails);
}

export async function handleSignInSubmit(formData: signInFormData, setSubmitError: CallableFunction, setIsLoading: CallableFunction) {
    const url = 'http://localhost:9000/auth/signin';
    const response = await sendData(url, formData, setIsLoading);
    const errorDetails: errorDetail = { emailError: null, passwordError: null, usernameError: null, serverError: null };

    if (!response) {
        errorDetails.serverError = 'Server Error';
    } else if (response.isSuccess) {
        localStorage.setItem('loginData', JSON.stringify(response.data));
    } else {
        if (response.data && 'message' in response.data) {
            const errorMessage = response.data.message;
            const isErrorAboutUsername = errorMessage.includes('username');

            if (isErrorAboutUsername) {
                errorDetails.usernameError = errorMessage;
            } else {
                errorDetails.passwordError = errorMessage;
            }
        }
    }
    setSubmitError(errorDetails);
}
