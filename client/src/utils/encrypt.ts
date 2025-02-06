import CryptoJS from "crypto-js";

const secret = import.meta.env.VITE_ENCRYPT_KEY;

export const encrypt = (data: string) => {
  return CryptoJS.AES.encrypt(data, secret).toString();
};

export const decrypt = (data: string) => {
  const bytes = CryptoJS.AES.decrypt(data, secret);
  return bytes.toString(CryptoJS.enc.Utf8);
};
