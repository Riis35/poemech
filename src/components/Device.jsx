import DeviceCss from "./Device.module.css";

import React, { useState } from "react";
import TankContainer from "./TankContainer";

export default function Device(props) {
  const [collapse, setCollapse] = useState("yes");

  // arrow Rotating code

  // collapsed
  const collapsedArrow = { transform: `rotate(-45deg)` };
  // unfold
  const unfoldArrow = { transform: `rotate(45deg)` };

  const [arrow, setArrow] = useState(collapsedArrow);

  const handleCollapse = () => {
    setArrow((prev) => {
      return prev.transform === "rotate(-45deg)" ? unfoldArrow : collapsedArrow;
    });

    setCollapse((prev) => {
      const faruk = prev === "yes" ? "no" : "yes";
      return faruk;
    });
  };


  const colorPalette = ["#e8dff5", "#fce1e4", "#cf4dd", "#ddedea", "#daeaf6"];
  
  return (
    <div className={DeviceCss.container}  style={{ backgroundColor: colorPalette[parseInt(props.color)]}}>
      <div className={DeviceCss.buttonAndArrow}>
        <div className={DeviceCss.arrow} style={arrow} key={collapse}></div>
        <button className={DeviceCss.name} onClick={handleCollapse}>
          {" "}
          Cihaz Adı : {props.name}
        </button>
      </div>
      <div className={DeviceCss.tankContainer}>
        {" "}
        <TankContainer
          key={collapse}
          isCollapsed={`${collapse}`}
          index={props.index}
        />{" "}
      </div>
    </div>
  );
}
