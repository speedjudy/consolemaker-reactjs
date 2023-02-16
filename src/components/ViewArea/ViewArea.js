import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import html2canvas from 'html2canvas';
import downloadjs from "downloadjs";
import Moveable, { Scalable } from "react-moveable";
import AppContext from "../../context/context";
import ImageMove from "../ImageMove/ImageMove";
import TextMove from "../TextMove/TextMove";
import { DefaultPlayer as Video } from 'react-html5video';
// import download from "downloadjs";
// import PS5_FRONT_VIEW from "../../assets/images/models/PS5_FRONT_VIEW.png";
// import PS5_REAR_VIEW from "../../assets/images/models/PS5_REAR_VIEW.png";
// import XBOX_FRONT_VIEW from "../../assets/images/models/XBOX_FRONT_VIEW.png";
// import XBOX_REAR_VIEW from "../../assets/images/models/XBOX_REAR_VIEW.png";
// import PS4_FRONT_VIEW from "../../assets/images/models/PS4_FRONT_VIEW.png";
// import PS4_REAR_VIEW from "../../assets/images/models/PS4_REAR_VIEW.png";
// import ELITE_FRONT_VIEW from "../../assets/images/models/ELITE_FRONT_VIEW.png";
// import ELITE_REAR_VIEW from "../../assets/images/models/ELITE_REAR_VIEW.png";
import PS5_MP4_FRONT_VIEW from '../../assets/images/models/PS5_MP4_FONT_VIEW.mp4'
import XBOX_MP4_FRONT_VIEW from '../../assets/images/models/XBOX_MP4_FRONT_VIEW.mp4'

import { PS5_FRONT_VIEW_B64, PS5_REAR_VIEW_B64, XBOX_REAR_VIEW_B64, XBOX_FRONT_VIEW_B64, ELITE_FRONT_VIEW_B64, ELITE_REAR_VIEW_B64, PS4_FRONT_VIEW_B64, PS4_REAR_VIEW_B64 } from "../../assets/images/main_assets/main_images";

