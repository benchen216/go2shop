import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    ctx.prisma.example.create({
      data: {
        id: "2",
        name: "test",
      }

    }).then((res) => {
      console.log(res);
    });
    return ctx.prisma.example.findMany();
  }),
  getOne: publicProcedure.input(z.object({ text: z.string().nullish() }).nullish()).query(({ ctx, input }) => {
    console.log(input?.text ??  "no id");
    return ctx.prisma.example.findUnique({
      where: {
        id: input?.text ?? "1",
      },
    });
  }),
  userById: publicProcedure
    .input((val: unknown) => {
      if (typeof val === 'string') return val;
      throw new Error(`Invalid input: ${typeof val}`);
    })
    .query((req) => {
      const { input } = req;

      //const input: string
      console.log(input)
      //const user = userList.find((u) => u.id === input);

      return "test";
    }),
});
