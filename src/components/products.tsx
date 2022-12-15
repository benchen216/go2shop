import Product from "./product";
import { useState} from "react";
import {trpc} from "../utils/trpc";

import InfiniteScroll from "react-infinite-scroll-component";
import {z} from "zod";

function Products({ search= ""}) {
  const {data: productsDx} = trpc.product.search.useQuery({keyword:"測試", limit:6});
  const {data: productsD2} = trpc.product.search.useQuery({keyword:"測試", limit:6});
  const [data,setData]=useState([productsD2]);
  const [pagingD,setPaging] = useState(0);
  const [nextPaging,setNextPaging] = useState(true);
  const [cursor,setCursor] = useState(null);

  //console.dir(productsD);
  const fetchMoreData = () => {
    // if (nextPaging) {
    //   //setPaging(pagingD+1);
    //   const {data: productsD} = trpc.product.search.useQuery({keyword:"測試", limit:6, cursor:cursor});
    //   if (productsD===undefined) {
    //     setData(data.concat(productsD));
    //     setCursor(productsD.cursor);
    //   }
    //   setData(data.concat(productsD));
    //   setCursor(productsD?.slice(-1)?.id??null);
    //   setNextPaging(productsD.nextPaging);
    // }
  };
  return (
    <div className="row-auto">

      {/*<InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={nextPaging}
        loader={<img src={"img/loading.gif"} alt={"loading"}/>}
      >
        <div className={"row"}>
          {data.length && (
            data.map((productD, i) => (
              <></>
             // <Product product_img_url={productD?.productImage ?? ""} product_colors={productD['color']} product_name={productD['productName']} product_price={productD['productPrice']} p_id={productD['id']} key={i} />
            ))
          )}{!data.length && (
          <p>No products found!</p>
        )}
        </div>
      </InfiniteScroll>*/}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
      {(productsDx!==undefined)?
        <Product  product_img_url={productsDx?productsDx[0]?.productImage : " " } product_colors={"#FFFFFF"} product_name={productsDx?productsDx[0]?.productName : " "} product_price={productsDx?productsDx[0]?.productPrice : 1} p_id={productsDx?productsDx[0]?.id : 1} />
        :<></>}
        {(productsDx!==undefined)?
          <Product  product_img_url={productsDx?productsDx[1]?.productImage : " " } product_colors={"#FFFFFF"} product_name={productsDx?productsDx[0]?.productName : " "} product_price={productsDx?productsDx[0]?.productPrice : 1} p_id={productsDx?productsDx[0]?.id : 1} />
          :<></>}
        {(productsDx!==undefined)?
          <Product  product_img_url={productsDx?productsDx[0]?.productImage : " " } product_colors={"#FFFFFF"} product_name={productsDx?productsDx[0]?.productName : " "} product_price={productsDx?productsDx[0]?.productPrice : 1} p_id={productsDx?productsDx[0]?.id : 1} />
          :<></>}
        {(productsDx!==undefined)?
          <Product  product_img_url={productsDx?productsDx[0]?.productImage : " " } product_colors={"#FFFFFF"} product_name={productsDx?productsDx[0]?.productName : " "} product_price={productsDx?productsDx[0]?.productPrice : 1} p_id={productsDx?productsDx[0]?.id : 1} />
          :<></>}
        {(productsDx!==undefined)?
          <Product  product_img_url={productsDx?productsDx[0]?.productImage : " " } product_colors={"#FFFFFF"} product_name={productsDx?productsDx[0]?.productName : " "} product_price={productsDx?productsDx[0]?.productPrice : 1} p_id={productsDx?productsDx[0]?.id : 1} />
          :<></>}
        {(productsDx!==undefined)?
          <Product  product_img_url={productsDx?productsDx[0]?.productImage : " " } product_colors={"#FFFFFF"} product_name={productsDx?productsDx[0]?.productName : " "} product_price={productsDx?productsDx[0]?.productPrice : 1} p_id={productsDx?productsDx[0]?.id : 1} />
          :<></>}
        {(productsDx!==undefined)?
          <Product  product_img_url={productsDx?productsDx[0]?.productImage : " " } product_colors={"#FFFFFF"} product_name={productsDx?productsDx[0]?.productName : " "} product_price={productsDx?productsDx[0]?.productPrice : 1} p_id={productsDx?productsDx[0]?.id : 1} />
          :<></>}
        {(productsDx!==undefined)?
          <Product  product_img_url={productsDx?productsDx[0]?.productImage : " " } product_colors={"#FFFFFF"} product_name={productsDx?productsDx[0]?.productName : " "} product_price={productsDx?productsDx[0]?.productPrice : 1} p_id={productsDx?productsDx[0]?.id : 1} />
          :<></>}
      </div>


    </div>
  );
}

export default Products;
