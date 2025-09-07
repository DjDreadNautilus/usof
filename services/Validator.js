function is_valid_password(password) {
    const regex = /^[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{8,64}$/;
    return regex.test(password);
}

function is_valid_login(login) {
    const regex = /^[A-Za-z0-9_-]{3,32}$/;
    return regex.test(login);
}

module.exports = {is_valid_password, is_valid_login};
