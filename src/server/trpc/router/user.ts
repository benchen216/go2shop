import { z } from "zod";

import { router, publicProcedure,protectedProcedure } from "../trpc";

export const userRouter = router({
  userDetail: protectedProcedure.query(({ ctx }) => {
    console.log(ctx.session.user);
    return ctx.prisma.user.findUnique({
      where: {
        id: Number(ctx.session.user.id),
      },
      select: {
        id: true,
        name: true,
        email: true,
        userPhone: true,
        userAddress: true
      }
    });
  }),
  userDetails: protectedProcedure.input(
    z.object({
      name: z.string(),
    }),
  )
    .mutation(async ({ctx, input }) => {
      const post = await ctx.prisma.user.update({
        where: {
          id: Number(ctx.session.user.id),
        },
        data: {
          name: input.name,
        },
        //select: ,
      });
      return "success";
    }),
  updateData: protectedProcedure
    .input(z.object({
      name: z.string(),
      //email: z.string(),
      userPhone: z.string(),
      userAddress: z.string()
    }))
    .mutation(async ({ ctx ,input}) => {
      console.log("xxxx");
      const user = await ctx.prisma.user.update({
        where: {
          id: Number(ctx.session.user.id),
        },
        data: {
          name: input.name,
          //email: input.email,
          userPhone: input.userPhone,
          userAddress: input.userAddress
        }
      });
      return user;
    }),
});
