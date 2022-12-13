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
  const [cursor,setCursor] = useState();

  //console.dir(productsD);
  const fetchMoreData = () => {
    if(search===""){
     const {data:dataP} = trpc.product.search.useQuery({cursor: pagingD, limit: 6})
      console.log(dataP);
     if(dataP?.length===0){
       setNextPaging(false);
       setData(data.concat(dataP));
     }
    }else {
      const {data:dataP} = trpc.product.search.useQuery({cursor: pagingD, limit: 6})
      console.log(dataP);
      if(dataP?.length===0){
        setNextPaging(false);
        setData(data.concat(dataP));
      }
    }
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
      {(productsDx!==undefined)?
        <Product  product_img_url={productsDx?productsDx[0]?.productImage : " " } product_colors={"#FFFFFF"} product_name={productsDx?productsDx[0]?.productName : " "} product_price={productsDx?productsDx[0]?.productPrice : 1} p_id={productsDx?productsDx[0]?.id : 1} />
        :<></>}


    </div>
  );
}

export default Products;
