import Product from "./product";
import { useState} from "react";

import InfiniteScroll from "react-infinite-scroll-component";

function Products({ search=null}) {
  const [data,setData]=useState([]);
  const [pagingD,setPaging] = useState(0);
  const [nextPaging,setNextPaging] = useState(true);

  const fetchMoreData = () => {
    console.log("xx:"+pagingD);
    if(search===null){
      fetch(process.env.REACT_APP_API_BASE_PATH+'/products/'+""+"?paging="+pagingD, {})
        .then(async (response) => {
          const res = await response.json();
          console.log(res['next_paging'])
          if(!res['next_paging']){
            setNextPaging(false)
          }
          setData(data.concat(res['products']));
          setPaging(pagingD+1);
          console.log(data);
        })
    }else {
      fetch(process.env.REACT_APP_API_BASE_PATH+'/products/search?keyword='+search+"&paging="+pagingD, {})
        .then(async (response) => {
          const res = await response.json();
          if(!res['next_paging']){
            setNextPaging(false)
          }
          setData(data.concat(res['products']));
          setPaging(pagingD+1);
          console.log(data);
        })
    }
  };
  return (
    <div className="row-auto">


      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={nextPaging}
        loader={<img src={"img/loading.gif"} alt={"loading"}/>}
      >
        <div className={"row"}>
          {data.length && (
            data.map((productD, i) => (
              <Product product_img_url={productD['product_img_url']} product_colors={productD['color']} product_name={productD['product_name']} product_price={productD['product_price']} p_id={productD['p_id']} key={i} />
            ))
          )}{!data.length && (
          <p>No products found!</p>
        )}</div>

      </InfiniteScroll>



    </div>
  );
}

export default Products;
