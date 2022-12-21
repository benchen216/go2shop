import { z } from "zod";
import fetch from "node-fetch";
import { protectedProcedure, router } from "../trpc";
import { env } from "../../../env/server.mjs";

export const  orderRouter  = router({
  checkout: protectedProcedure
    .input(z.object({
      cart: z.object({
        name:z.string(),
        id:z.number(),
        price:z.number(),
        size:z.string(),
        color:z.string(),
        quantity:z.number(),
        image:z.string()
      }).array(),
      //recipient: z.object({
        name: z.string(),
        phone: z.string(),
        email: z.string(),
        address: z.string(),
      //}),
      prime: z.string(),
      total:z.number(),
      shipping:z.number(),
      payment:z.string(),
    }))
    .mutation(async ({ctx, input }) => {
      const now = new Date();
      const orderId = '' +now.getFullYear().toString().slice(2,4)+ now.getMonth() + now.getDate() + (now.getTime()%(24*60*60*1000)) + Math.floor(Math.random()*10);
      const postData = {
        'prime': input.prime,
        'partner_key':
          "partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG",
        'merchant_id': 'AppWorksSchool_CTBC',
        'amount': Number(input.total),
        'currency': 'TWD',
        'details': 'test Tappay',
        'cardholder': {
          'phone_number': input.phone,
          'name': input.name,
          'email': input.email,
        },
        'remember': false,
      };
      return await fetch("https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': "partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG",
          },
          body: JSON.stringify(postData)
        }).then(async (response) => {
        const data = await response.json();
        console.log(data);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (data.status === 0) {
          const order = ctx.prisma.order.create({
            data: {
              orderId: orderId,
              prime: input.prime,
              name: input.name,
              phone: input.phone,
              email: input.email,
              address: input.address,
              total: input.total,
              shipping: input.shipping,
              payment: input.payment,
              detail: input.cart,
              userId: Number(ctx.session.user.id),
            }
          })
          order.then(
            (res) => {
              console.log(res);
              //fetch("https://api.mailgun.net/v3/sandboxd1b3b0b3b8e64a8e9b1f1b8b8b8b8b8b.mailgun.org/messages",)
              fetch("https://notify-api.line.me/api/notify", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization':'Bearer ' +env.LINE_NOTIFY_CLIENT_ID,
                },
                body: encodeURIComponent("message")+"="+ encodeURIComponent('\n訂單編號:'+String(orderId)+'已成立\n訂單總金額:'+String(input.total)+'\n收件人:'+String(input.name)+'\n收件地址:'+String(input.address)+'\n聯絡電話:'+String(input.phone)+'\n電子信箱:'+String(input.email)+'\n付款方式:'+String(input.payment)+'\n運費:'+String(input.shipping))
              })
              return { result: "success" };
            }
          ).catch(
            (err) => {
              console.log(err);
              return { result: "fail" };
            }
          )
          return { result: "success" };
        } else {
          return { result: "fail" };
        }
      });
      //Todo: check cart items fit the product
    }),
  getAll: protectedProcedure.query(async ({ctx, input}) => {
    return await ctx.prisma.order.findMany({})
  }),
  getOne: protectedProcedure.input(z.number()).query(async ({ctx, input}) => {
    return await ctx.prisma.order.findUnique({
      where: {
        id: input
      }
    })
  }),
  update: protectedProcedure.input(z.object({
    id: z.number(),
    status: z.number()
  })).mutation(async ({ctx, input}) => {
    return await ctx.prisma.order.update({
      where: {
        id: input.id
      },
      data: {
        status: input.status
      }
    })
  }),
  getHistory: protectedProcedure.query(async ({ctx, input}) => {
    return await ctx.prisma.order.findMany({
      where: {
        userId: Number(ctx.session.user.id)
      }
    })
  })
});
