type successfulResponse = {
    username: string;
    role: string;
    groupID: null;
    accessToken: string;
    refreshToken: string;
};

type conflictResponse = {
    message: string;
    error: string;
    statusCode: number;
};

type errorDetail = {
    emailError: null | string;
    usernameError: null | string;
    serverError: null | string;
};

async function sendData(formData: {
    email: string;
    username: string;
    password: string;
    role: string | null;
}): Promise<{ isSuccess: boolean; data: successfulResponse | conflictResponse } | null> {
    try {
        const response = await fetch('http://localhost:9000/auth/signup', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const successData: successfulResponse = await response.json();
            return { isSuccess: true, data: successData };
        } else {
            const errorData: conflictResponse = await response.json();
            return { isSuccess: false, data: errorData };
        }
    } catch (error: any) {
        console.log(error.message);
        return null;
    }
}

export async function handleSignUpSubmit(
    formData: { email: string; username: string; password: string; role: string | null },
    setSubmitError: CallableFunction,
) {
    const response = await sendData(formData);
    const errorDetails: errorDetail = { emailError: null, usernameError: null, serverError: null };

    if (!response) {
        errorDetails.serverError = 'Server Error';
    } else if (response.isSuccess) {
        localStorage.setItem('loginData', JSON.stringify(response.data));
    } else if (response.data && 'message' in response.data) {
        const errorMessage = response.data.message;

        if (errorMessage.includes('username')) {
            errorDetails.usernameError = errorMessage;
        } else {
            errorDetails.emailError = errorMessage;
        }
    }

    setSubmitError(errorDetails);
}
