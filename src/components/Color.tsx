import {useEffect} from "react";

function Color({color_bg="",status=1, colorFunc=()=>{return 0}}) {
  const status_color = ['', '', 'border-3'];
  useEffect(
    ()=>{return},[status]
  )
  return (
    <span className={"col-1 box m-1 border "+status_color[status]} style={{
    background: color_bg
  }} id={'color-'+color_bg} onClick={colorFunc}></span>
);
}

export default Color;
