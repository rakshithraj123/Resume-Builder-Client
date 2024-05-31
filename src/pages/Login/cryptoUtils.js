import CryptoJS from "crypto-js";

const secretKey = "ProtectedUserLogin$123";

export const encryptText = (data) => {
  try {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  } catch (error) {
    console.error("Encryption failed:", error);
    return null;
  }
};

export const decryptText = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};
