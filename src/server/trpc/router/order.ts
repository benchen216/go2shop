import { z } from "zod";
import fetch from "node-fetch";
import { protectedProcedure, router } from "../trpc";

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
      const number = '' +now.getFullYear().toString().slice(2,4)+ now.getMonth() + now.getDate() + (now.getTime()%(24*60*60*1000)) + Math.floor(Math.random()*10);
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
              orderId: number,
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
});
