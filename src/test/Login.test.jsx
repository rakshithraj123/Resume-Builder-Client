import {validateLoginFormData,isLoginFormInvalid}  from "../Utils/ResumeBuilderUtilities.jsx";

describe("validateLoginFormData", () => {
    it("should return true for valid email address and password", () => {
      const formData = {
        email: "valid@email.com",
        password: "password",
      };
      expect(validateLoginFormData(formData)).toEqual({ isValid: true, validationMessage: "Valid" });
    });
  
    it("should return an error message for invalid email address", () => {
      const formData = {
        email: "invalid email",
        password: "password",
      };
      expect(validateLoginFormData(formData)).toEqual({ isValid: false, validationMessage: "Invalid email address" });
    });
  
    it("should return an error message for password less than 8 characters", () => {
      const formData = {
        email: "valid@email.com",
        password: "1234567",
      };
      expect(validateLoginFormData(formData)).toEqual({ isValid: false, validationMessage: "Invalid password" });
    });
  
    it("should return an error message for empty email and password", () => {
      const formData = {
        email: "",
        password: "",
      };
      expect(validateLoginFormData(formData)).toEqual({ isValid: false, validationMessage: "Email and password are required" });
    });
  });

  describe("isLoginFormInvalid", () => {
    it("should return true for empty email and password", () => {
      const email = "";
      const password = "";
      expect(isLoginFormInvalid(email, password)).toBe(true);
    });
  
    it("should return true for empty email", () => {
      const email = "";
      const password = "password";
      expect(isLoginFormInvalid(email, password)).toBe(true);
    });
  
    it("should return true for empty password", () => {
      const email = "valid@email.com";
      const password = "";
      expect(isLoginFormInvalid(email, password)).toBe(true);
    });
  
    it("should return false for valid email and password", () => {
      const email = "valid@email.com";
      const password = "password";
      expect(isLoginFormInvalid(email, password)).toBe(false);
    });
  });