import React from 'react'

const Vallidations = {
    Username: { required: "User Name is required" },
    EmailId: { required: "Email Id is required" },
    Role: { required: "Role is required" },
    Password: { required: "Password is required" }
}

export default Vallidations;

export const IsNumberKey = (e) => {
    const isValidInput = /^[0-9\b]+$/.test(e.key);
    if (!isValidInput) { e.preventDefault(); }
};

export const IsAlphabetNumber = (e) => {
    const isValidInput = /[^a-zA-Z0-9]/.test(e.key);
    if (isValidInput) { e.preventDefault(); }
};

export const IsAlphabetKey = (e) => {
    const isValidInput = /^[a-zA-Z\s]+$/.test(e.key);
    if (!isValidInput) { e.preventDefault(); }
};
export const IsNumberDecimalKey = (e) => {
    const isValidInput = /^[0-9.]*$/.test(e.key);
    if (!isValidInput || ((e.target.value + '' + e.key).split('.').length > 2)) {
        e.preventDefault();
    }
    // if((e.target.value).match(/\w\../) && (e.target.value).match(/[A-Za-z]\.\d/)){
    //     e.preventDefault();
    // }
};

// E.g:- OnKeyPress={IsEmail}  -- allow only alphabet,numeric,@,.
export const IsEmail = (e) => {
    const isValidInput = /^[a-zA-Z0-9@._-]+$/.test(e.key);

    if (!isValidInput) {
        e.preventDefault();
    }
    return true
};

export const EmailValidation = (e) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!e) {
        return "Email Id is required";
    } else if (!emailRegex.test(e)) {
        return "Invalid email format";
    }
    return "";
};