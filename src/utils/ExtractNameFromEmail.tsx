import cryptoRandomString from "crypto-random-string";

type ExtractNameFromEmailProps = {
  email: string;
};

export const ExtractNameFromEmail = ({ email }: ExtractNameFromEmailProps) => {
  const randomUrlId = cryptoRandomString({ length: 10, type: "url-safe" });
  const username = `${email.split("@")[0]}#${randomUrlId}`;

  return username;
};
export default ExtractNameFromEmail;
