import {useEffect} from "react";

function Color({color_bg="",status=1, colorFunc=()=>{return 0}}) {
  const status_color = ['', '', 'border-3'];
  useEffect(
    ()=>{return},[status]
  )
  return (
    //"col box m-1 border "+status_color[status]
    <span className={"columns-1 box-border m-1"} style={{
    background: color_bg
  }} id={'color-'+color_bg} onClick={colorFunc}></span>
);
}

export default Color;
