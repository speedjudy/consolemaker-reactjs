import * as React from "react";
import Moveable from "react-moveable";
import styled from "styled-components";
import AppContext from "../../context/context";
import { useEffect } from "react";

export default function ImageMove(props) {
	const { isXbox } = props
	const myContext = React.useContext(AppContext);
	const [target, setTarget] = React.useState();
	const [frame] = React.useState({
		translate: [0, 0],
		rotate: 0
	});
	const moveableRef = React.useRef();
	React.useEffect(() => {
		const target = document.querySelector('.target');
		if (target !== null) {
			setTarget(target);

			target.addEventListener("load", () => {
				setTimeout(() => {
					moveableRef.current.updateRect();
				}, 2000);
			});
		}
	}, [myContext.images]);
	return (
		<Wrapper display={myContext.isLogo} sideflag={myContext.sideflag || isXbox}>
			{
				myContext.images.length !== 0 ? (
					<img alt="no img" id="imagemove" src={myContext.images[0]['data_url']} style={{ zIndex: "300", margin: "0px auto", position: "relative", display: "block" }} className="target" />
				) : (() => { })()
			}
			{
				myContext.isLogo && myContext.images.length > 0 && (myContext.sideflag || isXbox) && myContext.imgStatus ?
					<Moveable
						ref={moveableRef}
						target={target}
						zoom={0.6}
						draggable={true}
						throttleDrag={0}
						resizable={true}
						throttleResize={0}
						rotatable={true}
						rotationPosition={"top"}
						throttleRotate={0}
						origin={false}
						keepRatio={true}
						onDragStart={({ set }) => {
							set(frame.translate);
						}}
						onDrag={({ beforeTranslate }) => {
							frame.translate = beforeTranslate;
						}}
						onResizeStart={({ setOrigin, dragStart }) => {
							setOrigin(["%", "%"]);
							dragStart && dragStart.set(frame.translate);
						}}
						onResize={({ target, width, height, drag }) => {
							frame.translate = drag.beforeTranslate;
							target.style.width = `${width}px`;
							target.style.height = `${height}px`;
						}}
						onRotateStart={({ set }) => {
							set(frame.rotate);
						}}
						onRotate={({ beforeRotate }) => {
							frame.rotate = beforeRotate;
						}}
						onRender={({ target }) => {
							target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]
								}px) rotate(${frame.rotate}deg)`;
						}}
						renderDirections={["nw", "ne", "se", "sw"]}
					/>
					: (() => { })()
			}
		</Wrapper>
	);
}



const Wrapper = styled.div`
  position: absolute;
  word-break: break-all;
  z-index: 100;
	display: ${props => props.display ? 'contents' : 'none'};
	transition: all 1s;
	width: 100%;
	
	
	
	img {
		display: inline-block;
		cursor: grab;
		width: auto;
		height: 100%;
	}
	 & > div:nth-child(2) {
	    & > div:nth-child(1) {
	        height: 30px;
            @media screen and (max-width: 800px) {
               height: 10px;
            }
         }
	 }
`
