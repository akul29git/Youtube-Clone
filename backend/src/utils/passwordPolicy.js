import { minPasswordLength, maxPasswordLength } from "../constants.js";

function isSequential(pw){
    if(pw.length < 2) return false;
    let asc = true, desc = true;
    for (let i = 1; i < pw.length; i++) {
        const diff = pw.charCodeAt(i) - pw.charCodeAt(i - 1);
        if (diff !== 1) asc = false;
        if (diff !== -1) desc = false;
    }
    return asc || desc;                          
}

export const passwordPolicy = (password) => {
    if(password === undefined || password === null || password ==="") {
        return{error: "Password is required", success: false};
    }

    if(typeof password !== "string") {
        return {error: "Password must be a string", success: false};
    }

    if(password.trim() === "") {
        return {error: "Password cannot be empty", success: false};
    }

    if (password.length < minPasswordLength) {
        return {error: `Password must be at least ${minPasswordLength} characters long`, success: false};
    }

    if (password.length > maxPasswordLength) {
        return {error: `Password must be no more than ${maxPasswordLength} characters long`, success: false};
    }
    if(isSequential(password)){
        return {error: "password cannot be sequential characters", success: false};
    }

    if(/(.)\1{5,}/u.test(password)){
        return {error: "password cannot have more than 5 repeated characters", success: false};
    }

    if( /^\s|\s$/.test(password)){
        return {error: "password cannot have leading or trailing spaces", success: false};
    }

    return {error: null, success: true};

}