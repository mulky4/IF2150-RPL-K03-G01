import { createAuthClient } from "better-auth/react";

// Klien Better Auth di browser (mis. keluar akun). Login & registrasi lewat tRPC → AuthController.
export const authClient = createAuthClient();
