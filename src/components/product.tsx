import Color from "./Color";


function Product({product_colors='', product_img_url="", product_name="", product_price=1, p_id='1'}) {
  const to_product_detail = () => {
    window.location.href = 'product?p_id='+p_id.toString();
  }
  return (
    <div className="col-xl-4 col-sm-6 p-3" onClick={to_product_detail}>
      <img src={product_img_url} className="mb-2 img-fluid" alt='product_img'/>
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
  );
}

export default Product;
