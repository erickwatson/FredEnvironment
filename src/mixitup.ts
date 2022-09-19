import fastify from "fastify";

export const mixItUpApi = fastify();

export const setupMixItUp = () => {
    mixItUpApi.listen({ port: 42069 })
}