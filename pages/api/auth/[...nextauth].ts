import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        Credentials({
            id: "MetaMask",
            name: "MetaMask",
            credentials: {
                address: {},
            },
            authorize(credentials) {
                const address = credentials?.address;

                return address ? { address, id: address, name: "Hank" } : null;
            },
        }),
    ],
});