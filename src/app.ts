import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, _request, reply) => {
    if (env.NODE_ENV !== "prod") {
        console.log(error);
    }
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: "Validation error",
            issues: error.format(),
        });
    } else {
        //TODO: fazer o log para uma ferramenta externa de observabilidade tipo DataDog/NewRelic/Sentry
    }

    return reply.status(500).send({ message: "Internal server error." });
});
