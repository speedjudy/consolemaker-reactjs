import paddle from './paddle.png';
import dominL from './dominL.png';
import dominR from './dominR.png';
import DTrigger from './smar-triggers.png';
import text from './text.png';
import logo from './logo.png';
import add from './addtobtn.png';
import checkout_btn from '../../atc-icon.png'
import React from "react";
export const PersonalizeImg = logo;
export const PaddleImg = paddle;
export const DominLimg = dominL;
export const DominRImg = dominR;
export const TextImg = text;
export const DTriggerImg = DTrigger;

const getImageBySKU = (sku, name) => {
  switch (name.toLowerCase()){
    case 'design': {
      let img = require('./design.png')
      if (sku === 'byoxbx' || sku === 'byoxbxled')
          img = require('./x_design.png')
      else if (sku === 'build-your-own-ps4')
        img = require('./4_design.png')
      else if (sku === 'buildyourownELITExb1')
        img = require('./el_design.png')
      return img
    }
    case 'abxy': {
      let img = require('./abxy.png')
      if (sku === 'byoxbx' || sku === 'byoxbxled')
        img = require('./x_abxy.png')
      else if (sku === 'build-your-own-ps4')
        img = require('./4_abxy.png')
      else if (sku === 'buildyourownELITExb1')
        img = require('./x_design.png')
      return img
    }
    case 'dpad': {
      let img = require('./dpad.png')
      if (sku === 'byoxbx' || sku === 'byoxbxled')
        img = require('./x_dpad.png')
      else if (sku === 'build-your-own-ps4')
        img = require('./4_dpad.png')
      else if (sku === 'buildyourownELITExb1')
        img = require('./x_design.png')
      return img
    }
    case 'l thumbstick': {
      let img = require('./thumbstick.png')
      if (sku === 'byoxbx' || sku === 'byoxbxled')
        img = require('./thumbstick l.png')
      else if (sku === 'build-your-own-ps4')
        img = require('./4_thumbstick_l.png')
      else if (sku === 'buildyourownELITExb1')
        img = require('./x_design.png')
      return img
    }
    case 'r thumbstick': {
      let img = require('./thumbstick.png')
      if (sku === 'byoxbx' || sku === 'byoxbxled')
        img = require('./thumbstick r.png')
      else if (sku === 'build-your-own-ps4')
        img = require('./4_thumbstick_r.png')
      else if (sku === 'buildyourownELITExb1')
        img = require('./x_design.png')
      return img
    }
    case 'start buttons': {
      let img = require('./startbtn.png')
      if (sku === 'byoxbx' || sku === 'byoxbxled')
        img = require('./x_start_back.png')
      else if (sku === 'build-your-own-ps4')
        img = require('./4_start_back.png')
      else if (sku === 'buildyourownELITExb1')
        img = require('./x_design.png')
      return img
    }
    case 'touchpad': {
      let img = require('./touchpad.png')
      if (sku === 'build-your-own-ps4')
        img = require('./4_touchpad.png')
      else if (sku === 'buildyourownELITExb1')
        img = require('./x_design.png')
      return img
    }
    case 'lb rb': {
      return require('./lb rb.png')
    }
    case 'trim': {
      let img = require('./trim.png')
      if (sku === 'byoxbx' || sku === 'byoxbxled')
        img = require('./top trim.png')
      else if (sku === 'buildyourownELITExb1')
        img = require('./x_design.png')
      return img
    }
    case 'triggers': {
      let img = require('./trigger.png')
      if (sku === 'byoxbx' || sku === 'byoxbxled')
        img = require('./xbx_triggers.png')
      else if (sku === 'build-your-own-ps4')
        img = require('./4_triggers.png')
      else if (sku === 'buildyourownELITExb1')
        img = require('./x_design.png')
      return img
    }
    case 'guide': {
      return require('./4_guide.png')
    }
    case 'led': {
      return require('./led.png')
    }
    case 'esports': {
      return require('./esports.png')
    }
    case 'rear design': {
      let img = require('./reardesign.png')
      if (sku === 'byoxbx' || sku === 'byoxbxled')
        img = require('./x_rear_shell.png')
      else if (sku === 'build-your-own-ps4')
        img = require('./4_rear_design.png')
      else if (sku === 'buildyourownELITExb1')
        img = require('./x_design.png')
      return img
    }
    case 'grips': {
      return require('./grips.png')
    }
    case 'razorback maxfire': {
      return require('./razor.png')
    }
    case 'smart triggers': {
      return require('./smar-triggers.png')
    }
  }

}
export const OPTIONS_CAN_HAVE = (myContext, selectedController = null) => [
  { name: 'Design', image: getImageBySKU(selectedController.id, 'Design'), zoom: 1, data: myContext.designData, onClick: myContext.setDesign, selectionData: myContext.design, desc: 'Customize the controller with a design of your choosing. Please note: the finished design (colours) may differ slightly due to the production process.'},
  { name: 'Abxy', image: getImageBySKU(selectedController.id, 'abxy'), zoom: 1, data: myContext.abxyData, onClick: myContext.setAbxy, selectionData: myContext.abxy, desc: 'Further customize your handcrafted CM controller with custom Action buttons. These beautiful, high-quality buttons are designed to give that added ‘wow factor’ to your unique controller.'},
  { name: 'Dpad', image: getImageBySKU(selectedController.id, 'dpad'), zoom: 1, data: myContext.dpadData, onClick: myContext.setDpad, selectionData: myContext.dpad, desc: 'Further customize your handcrafted CM controller with a custom Dpad. These beautiful, high-quality buttons are designed to give that added ‘wow factor’ to your unique controller.'},
  { name: 'L Thumbstick', image: getImageBySKU(selectedController.id, 'L Thumbstick'), zoom: 0.7, data: myContext.thubmLData, onClick: myContext.setThumbstickL, selectionData: myContext.thumbstickL, desc: 'Accommodate different hand sizes and play styles with our Interchangeable thumbsticks or select a standard thumbstick in a variety of colours to match your style.'},
  { name: 'R Thumbstick', image: getImageBySKU(selectedController.id, 'R Thumbstick'), zoom: 0.7, data: myContext.thubmRData, onClick: myContext.setThumbstickR, selectionData: myContext.thumbstickR, desc: 'Accommodate different hand sizes and play styles with our Interchangeable thumbsticks or select a standard thumbstick in a variety of colours to match your style.'},
  { name: 'Start Buttons', image: getImageBySKU(selectedController.id, 'Start Buttons'), zoom: 1, data: myContext.startBackData, onClick: myContext.setStartBtn, selectionData: myContext.startBtn, desc: 'Further customize your handcrafted CM controller with custom Start Buttons. These beautiful, high-quality buttons are designed to give that added ‘wow factor’ to your unique controller.'},
  { name: 'Touchpad', image: getImageBySKU(selectedController.id, 'touchpad'), zoom: 1, data: myContext.thuchPadData, onClick: myContext.setTouchpad, selectionData: myContext.touchpad, desc: 'Further customize your handcrafted CM controller with a custom Touchpad. These beautiful, high-quality components are designed to give that added ‘wow factor’ to your unique controller.'},
  { name: 'LB RB', hasBack: true, image: getImageBySKU(selectedController.id, 'LB RB'), zoom: 1, data: myContext.lbRBData, onClick: myContext.setLbRb, selectionData: myContext.lbRb, desc: 'Further customize your handcrafted CM controller with custom LB RB buttons. These beautiful, high-quality buttons are designed to give that added ‘wow factor’ to your unique controller.'},
  { name: 'Trim', hasBack: true, backOnly: (selectedController.id === 'byoxbx' || selectedController.id === 'byoxbxled'), sideFlag: (selectedController.id === 'byoxbx' || selectedController.id === 'byoxbxled'), image: getImageBySKU(selectedController.id, 'trim'), zoom: 1, data: myContext.trimData, onClick: myContext.setTrim, selectionData: myContext.trim, desc: 'Further customize your handcrafted CM controller with a custom Trim. These beautiful, high-quality components are designed to give that added ‘wow factor’ to your unique controller.'},
  { name: 'Triggers', hasBack: true, backOnly: (selectedController.id === 'byoxbx' || selectedController.id === 'byoxbxled'), image: getImageBySKU(selectedController.id, 'Triggers'), zoom: 1, sideFlag: true, data: myContext.triggersData, onClick: myContext.setTrigger, selectionData: myContext.trigger, desc: 'Further customize your handcrafted CM controller with custom Triggers. These stunning, high-quality triggers are designed to give that added ‘wow factor’ to your unique controller.'},
  { name: 'Guide', image: getImageBySKU(selectedController.id, 'Guide'), zoom: 1, data: myContext.guideData, onClick: myContext.setGuide, selectionData: myContext.guide, desc: 'Further customize your handcrafted CM controller with a custom guide button. This beautiful, high-quality button is designed to give that added ‘wow factor’ to your unique controller.'},
  { name: 'LED', image: getImageBySKU(selectedController.id, 'Led'), zoom: 1, data: myContext.ledData, onClick: myContext.setLed, selectionData: myContext.led, desc: 'Illuminate your controller with a different colour led button. We will change the default white LED to a colour of your choosing.'},
  { name: 'eSports', image: getImageBySKU(selectedController.id, 'eSports'), zoom: 0.7, sideFlag: true, data: myContext.esportsData, mustShow: myContext.esportsData, selectionData: myContext.esportsFlag > 0, desc: 'Significantly reduce the amount of time required to execute complex inputs with a Paddle Kit or Domin8or Buttons.\n\nBoth variants simulate any face button and allow thumbs to remain on the thumbsticks - shortening response time between actions.\n\n' +
        'Remappable Technology allows you to reprogram one of eight functions (X, O, Square, Triangle, Left D-Pad, Right D-Pad, L3, R3) to any back paddle or Domin8or Button instantaneously.\n\n' +
        '*Paddle Kits come with 4 remappable paddles as standard.'},
  { name: 'Rear Design', hasBack: true, backOnly: (selectedController.id === 'byoxbx' || selectedController.id === 'byoxbxled'), image: getImageBySKU(selectedController.id, 'Rear Design'), zoom: 1, sideFlag: true, disableWhen: myContext.paddle, data: myContext.rearDesignData, onClick: myContext.setRearDesign, selectionData: myContext.rearDesign, desc: 'Complete your controller design with a customized Rear Shell. Each rear shell is finished to an incredibly high standard, with durability and appearance top of our priorities.'},
  { name: 'Grips', hasBack: true, backOnly: (selectedController.id === 'byoxbx' || selectedController.id === 'byoxbxled'), sideFlag: true, image: getImageBySKU(selectedController.id, 'Grips'), zoom: 1, data: myContext.gripsData, onClick: myContext.setGrips, selectionData: myContext.grips, desc: 'Top-quality grips in a variety of colours to improve hand control and increase comfort during extended periods of gameplay.\n\n' +
        'Our rubber grips have a military grade coating that dramatically improves control and comfort during gameplay, good for sweaty hands.'},
  { name: 'Razorback Maxfire', showPartSelect: false, image: getImageBySKU(selectedController.id, 'Razorback Maxfire'), zoom: 0.7, sideFlag: true, sumData: myContext.razorBackData, data: myContext.razorBackData.data, mustShow: myContext.razorBackData.data, selectionData: myContext.razorBackData.is_default, desc: 'Upgrade your controller hardware with Razorback Maxfire! The Razorback Maxfire comes with all of the features you could ever need to give you an advantage over the competition, including Rapid Fire, Drop Shot, Jump Shot, Quick Scope and much more!'},
  { name: 'Smart Triggers', showPartSelect: false, image: getImageBySKU(selectedController.id, 'Smart Triggers'), zoom: 1, sideFlag: true, data: myContext.dtriggersData, selectionData: myContext.digital_trigger, desc: 'For shooter games, we recommend using the smart triggers. It reduces the range of motion to 2mm and provides a digital “mouse click” feel in place of the standard full range of motion.\n\nThis feature is only recommended for players who exclusively play shooter games and do not require a full range of motion.'},
]
//Text and Logo
export const OPTIONS_MANUAL_SHOW = (selectedController = null) => [
  { name: 'Personalization', showPartSelect: false, sideFlag: (selectedController.id === 'byoxbx' || selectedController.id === 'byoxbxled' || selectedController.id === 'buildyourownELITExb1'), image: logo, zoom: 0.7,  manualShow: true, desc: 'Take your controller to another level with a custom logo or text printed to your controller.\n\n' +
        'These are printed directly on to your controller to a high standard with quality and durability guaranteed. We do not use stickers or vinyl; this is the real deal!'},
  { name: 'Add to cart', showPartSelect: false, image: checkout_btn, zoom: 0.8, manualShow: true, faFont: <i style={{fontSize: 33, width: 49, marginLeft: 10}} className='fa fa-shopping-cart'/>}
]
export const manualSummary = () => [
    'Razorback Maxfire', 'eSports', 'Smart Triggers', ''
]
