import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";

import { postgres as postgresAdapter } from "@lucia-auth/adapter-postgresql";
import postgres from "postgres";

import { dev } from "$app/environment";

// const sql = postgres("", 
// {
// 	host: "localhost",
// 	port: 5432,
// 	database: "aba_data_emr",
// 	username: "postgres",
// 	password: "postgres",
// });
const sql = postgres("postgres://postgres:postgres@localhost:5432/aba_data_emr");

export const auth = lucia({
	adapter: postgresAdapter(sql, {
		user: "auth_user",
		key: "user_key",
		session: "user_session"
	}),
	env: dev ? "DEV" : "PROD",
	middleware: sveltekit(),

	getUserAttributes: (data) => {
		return {
			username: data.username
		};
	}
});

export type Auth = typeof auth;