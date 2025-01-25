import z from "zod";
import type { FastifyTypedInstance } from "./types";

interface User {
	name: string;
	email: string;
}

const users: User[] = [
	{ name: "John Doe", email: "mail@mail.com" },
	{ name: "John Doe", email: "mail@mail.com" },
	{ name: "John Doe", email: "mail@mail.com" },
	{ name: "John Doe", email: "mail@mail.com" },
	{ name: "John Doe", email: "mail@mail.com" },
];

export async function routes(app: FastifyTypedInstance) {
	app.get(
		"/users",
		{
			schema: {
				tags: ["users"],
				description: "Get all users",
				response: {
					200: z.array(
						z.object({
							name: z.string(),
							email: z.string(),
						}),
					),
				},
			},
		},
		async (request, reply) => {
			reply.code(201).send(users);
		},
	);

	app.post(
		"/users",
		{
			schema: {
				tags: ["users"],
				description: "Create a new user",
				body: z.object({
					name: z.string(),
					email: z.string().email(),
				}),
				response: {
					201: z.object({
						name: z.string(),
						email: z.string(),
					}),
					401: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { email, name } = request.body;
			console.log(email, name);
			if (!email || !name) {
				reply.code(401).send({ message: "Email and name are required" });
				return;
			}
			reply.code(201).send({ email, name });
		},
	);
}
