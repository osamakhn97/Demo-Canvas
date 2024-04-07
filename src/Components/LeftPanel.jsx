import React from "react";
import '../Styles/leftPanel.css';
import textIcon from '../assets/Svgs/TextIcon.svg';
import imageIcon from '../assets/Svgs/ImageIcon.svg';
export const LeftPanel = ()=>{
    return(
        <div className='left-wrapper'>
            <div className='item-wrapper'>
            <div className='items'>
                <img width={24} height={24} src={textIcon}/>
            </div>
            <div className='items'>
                <img width={24} height={24} src={imageIcon}/>
            </div>
            </div>
        </div>
    )
}
export default LeftPanel;