import Moveable from "moveable";
import Selecto from "selecto";
import React from "react";
let moveAbleObj;
let targets = [];
export const initializeMoveAble = ()=> {
     moveAbleObj = new Moveable(document.body, {
        target: targets,
        // If the container is null, the position is fixed. (default: parentElement(document.body))
        container: document.querySelector('container'),
        draggable: true,
        resizable: true,
        scalable: true,
        rotatable: true,
        // Enabling pinchable lets you use events that
        // can be used in draggable, resizable, scalable, and rotateable.
        pinchable: false, // ["resizable", "scalable", "rotatable"]
        origin: true,
        keepRatio: true,
        // Resize, Scale Events at edges.
        edge: false,
        throttleDrag: 0,
        throttleResize: 0,
        throttleScale: 0,
        throttleRotate: 0,
    });
    moveAbleObj.on("clickGroup", e => {
        selectoRef.clickTarget(e.inputEvent, e.inputTarget);
    });
    moveAbleObj.on("drag",e=>{
        console.log(e.beforeTranslate)
    })
    moveAbleObj.on("render", e => {
        e.target.style.cssText += e.cssText;
    });
    moveAbleObj.on("renderGroup", e => {
        e.events.forEach(ev => {
            ev.target.style.cssText += ev.cssText;
        });
    })
}
function setTargets (nextTargets){
    targets = nextTargets;
    moveAbleObj.targets = targets;
}
export const initializeSelecto = ()=>{
    const selecto = new Selecto({
        selectByClick:true,
        dragContainer:document.querySelector('container'),
        // Targets to select. You can register a queryselector or an Element.
        selectableTargets: [".target"],
        // Whether to select by click (default: true)
        selectFromInside: false,
    });

    selecto.on("select", e => {
        console.log('selected')
        e.added.forEach(el => {
            el.classList.add("selected");
        });
        e.removed.forEach(el => {
            el.classList.remove("selected");
        });
    });
    selecto.on('dragStart', e=>{
        const target = e.inputEvent.target;
        console.log('target',moveAbleObj.targets);
        if (moveAbleObj.isMoveableElement(target) || targets?.some(t => t === target || t.contains(target))) {
            e.stop();
        }
    })

    selecto.on('selectEnd', e=>{
        console.log("e.isDragStartEnd",e.isDragStartEnd)
            if (e.isDragStartEnd) {
                e.inputEvent.preventDefault();
                moveAbleObj.waitToChangeTarget().then(() => {
                    moveAbleObj.dragStart(e.inputEvent);
                });
            }
        setTargets(e.selected)
    })

}


