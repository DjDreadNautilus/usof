function isValidPassword(password) {
    const regex = /^[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{8,64}$/;
    return regex.test(password);
}

function isValidLogin(login) {
    const regex = /^[A-Za-z0-9_-]{3,32}$/;
    return regex.test(login);
}

function isValidEmail(email) {
    const regex = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(email);
}

function isNonEmptyString(value) {
    return typeof value === "string" && value.trim().length > 0;
}
export default {isValidPassword, isValidEmail, isValidLogin, isNonEmptyString}