const ViewArea = (props) => {

  const [showSelectedDesign, setShowSelectedDesign] = useState(false)
  let FRONT_IMG_MODEL = PS5_FRONT_VIEW_B64
  let REAR_IMG_MODEL = PS5_REAR_VIEW_B64
  if (props.controllerId === 'byoxbx' || props.controllerId === 'byoxbxled') {
    FRONT_IMG_MODEL = XBOX_FRONT_VIEW_B64
    REAR_IMG_MODEL = XBOX_REAR_VIEW_B64
  }
  else if (props.controllerId === 'build-your-own-ps4') {
    FRONT_IMG_MODEL = PS4_FRONT_VIEW_B64
    REAR_IMG_MODEL = PS4_REAR_VIEW_B64
  }
  else if (props.controllerId === 'buildyourownELITExb1') {
    FRONT_IMG_MODEL = ELITE_FRONT_VIEW_B64
    REAR_IMG_MODEL = ELITE_REAR_VIEW_B64
  }
  const myContext = React.useContext(AppContext);
  const [isover_text, setOver_text] = React.useState(1);
  const vidRef = useRef(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  useEffect(() => {

    // document.addEventListener('click', function(event) {
    //   var isClickInside = document.getElementById('txtmove').contains(event.target);
    //   if (isClickInside === undefined || !isClickInside) {
    //     myContext.setImgStatus(false);
    //     console.log('-------------');
    //     var isClickInside1 = document.getElementById('imagemove').contains(event.target);
    //     if (!isClickInside1) {
    //       myContext.setImgStatus(false);
    //     } else {
    //       myContext.setImgStatus(true);
    //     }
    //   } else {
    //     myContext.setImgStatus(true);
    //     myContext.setTxtStatus(false);
    //   }
    // });

    // new
    document.addEventListener('click', function (event) {
      let flag = 0;
      if (document.getElementById('txtmove') !== null) {
        const isClickInside = document.getElementById('txtmove').contains(event.target);
        if (isClickInside) {
          myContext.setTxtStatus(true);
          myContext.setImgStatus(false);
          flag = 1;
        }
      }
      if (document.getElementById('imagemove') !== null) {
        const isClickInside = document.getElementById('imagemove').contains(event.target);
        if (isClickInside) {
          myContext.setImgStatus(true);
          myContext.setTxtStatus(false);
          flag = 1;
        }
      }

      if (flag === 0) {
        myContext.setImgStatus(false);
        myContext.setTxtStatus(false);
      }
    });
  }, []);


  const handleCaptureClick = async () => {
    const canvas = await html2canvas(document.getElementById('viewer'));
    const dataURL = canvas.toDataURL('image/png');
    downloadjs(dataURL, 'download.png', 'image/png');
    // if (myContext.sideflag) {
    // } else {
    //   const canvas = await html2canvas(document.getElementById('backend'));
    //   const dataURL = canvas.toDataURL('image/png');
    //   downloadjs(dataURL, 'download.png', 'image/png');
    // }
  };

  // React.useEffect(() => {
  //   console.log('is it right?')
  // }, [myContext.AniImg]);

  const updateDomin8orButtons = (url, type) => {
    return url.replace('@LEFT_RIGHT@', type)
  }
  useEffect(() => {
    setShowSelectedDesign(!(myContext.hoverImg && myContext.hoverImg.image && myContext.hoverImg.image.includes('/design/')))
  }, [myContext.hoverImg])

  useEffect(() => {
    if (myContext.partHover) {
      setTimeout(() => {
        myContext.setPartHover(null)
      }, 2000)
    }
  }, [myContext.partHover])

  useEffect(() => {
    if (vidRef.current) {
      vidRef.current.videoEl.play()
      myContext.setLedDataLoading(false)
    }
  }, [])
  return (
    <Wrapper isover_text={isover_text} id="total">
      <LocalHeader flag={myContext.sideflag}>
        <div>
          <span />
        </div>
        <div style={{ flexDirection: 'column' }}>
          <div>
            <span onClick={() => myContext.setSideflag(true)}> Front </span>
            <span onClick={() => myContext.setSideflag(false)}> Back </span>
            <span onClick={() => myContext.setSideflag(!myContext.sideflag)}>
              <img alt="what is it?" />
            </span>
          </div>
          {/*<span style={{cursor: 'pointer', alignSelf: 'center', marginTop: 15}} title={'share'} onClick={() => onShareClicked()}>*/}
          {/*            <i style={{fontSize: 25, color: '#000000'}} className="fa fa-share"/>*/}
          {/*</span>*/}
        </div>
        <div style={{ flexDirection: 'row' }}>
          <div onClick={() => myContext.setSideflag(!myContext.sideflag)}><img alt="what is it?" /></div>
          {/*<span style={{cursor: 'pointer', marginTop: 26, marginLeft: 15}} title={'share'} onClick={() => onShareClicked()}>*/}
          {/*            <i style={{fontSize: 25, color: '#000000'}} className="fa fa-share"/>*/}
          {/*</span>*/}
        </div>
      </LocalHeader>
      <Viewer flag={myContext.sideflag} width1="60%" width2="20%" top1="10%" top2="60%">
        <div>
          <div id="viewer">
            <div id="frontend">
              <div>
                <div>
                  {(props.controllerId !== 'byops5led' && props.controllerId !== 'byoxbxled') ?
                    <img className={`img-front-hover`} src={FRONT_IMG_MODEL} />
                    :
                    <div style={{ zIndex: 0, }}>
                      <Video ref={vidRef} playsInline autoPlay loop muted controls={[]} onPlay={() => {
                        myContext.setLedDataLoading(false)
                      }}>
                        <source src={props.controllerId === 'byops5led' ? PS5_MP4_FRONT_VIEW : XBOX_MP4_FRONT_VIEW} type="video/mp4" />
                        Your browser does not support the video tag.
                      </Video>
                    </div>
                  }

                  {
                    (myContext.design !== null && myContext.designData.items.length && showSelectedDesign) ? <img className={`img-front-hover ${myContext.partHover === 'Design' ? 'zoom-in-out-box' : ''}`} src={myContext.designData.items[myContext.design[0]][myContext.design[1]].image} /> : null
                  }
                  {
                    (myContext.abxy !== null && myContext.abxyData.items.length) ? <img className={`img-front-hover ${myContext.partHover === 'Abxy' ? 'zoom-in-out-box' : ''}`} src={myContext.abxyData.items[myContext.abxy[0]][myContext.abxy[1]].image} /> : null
                  }
                  {
                    (myContext.dpad !== null && myContext.dpadData.items.length) ? <img className={`img-front-hover ${myContext.partHover === 'Dpad' ? 'zoom-in-out-box' : ''}`} src={myContext.dpadData.items[myContext.dpad[0]][myContext.dpad[1]].image} /> : null
                  }
                  {
                    (myContext.thumbstickL !== null && myContext.thubmLData.items.length) ? <img className={`img-front-hover ${myContext.partHover === 'L Thumbstick' ? 'zoom-in-out-box' : ''}`} src={myContext.thubmLData.items[myContext.thumbstickL[0]][myContext.thumbstickL[1]].image} /> : null
                  }
                  {
                    (myContext.thumbstickR !== null && myContext.thubmRData.items.length) ? <img className={`img-front-hover ${myContext.partHover === 'R Thumbstick' ? 'zoom-in-out-box' : ''}`} src={myContext.thubmRData.items[myContext.thumbstickR[0]][myContext.thumbstickR[1]].image} /> : null
                  }

                  {/*LB RB*/}
                  {
                    (myContext.lbRb !== null && myContext.lbRBData.items.length) ? <img className={`img-front-hover ${myContext.partHover === 'LB RB' ? 'zoom-in-out-box' : ''}`} src={myContext.lbRBData.items[myContext.lbRb[0]][myContext.lbRb[1]].image} /> : null
                  }

                  {/*LED*/}
                  {
                    (myContext.led !== null && myContext.ledData.items.length) ? <img className={`img-front-hover ${myContext.partHover === 'LED' ? 'zoom-in-out-box' : ''}`} src={myContext.ledData.items[myContext.led[0]][myContext.led[1]].image} /> : null
                  }

                  {/*GRIPS*/}
                  {
                    (myContext.grips !== null && myContext.gripsData.items.length) ? <img className={`img-front-hover ${myContext.partHover === 'Grips' ? 'zoom-in-out-box' : ''}`} src={myContext.gripsData.items[myContext.grips[0]][myContext.grips[1]].image} /> : null
                  }

                  {/*GUIDE*/}
                  {
                    (myContext.guide !== null && myContext.guideData.items.length) ? <img className={`img-front-hover ${myContext.partHover === 'Guide' ? 'zoom-in-out-box' : ''}`} src={myContext.guideData.items[myContext.guide[0]][myContext.guide[1]].image} /> : null
                  }
                  {
                    (myContext.startBtn !== null && myContext.startBackData.items.length) ? <img className={`img-front-hover ${myContext.partHover === 'Start Buttons' ? 'zoom-in-out-box' : ''}`} src={myContext.startBackData.items[myContext.startBtn[0]][myContext.startBtn[1]].image} /> : null
                  }
                  {
                    (myContext.touchpad !== null && myContext.thuchPadData.items.length) ? <img className={`img-front-hover ${myContext.partHover === 'Touchpad' ? 'zoom-in-out-box' : ''}`} src={myContext.thuchPadData.items[myContext.touchpad[0]][myContext.touchpad[1]].image} /> : null
                  }
                  {
                    (myContext.trim !== null && myContext.trimData.items.length) ? <img className={`img-front-hover ${myContext.partHover === 'Trim' ? 'zoom-in-out-box' : ''}`} src={myContext.trimData.items[myContext.trim[0]][myContext.trim[1]].image} /> : null
                  }
                  {
                    (myContext.trigger !== null && myContext.triggersData.items.length) ? <img className={`img-front-hover ${myContext.partHover === 'Triggers' ? 'zoom-in-out-box' : ''}`} src={myContext.triggersData.items[myContext.trigger[0]][myContext.trigger[1]].image} /> : null
                  }
                  {
                    (myContext.rearDesign !== null && myContext.rearDesignData.items.length) ? <img className={`img-front-hover ${myContext.partHover === 'Rear Design' ? 'zoom-in-out-box' : ''}`} src={myContext.rearDesignData.items[myContext.rearDesign[0]][myContext.rearDesign[1]].image} /> : null
                  }
                  {myContext.hoverImg && <HoverImg className={`img-front-hover ${myContext.partHover === 'Abxy' ? 'zoom-in-out-box' : ''}`} img={myContext.hoverImg.image} />}
                  {/* <AniImg i={myContext.aniImg !== null ? myContext.aniImg : 'null'} f={myContext.aniFlag}></AniImg> */}
                  {/*Text and Logo*/}
                  {(props.controllerId !== 'byoxbx' && props.controllerId !== 'byoxbxled' && props.controllerId !== 'buildyourownELITExb1') &&
                    <SpecialArea showBtn={(myContext.selectedOption && myContext.selectedOption.name === 'Personalization' && myContext.images.length > 0 && myContext.isLogo)} btnTop={props.controllerId === 'build-your-own-ps4' ? '15%' : '12%'} btnLeft={props.controllerId === 'build-your-own-ps4' ? '36%' : '37%'} sf={myContext.sideflag} top={props.controllerId === 'build-your-own-ps4' ? '20%' : '15%'} left={props.controllerId === 'build-your-own-ps4' ? '38%' : '39.3%'} si={myContext.selectedOption && myContext.selectedOption.name === 'Personalization'} id='specialArea'
                      onClick={() => {
                        if (myContext.isText || myContext.isLogo) {
                          myContext.setSnapIndex(myContext.menuItems.length - 2);
                          myContext.swiper.slideTo((myContext.menuItems.length - 2), 300);
                        }
                      }}>
                      <div>
                        <div id="borderedArea" className={props.controllerId}>
                          <TextMove />
                          <ImageMove id="imagemove" />
                        </div>
                        <button style={{ cursor: 'pointer' }} onClick={() => {
                          myContext.setImages([])
                        }}><img className="deleteImg" src={require('../../assets/images/delete_bin_icon.png')} width={15} height={15} /></button>
                      </div>
                    </SpecialArea>}
                </div>
              </div>
            </div>

            <div id="backend">
              <div>
                <div>
                  <img className={`img-front-hover`} src={REAR_IMG_MODEL} alt='img' />
                  {
                    (myContext.trim !== null && myContext.trimData.items.length) ? <img className={`img-front-hover ${myContext.partHover === 'Trim' ? 'zoom-in-out-box' : ''}`} src={myContext.trimData.items[myContext.trim[0]][myContext.trim[1]].image_back} /> : null
                  }

                  {
                    (myContext.lbRb !== null && myContext.lbRBData.items.length) ? <img className={`img-front-hover ${myContext.partHover === 'LB RB' ? 'zoom-in-out-box' : ''}`} src={myContext.lbRBData.items[myContext.lbRb[0]][myContext.lbRb[1]].image_back} /> : null
                  }

                  {/*GRIPS*/}
                  {
                    (myContext.grips !== null && myContext.gripsData.items.length) ? <img className={`img-front-hover ${myContext.partHover === 'Grips' ? 'zoom-in-out-box' : ''}`} src={myContext.gripsData.items[myContext.grips[0]][myContext.grips[1]].image_back} /> : null
                  }
                  {
                    (myContext.trigger && myContext.triggersData && myContext.triggersData.items.length) ? <img className={`img-front-hover ${myContext.partHover === 'Triggers' ? 'zoom-in-out-box' : ''}`} src={myContext.triggersData.items[myContext.trigger[0]][myContext.trigger[1]].image_back} /> : null
                  }
                  {
                    (myContext.digital_trigger && myContext.dtriggersData) ? <img className={`img-front-hover ${myContext.partHover === 'Smart Triggers' ? 'zoom-in-out-box' : ''}`} src={require('../../assets/images/main_assets/smart-triggers/smart_triggers_back.png')} /> : null
                  }
                  {
                    (myContext.rearDesign && myContext.rearDesignData && myContext.rearDesignData.items.length) ? <img className={`img-front-hover ${myContext.partHover === 'Rear Design' ? 'zoom-in-out-box' : ''}`} src={myContext.rearDesignData.items[myContext.rearDesign[0]][myContext.rearDesign[1]].image_back} /> : null
                  }
                  {
                    (myContext.paddle !== null && myContext.paddleData && myContext.paddleData.items.length) ? <img className={`img-front-hover`} src={myContext.paddleData.items[myContext.paddle[0]][myContext.paddle[1]].image_back} /> : null
                  }
                  {
                    (myContext.ldomin_1 !== null && myContext.ldomin_2 !== null && myContext.dominSelectLeftData) ? <img className={`img-front-hover`} src={updateDomin8orButtons(myContext.dominSelectLeftData.items[myContext.ldomin_2].image_back, 'left')} /> : null
                  }
                  {
                    (myContext.rdomin_1 !== null && myContext.rdomin_2 !== null && myContext.dominSelectRightData) ? <img className={`img-front-hover`} src={updateDomin8orButtons(myContext.dominSelectRightData.items[myContext.rdomin_2].image_back, 'right')} /> : null
                  }

                  {(myContext.hoverImg && !myContext.hoverImg.image) && <HoverImgBack className={`img-front-hover back ${myContext.partHover === 'Abxy' ? 'zoom-in-out-box' : ''}`} img={myContext.hoverImg.image_back} />}
                  {/*Text and Logo*/}
                  {(props.controllerId === 'byoxbx' || props.controllerId === 'byoxbxled' || props.controllerId === 'buildyourownELITExb1') &&
                    <SpecialArea showBtn={(myContext.selectedOption && myContext.selectedOption.name === 'Personalization' && myContext.images.length > 0 && myContext.isLogo)}
                      btnTop={'27%'} btnLeft={'37%'} h={(props.controllerId === 'byoxbx' || props.controllerId === 'byoxbxled') ? '14%' : '20%'} sf={!myContext.sideflag} top={'31%'} left={(props.controllerId === 'byoxbx' || props.controllerId === 'byoxbxled') ? '39.6%' : '37.7%'} si={myContext.selectedOption && myContext.selectedOption.name === 'Personalization'} id='specialArea' onClick={() => {
                        if (myContext.isText || myContext.isLogo) {
                          myContext.setSnapIndex(myContext.menuItems.length - 2); //Text & Logo
                          myContext.swiper.slideTo((myContext.menuItems.length - 2), 300);
                        }
                      }}>
                      <div>
                        <div id="borderedArea" className={props.controllerId}>
                          <TextMove />
                          <ImageMove id="imagemove" isXbox={true} />
                        </div>
                        <button style={{ cursor: 'pointer' }} onClick={() => {
                          myContext.setImages([])
                        }}><img className="deleteImg" src={require('../../assets/images/delete_bin_icon.png')} width={15} height={15} /></button>
                      </div>
                    </SpecialArea>}
                </div>
              </div>
            </div>
          </div>
        </div>

      </Viewer>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  /* background-color: ${props => props.theme.bgColor}; */
  background-color: #E9E9EB;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .moveable-control {
    display: ${props => props.isover_text ? 'black' : 'none'}
  }
  
  .byops5 .moveable-control-box {
		position: fixed !important;
		top: 65px;
		left: unset;
	}
	@media screen and (max-width: 540px) {
		.byops5 .moveable-control-box {
			top: 26px;
		}
	}
	@media screen and (max-width: 414px) {
		.byops5 .moveable-control-box {
			top: 21px;
		}
	}
	@media screen and (max-width: 393px) {
		.byops5 .moveable-control-box {
			top: 9px;
		}
	}
	@media screen and (max-width: 375px) {
		.byops5 .moveable-control-box {
			top: 7px;
		}
	}


  .byoxbx .moveable-control-box {
		position: fixed !important;
		top: 133px;
		left: unset;
	}
	@media screen and (max-width: 540px) {
		.byoxbx .moveable-control-box {
			top: 26px;
		}
	}
	@media screen and (max-width: 414px) {
		.byoxbx .moveable-control-box {
			top: 40px;
		}
	}
	@media screen and (max-width: 393px) {
		.byoxbx .moveable-control-box {
			top: 17px;
		}
	}
	@media screen and (max-width: 375px) {
		.byoxbx .moveable-control-box {
			top: 17px;
		}
	}

  .build-your-own-ps4 .moveable-control-box {
		position: fixed !important;
		top: 82px;
		left: unset;
	}
	@media screen and (max-width: 540px) {
		.build-your-own-ps4 .moveable-control-box {
			top: 26px;
		}
	}
	@media screen and (max-width: 414px) {
		.build-your-own-ps4 .moveable-control-box {
			top: 25px;
		}
	}
	@media screen and (max-width: 393px) {
		.build-your-own-ps4 .moveable-control-box {
			top: 17px;
		}
	}
	@media screen and (max-width: 375px) {
		.build-your-own-ps4 .moveable-control-box {
			top: 17px;
		}
	}

  @media screen and (max-width: 800px) {
    height: 40%;
  }
  // @media screen and (max-width: 400px) {
  //   height: 50%;
  // }
  /* .moveable-line {
    display: none !important;
  } */
`

const Loading = styled.div`
  position: relative;
  top: 40%;
  z-index: 2;
  display: none;
`

const LocalHeader = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px 0;
  width: 100%;
  z-index: 500;
  @media screen and (max-width: 800px) {
      justify-content: center;
      position: absolute;
        bottom: 20px;
        height: 37px;
        padding: 0;
  }
  & > div:nth-child(1) {
    margin: 0 20px;
    display: flex;
    @media screen and (max-width: 800px) {
          display: none;
        }
    justify-content: center;
    align-items: center;
    gap: 20px;
    span {
      font-size: 30px;
      font-family: 'sofiapro';
      color: '#333333';
      @media screen and (max-width: 400px) {
        font-size: 20px;
      }
    }
    
    img {
      background-color: ${props => props.theme.HeadIconBgColor};
      padding: 10px;
      content: url(${props => props.theme.FlagIcon});
      border-radius: 15px;
      border: ${props => props.theme.DirectIconBorder};
    }
  }
  & > div:nth-child(2) {
    position: absolute;
    right: 20px;
    top: 20px;
    display: flex;
    @media screen and (max-width: 800px) {
      display: none;
    }
    & > div:nth-child(1) {
      position: relative;
      font-size: 12px;
      font-family: 'sofiapro';
      flex-direction: column;
      span {
        border-radius: 10px;
        padding: 5px 12px;
        cursor: pointer;
      }
      & > span:nth-child(1) {
        color: ${props => props.flag ? props.theme.SwapFrontColor : props.theme.SwapBackColor};
        background-color: ${props => props.flag ? props.theme.SwapFrontBgColor : props.theme.SwapBackBgColor};
        padding-right: 30px;
        border: ${props => props.theme.SwapBorder};
      }
      & > span:nth-child(2) {
        color: ${props => !props.flag ? props.theme.SwapFrontColor : props.theme.SwapBackColor};
        background-color: ${props => !props.flag ? props.theme.SwapFrontBgColor : props.theme.SwapBackBgColor};
        border: ${props => props.theme.SwapBorder};
      }
  
      & > span:nth-child(3) {
        position: absolute;
        top: -13px;
        left: 35%;
        padding: 10px;
        padding-bottom: 7px;
        background-color: ${props => props.theme.ThemeColor};
        img {
          content: url(${props => props.theme.SwapIcon});
        }
        /* box-shadow: 2px 2px 2px 2px #ccc; */
      }
    }
  }

  & > div:nth-child(3) {
    display: none;
    position: absolute;
    @media screen and (max-width: 800px) {
      display: flex;
      align-items: center;
      position: initial;
    }
    right: 20px;
    top: 10px;
    div {
      width: 30px;
      height: 30px;
      border-radius: 10px;
      border-radius: 10px;
    }
    /* & > div:nth-child(1) {
      background-color: ${props => props.theme.SwapFrontColor};
      border: ${props => props.theme.SwapBorder};
      display: flex;
      justify-content: center;
      img {
        transform: scale(0.6);
        content: url(${props => props.theme.FlagIcon});
      }
    } */

    & > div:nth-child(1) {
      background-color: ${props => props.theme.ThemeColor};
      border: 0;
      margin-top: 10px;
      @media only screen and (max-width: 375px) { 
        margin-top: 26px;
      }
      display: flex;
      justify-content: center;
      img {
        transform: scale(0.4);
        content: url(${props => props.theme.SwapIcon});
      }
    }
  }
`

const Viewer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  video {
    position: absolute;
    width: 100%;
  }
  & > div:nth-child(1) {
    width: 100%;
    height: 100%;
    display: flex;
    /* transform: scale(1.4); */
    justify-content: center;
    #viewer {
      position: relative;
      width: 100%;
      height: 100%;
      
      & > div:nth-child(1) {
        border-radius: 40px;
        // Frontend side
        position: absolute;
        z-index: ${props => !props.flag ? '100!important' : '99!important'};
        transition: all 1s, z-index 0s;
        left: 25%;
        top: ${props => props.flag ? '0%' : '65%'};
        width: 50%;
        transform: ${props => props.flag ? 'scale(1.4)' : 'scale(0.5)'};
        & > div:nth-child(1) {
          min-width: 100%;
          min-height: 100%;
          & > div:nth-child(1) {
            position: relative;
            width: auto;
            & > div:nth-child(1) {
              width: 100%;
              height: 100%;
              position: absolute;
              & > div:nth-child(1) {
                width: 100%;
                height: 100%;
                position: relative;
                z-index: 100;
              }
            }
            video {
                @media screen and (max-width: 400px) {
                     margin-top: -10px;
                  }
            }
            img {
              position: absolute;
              @media screen and (max-width: 400px) {
                 margin-top: -10px;
              }
              
              // width: 100%;
              /* transition: all 1s; */
            }
          }
        }
        
        @media screen and (max-width: 1500px) {
          top: ${props => props.flag ? '10%' : '65%'};
        }

        @media screen and (max-width: 1000px) {
          top: ${props => props.flag ? '20%' : '65%'};
          transform: ${props => props.flag ? 'scale(1.9)' : 'scale(0)'};
        }

        @media screen and (max-width: 800px) {
          top: ${props => props.flag ? '0%' : '65%'};
          transform: ${props => props.flag ? 'scale(1.4)' : 'scale(0)'};
        }
        @media screen and (max-width: 600px) {
          top: ${props => props.flag ? '0%' : '65%'};
          transform: ${props => props.flag ? 'scale(1.6)' : 'scale(0)'};
        }
        @media screen and (max-width: 400px) {
          top: ${props => props.flag ? '0%' : '65%'};
          transform: ${props => props.flag ? 'scale(2.1)' : 'scale(0)'};
        }
      }
      & > div:nth-child(2) {
        border-radius: 40px;
        z-index: ${props => props.flag ? '100!important' : '99!important'};
        // Backend side
        position: absolute;
        transition: all 1s, z-index 0s;
        /* width: ${props => !props.flag ? props.width1 : props.width2};
        left: ${props => !props.flag ? `calc((100% - ${props.width1}) / 2)` : `calc((100% - ${props.width2}) / 2)`};
        top: ${props => !props.flag ? props.top1 : props.top2}; */
        left: 25%;
        top: ${props => !props.flag ? '0%' : '65%'};
        width: 50%;
        transform: ${props => !props.flag ? 'scale(1.4)' : 'scale(0.5)'};
        & > div:nth-child(1) {
          width: 100%;
          height: 100%;
          & > div:nth-child(1) {
            position: relative;
            width: auto;
            & > div:nth-child(1) {
              width: 100%;
              height: 100%;
              position: absolute;
              & > div:nth-child(1) {
                width: 100%;
                height: 100%;
                position: relative;
                z-index: 100;
              }
            }
            img {
              position: absolute;
              @media screen and (max-width: 400px) {
                margin-top: -20px;
              }
              // width: 100%;
              /* transition: all 1s; */
            }
          }
        }

        @media screen and (max-width: 1500px) {
          top: ${props => !props.flag ? '10%' : '65%'};
        }

        @media screen and (max-width: 1000px) {
          top: ${props => !props.flag ? '20%' : '65%'};
          transform: ${props => !props.flag ? 'scale(1.9)' : 'scale(0)'};
        }

        @media screen and (max-width: 800px) {
          top: ${props => !props.flag ? '0%' : '65%'};
          transform: ${props => !props.flag ? 'scale(1.4)' : 'scale(0)'};
        }
        @media screen and (max-width: 600px) {
          top: ${props => !props.flag ? '0%' : '65%'};
          transform: ${props => !props.flag ? 'scale(1.6)' : 'scale(0)'};
        }
        @media screen and (max-width: 400px) {
          top: ${props => !props.flag ? '10%' : '65%'};
          transform: ${props => !props.flag ? 'scale(2.1)' : 'scale(0)'};
        }
      }
    }
  }
`

const HoverImg = styled.img`
  content: url(${props => props.img !== null ? props.img : 'null'});
  /* transition: all 2s!important; */
`
const HoverImgBack = styled.img`
  content: url(${props => props.img !== null ? props.img : 'null'});
  /* transition: all 2s!important; */
  @media (hover: none) {
    display: none;
  }
`
const SpecialArea = styled.div`
  background-color: transparent;
  position: absolute;
  height: 100%;
  width: 100%;
  /* padding-top: 66.6%; */
  top: 0;
  & > div:nth-child(1) {
    position: relative;
    height: 100%;
    width: 100%;
    padding-top: 63%;
    & > div:nth-child(1) {
      position: absolute;
      top: ${props => props.top ?? '15%'};
      left: ${props => props.left ?? '39.3%'};
      height: ${props => props.h ?? '20%'};
      outline: ${props => (props.sf && props.si === true) ? '2px dotted red' : 'none'};
      @media only screen and (max-width: 393px) { 
       outline: ${props => (props.sf && props.si === true) ? '1px dotted red' : 'none'};
        top: ${props => props.top ? (props.top === '15%' ? '6%' : '12%') : '6%'};
      }
      width: 24%;
      overflow: hidden;
      img {
        /* max-width: 100%;
        max-height: 100%; */
      }
    }
    button {
      display: ${props => props.showBtn ? 'flex' : 'none'};
      position: absolute;
      top: ${props => props.btnTop ?? '15%'};
      left: ${props => props.btnLeft ?? '39.3%'};
      padding-top: 3px;
      height: 24px;
      width: 24px;
      background-color: lightgray;
      z-index: 1000;
      border-radius: 12px;
      border: none;
      align-items: center;
      justify-content: center;
      
      @media screen and (max-width: 800px) {
          height: 14px !important;
          width: 14px !important;
          border-radius: 7px !important;
          padding-top: 0 !important;
          top: 8% !important;
          left: 35% !important;
          img {
            width: 9px !important;
            height: 9px !important;
          }
        }
       
       
    }
    .moveable-control {
      position: absolute;
      /* width: 10px;
      height: 10px;
      top:3px;
      left: 3px; */
    }
  }
`

export default ViewArea;
