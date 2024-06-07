export const validateLoginFormData = (formData) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.email == "" || formData.password == "") {
        return { isValid: false, validationMessage: "Email and password are required" };
    }
    if (!emailPattern.test(formData.email)) {
        return { isValid: false, validationMessage: "Invalid email address" };
    }
    if (formData.password.length < 8) {
        return { isValid: false, validationMessage: "Invalid password" };
    }
    return { isValid: true, validationMessage: "Valid" };
};

export const isLoginFormInvalid = (email, password) => {
    return !(email && password);
};

export const validateSignUpFormData = (formData) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!(formData.firstName) || !(formData.lastName) || !(formData.email) || !(formData.password) || !(formData.passwordConf)  || !(formData.phoneNumber)) {
        return { isValid: false, validationMessage: "All fields are required" };
    }

    if (!emailPattern.test(formData.email)) {
        return { isValid: false, validationMessage: "Invalid email address" };
    }

    if (formData.password.length < 8) {
        return { isValid: false, validationMessage: "Password must be at least 8 characters long" }; 
    }

    if (formData.password !== formData.passwordConf) {
        return { isValid: false, validationMessage: "Passwords do not match" }; 
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
        return { isValid: false, validationMessage: "Invalid phone number" };  
    }

    if (
        formData.designation === "" ||
        formData.designation === "Select Designation"
    ) {
        return  { isValid: false, validationMessage:  "Select designation from drop down"}; 
    }

    return { isValid: true, validationMessage: "Valid" };
};

export const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = phoneNumber.startsWith('+')? /^(\+?\d{2})?\d{10}$/ : /^[0-9]{10}$/
     if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
        return false
     }else{
        return true
     }
}
