import React, {useEffect} from "react";
import '../Styles/editor.css';
import Moveable from "react-moveable";
import Selecto from "react-selecto";
import {initializeMoveAble, initializeSelecto} from "../Utils/helper";
export const Editor = ()=>{
    const [targets, setTargets] = React.useState([]);
    const moveableRef = React.useRef(null);
    const selectoRef = React.useRef(null);
    useEffect(()=>{
        // initializeMoveAble();
        // initializeSelecto();
    },[])
    return(
        <div className='editor-wrapper'>
            <Moveable
                ref={moveableRef}
                target={targets}
                draggable={true}
                origin={true}
                renderDirections={["nw","ne","sw","se"]}
                snappable={true}
                keepRatio={true}
                snapContainer={".elements"}
                snapDirections={{"top":true,"left":true,"bottom":true,"right":true}}
                verticalGuidelines={[50,150,250,450,550]}
                horizontalGuidelines={[0,100,200,400,500]}
                bounds={{"left":1,"top":1.5,"right":0,"bottom":0,"position":"css"}}
                resizable={true}
                rotatable={true}
                onClickGroup={e => {
                    selectoRef.current.clickTarget(e.inputEvent, e.inputTarget);
                }}
                onDrag={e=>{
                    console.log(e)
                    e.target.style.transform = e.transform;
                }}
                onRender={e => {
                    e.target.style.cssText += e.cssText;
                }}
                onRenderGroup={e => {
                    e.events.forEach(ev => {
                        ev.target.style.cssText += ev.cssText;
                    });
                }}
            />
            <Selecto
                ref={selectoRef}
                dragContainer={".elements"}
                selectableTargets={[".target"]}
                hitRate={0}
                selectByClick={true}
                selectFromInside={false}
                toggleContinueSelect={["shift"]}
                ratio={0}
                keyContainer={window}
                onDragStart={(e) => {
                    const target = e.inputEvent.target;
                    console.log('target',target.style.cssText);
                    console.log('targetO',document.querySelector(".target").style.cssText);
                    if (moveableRef.current.isMoveableElement(target) || targets.some(t => t === target || t.contains(target))) {
                        e.stop();
                    }
                }}
                onSelectEnd={e => {
                    if (e.isDragStartEnd) {
                        e.inputEvent.preventDefault();
                        moveableRef.current.waitToChangeTarget().then(() => {
                            moveableRef.current.dragStart(e.inputEvent);
                        });
                    }
                    setTargets(e.selected);
                }}
            />
           <div className='canvas-container elements selecto-area'>
               <div className='target'/>
               <div className='target'/>
               <div className='target'/>
           </div>
        </div>
    )
}
export default Editor;