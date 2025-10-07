import forge from "node-forge";
import { environment } from "./constants";

// Replace this with your actual PEM public key string
const PUBLIC_KEY: string = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp36pp/EZ9DypG6x5yvYL
QNy8gl/8Oc4LV80Ws5RlTRhH8k6PfWKTDLKDwqNL1In+oY62VNn/xn27WLjWaaCQ
QPSBVKgM3a94fgcKB/yZ3DXOgeCI6gnw470wMMZBfpXxO7O548P4lu4L74TxMgZm
ycrbWWO6y2UNu/VRq/lrlB9CasrERjVcZl/PThmQEm0wj03VfzeFHFF5e9R8P9wY
x04Lz4S7UQpI9ljAYlz8KPO+0zmaNNnhTjvC814Rq4IgCUjQGkqF/xtJzFZUdKim
fN+HQ3bU12bAyHJjsOaDWw7Y6RGXS/MooIDXF41UUfpUAWZKZYviDqO1+y0H50ti
9QIDAQAB
-----END PUBLIC KEY-----
`;

export function encryptPassword(password: string): string {

  if (environment !== "production") {
    return password;
  }

  const publicKey = forge.pki.publicKeyFromPem(PUBLIC_KEY) as forge.pki.rsa.PublicKey;
  const encrypted = publicKey.encrypt(password, "RSA-OAEP");
  return forge.util.encode64(encrypted);
}
