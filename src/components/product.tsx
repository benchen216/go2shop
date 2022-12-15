import Color from "./color";
import { NextPage } from "next";
import Link from "next/link";

type productinfo = {
  product_colors:string|undefined,
  product_img_url:string|undefined,
  product_name:string|undefined,
  product_price:number|undefined,
  p_id: number|bigint|undefined,
};
export const Product: NextPage<productinfo> = ({product_colors='', product_img_url="", product_name="", product_price=1, p_id=1}) =>{
  const to_product_detail = () => {
    //window.location.href = 'product?p_id='+p_id.toString();
  }
  return (
    <div className="grid grid-rows-3 grid-flow-col gap-3 rounded-xl bg-white/10 hover:bg-white/20">
      <div className="row-span-3 p-3" onClick={to_product_detail}>
        <img src={product_img_url} className="mb-2 img" alt='product_img'/>
        <div className="row-auto m-1">
          {
            product_colors.length && (
              [...new Set(product_colors.split(','))].map(
                (color,index)=>(
                  <Color color_bg={color} key={index} />
                )
              ))
          }
        </div>
        <p className="mt-2 mb-0">{product_name}</p>
        <p>TWD. {product_price}</p>
      </div>
    </div>
  );
}

export default Product;
