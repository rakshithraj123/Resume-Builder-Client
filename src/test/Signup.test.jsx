import {validateSignUpFormData}  from "../Utils/ResumeBuilderUtilities.jsx";


describe('validateSignUpFormData', () => {
  it('should return isValid: false and validationMessage: "All fields are required" when all fields are empty', () => {
    const formData = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConf:'',
      phoneNumber: '',
      designation: '',
    };
    const result = validateSignUpFormData(formData);
    expect(result).toEqual({ isValid: false, validationMessage: 'All fields are required' });
  });

  it('should return isValid: false and validationMessage: "Invalid email address" when email is invalid', () => {
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalid_email',
      password: 'password123',
      passwordConf: 'password123',
      phoneNumber: '1234567890',
      designation: 'Software Engineer',
    };
    const result = validateSignUpFormData(formData);
    expect(result).toEqual({ isValid: false, validationMessage: 'Invalid email address' });
  });

  it('should return isValid: false and validationMessage: "Password must be at least 8 characters long" when password is less than 8 characters', () => {
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'short',
      passwordConf: 'short',
      phoneNumber: '1234567890',
      designation: 'Software Engineer',
    };
    const result = validateSignUpFormData(formData);
    expect(result).toEqual({ isValid: false, validationMessage: 'Password must be at least 8 characters long' });
  });

  it('should return isValid: false and validationMessage: "Passwords do not match" when password and confirm password do not match', () => {
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      phoneNumber: '1234567890',
      designation: 'Software Engineer',
      passwordConf: 'different_password',
    };
    const result = validateSignUpFormData(formData);
    expect(result).toEqual({ isValid: false, validationMessage: 'Passwords do not match' });
  });

  it('should return isValid: false and validationMessage: "Invalid phone number" when phone number is invalid', () => {
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      passwordConf: 'password123',
      phoneNumber: '12345678',
      designation: 'Software Engineer',
    };
    const result = validateSignUpFormData(formData);
    expect(result).toEqual({ isValid: false, validationMessage: 'Invalid phone number' });
  });

  it('should return isValid: false and validationMessage: "Select designation from drop down" when designation is not selected', () => {
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      phoneNumber: '1234567890',
      passwordConf: 'password123',
      designation: '',
    };
    const result = validateSignUpFormData(formData);
    expect(result).toEqual({ isValid: false, validationMessage: 'Select designation from drop down' });
  });

  it('should return isValid: true and validationMessage: "Valid" when all fields are valid', () => {
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      passwordConf: 'password123',
      phoneNumber: '1234567890',
      designation: 'Software Engineer',
    };
    const result = validateSignUpFormData(formData);
    expect(result).toEqual({ isValid: true, validationMessage: 'Valid' });
  });
});

