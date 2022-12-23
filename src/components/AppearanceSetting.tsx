import React from "react";
const colors = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
];
const styles = ["green","red", "blue", "yellow", "orange", "purple", "brown", "pink", "gray", "cyan", "lime", "teal", "black", "white"];
export default function AppearanceSetting() {
  const [colorNav, setColorNav] = React.useState(styles[0]);
  const [colorFooter, setColorFooter] = React.useState(styles[0]);
  const [colorFNav, setColorFNav] = React.useState(styles[0]);
  const [colorFFooter, setColorFFooter] = React.useState(styles[0]);
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value);
    if(e.target.id==="footer-background-color"){
      setColorFooter(e.target.value);
    } else if(e.target.id==="nav-background-color") {
      setColorNav(e.target.value);
    }else if(e.target.id==="nav-text-color"){
      setColorFNav(e.target.value);
    }else if(e.target.id==="footer-text-color"){
      setColorFFooter(e.target.value);
    }
  }
  return (<>
    <div className="sm:col-span-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900">CSS setting</h3>
    </div>
      <div className="sm:col-span-6">
        <label htmlFor="nav-background-color" className="block text-sm font-medium text-purple-gray-900">
          Nav Background Color
        </label>
        <select id={"nav-background-color"}  onChange={handleChange} value={colorNav} style={{background:`${colorNav}`}}>
          {styles.map((style2) => (
            <option key={style2} value={style2} style={{background:`${style2}`}}>
              {style2}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-6">
        <label htmlFor="footer-background-color" className="block text-sm font-medium text-purple-gray-900">
          Footer Background Color
        </label>
        <select id={"footer-background-color"} style={{background:`${colorFooter}`}} onChange={handleChange} value={colorFooter}>
          {styles.map((style) => (
            <option key={style} value={style} >
              {style}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-6">
        <label htmlFor="nav-text-color" className="block text-sm font-medium text-purple-gray-900">
          Nav Background Color
        </label>
        <select id={"nav-text-color"}  onChange={handleChange} value={colorFNav} style={{background:`${colorFNav}`}}>
          {styles.map((style2) => (
            <option key={style2} value={style2} style={{background:`${style2}`}}>
              {style2}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-6">
        <label htmlFor="footer-text-color" className="block text-sm font-medium text-purple-gray-900">
          Footer Background Color
        </label>
        <select id={"footer-text-color"} style={{background:`${colorFFooter}`}} onChange={handleChange} value={colorFFooter}>
          {styles.map((style) => (
            <option key={style} value={style} >
              {style}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}
