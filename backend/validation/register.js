const Validator = require("validator");
const isEmpty = require("is-empty");

const authorisedDomain = function(email) {
    if (!email.includes('digitalcodemediasolutions') && !email.includes('digitalcodemedia')) {
        return true;
    }
};


module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.jobTitle = !isEmpty(data.jobTitle) ? data.jobTitle : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // Name Validations
    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "First Name is required";
    }
    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = "Last Name is required";
    }

    // Job Title Validation
    if (Validator.isEmpty(data.jobTitle)) {
        errors.jobTitle = "Job Title is required";
    }

    // Email address Validation
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email address is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email address is invalid";
    } else if (authorisedDomain(data.email)) {
        errors.email = 'Unathorised Domain'
    }

    // Password validation
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Passwords must match";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    // Policy Validation
    if (!data.acceptedPolicy) {
        errors.policy = "You must accept the policies"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
