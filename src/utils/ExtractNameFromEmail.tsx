import cryptoRandomString from "crypto-random-string";

type ExtractNameFromEmailProps = {
  email: string;
};

export const ExtractNameFromEmail = ({ email }: ExtractNameFromEmailProps) => {
  const randomUrlId = cryptoRandomString({ length: 5, type: "alphanumeric" });
  const username = `${email.split("@")[0]}_${randomUrlId}`;

  return username;
};
export default ExtractNameFromEmail;
