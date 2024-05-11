import zxcvbn from 'zxcvbn';

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const usernameRegex = /^[a-zA-Z0-9_]+$/;

export function validateEmail(email: string): string | null {
    if (!email || email.trim().length === 0) {
        return 'Email cannot be empty';
    }
    const isCorrect = emailRegex.test(email);

    return isCorrect ? null : 'Invalid email format';
}

export function validateUsername(username: string): string | null {
    if (!username || username.length < 3 || username.length > 20) {
        return 'Username must be between 3 and 20 characters';
    }

    const invalidCharsSet = new Set();
    for (const char of username) {
        if (!usernameRegex.test(char)) {
            invalidCharsSet.add(char);
        }
    }
    const invalidChars = Array.from(invalidCharsSet);
    if (invalidChars.length > 0) {
        return `Username contains invalid characters: ${invalidChars.join(', ')}`;
    }

    return null;
}

export function validatePasswordForSignUp(password: string): string | null {
    if (!password || password.length < 8) {
        return 'Password must be at least 8 characters long.';
    }

    const passwordStrength = zxcvbn(password).score;
    if (passwordStrength < 3) {
        return 'Weak password! please mix numbers, and special characters.';
    }

    return null;
}

export function validatePasswordForSignIn(password: string): string | null {
    if (!password || password.length < 8) {
        return 'Password must be at least 8 characters long.';
    }
    return null;
}
