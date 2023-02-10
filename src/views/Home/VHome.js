import React, { useEffect, useState } from "react";

import styled, { ThemeProvider } from "styled-components";
import Header from "../../components/Header/Header";
import Tools from "../../components/Tools/Tools";
import ViewArea from "../../components/ViewArea/ViewArea";
import AppContext from "../../context/context";

import { BsCheckLg } from 'react-icons/bs';
import { TiTimes } from 'react-icons/ti';
import MetaTags from 'react-meta-tags';
import { DarkMode, DayMode } from "../../theme";
import { OPTIONS_CAN_HAVE } from "../../assets/images/main_assets/cateImg/cate";
import _ from "lodash";
import axios from "axios";
import JSZip from "jszip";
import {
    M2_getData,
    M2_getEstimatedDeliveryDate,
    M2_getOptions,
    M2_getProductByQuoteId, M2_getQuoteId
} from "../../components/Tools/API_GetOption";

let selectedController = null
const VHome = (props) => {
    selectedController = props.selectedController
    const base_url = 'https://controllermodz.co.uk/media/mageworx/optionfeatures/product/option/value';
    const [object_data, setObjectData] = React.useState();
    const [object_keys, setObjectKeys] = React.useState();

    // const [showTextAndLogo, setShowTextAndLogo] = React.useState(false);

    const [design, setDesign] = React.useState([0, 0]);
    const [abxy, setAbxy] = React.useState([0, 0]);
    const [dpad, setDpad] = React.useState([0, 0]);
    const [thumbstickR, setThumbstickR] = React.useState([0, 0]);
    const [thumbstickL, setThumbstickL] = React.useState([0, 0]);
    const [startBtn, setStartBtn] = React.useState([0, 0]);
    const [touchpad, setTouchpad] = React.useState([0, 0]);
    const [trim, setTrim] = React.useState([0, 0]);
    const [trigger, setTrigger] = React.useState([0, 0]);
    const [rearDesign, setRearDesign] = React.useState([0, 0]);
    const [lbRb, setLbRb] = React.useState([0, 0]);
    const [led, setLed] = React.useState([0, 0]);
    const [grips, setGrips] = React.useState([0, 0]);
    const [guide, setGuide] = React.useState([0, 0]);
    // const [razorBack, setRazorBack] = React.useState(false);
    const [pad_esp_flag, setPad_esp_flag] = React.useState(true);
    const [paddle, setPaddle] = React.useState(null);
    const [sideflag, setSideflag] = React.useState(true);
    const [snapIndex, setSnapIndex] = React.useState(0);

    const [lrdomin, setLRdomin] = React.useState(false);

    const [ldomin_1, setLdomin1] = React.useState(null);
    const [ldomin_2, setLdomin2] = React.useState(null);
    const [rdomin_1, setRdomin1] = React.useState(null);
    const [rdomin_2, setRdomin2] = React.useState(null);

    const [modal_flag, setModalFlag] = React.useState(false);
    const [modal_desc, setModalDesc] = React.useState(false);

    const [aniFlag, setAniFlag] = React.useState(false);
    const [aniImg, setAniImg] = React.useState(null);
    const [hoverImg, setHoverImg] = React.useState(null);
    const [isFinished, setIsFinished] = React.useState(false);

    const [imgStatus, setImgStatus] = React.useState(false);
    const [txtStatus, setTxtStatus] = React.useState(false);

    const [esportsFlag, setEsportsFlag] = React.useState(0);

    const [remap, setRemap] = React.useState(false);

    useEffect(() => {
        const windowHeight = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        window.addEventListener('resize', windowHeight);
        windowHeight();
    }, [])
    function func_file_select() {
        const temp = document.getElementById('file_selector');
        setModalFlag(false);
        temp.click();
    }

    const func_reset = (ind, isAll = false) => {
        if (ind === 0) {
            setDesign([0, 0]);
            setDesignData(null)
        } else if (ind === 1) {
            setAbxy([0, 0]);
            setAbxyData(null)
        } else if (ind === 2) {
            setDpad([0, 0]);
            setDpadData(null)
        } else if (ind === 3) {
            setThumbstickL([0, 0]);
            setThumbLData(null)
        } else if (ind === 4) {
            setThumbstickR([0, 0]);
            setThumbRData(null)
        } else if (ind === 5) {
            setStartBtn([0, 0]);
            setStateBackData(null)
        } else if (ind === 6) {
            setTouchpad([0, 0]);
            setTouchPadData(null)
        } else if (ind === 7) {
            setTrim([0, 0]);
            setTrimData(null)
        } else if (ind === 8) {
            setTrigger([0, 0])
            setTriggersData(null)
        } else if (ind === 9) {
            setRearDesign([0, 0])
            setRearDesignData(null)
        } else if (ind === 10) {
            setRazorBackData({ is_default: false })
        } else if (ind === 11) {
            setPaddle(null)
            setPaddleData(null)
        } else if (ind === 12) {
            setLdomin1(null);
            setLdomin2(null);
        } else if (ind === 13) {
            setRdomin1(null);
            setRdomin2(null);
        } else if (ind === 14) {
            setDigital_trigger(false);
            setDtriggersData(null)
            setDigital_trigger_price(0)
        } else if (ind === 15) {
            setIsText(false);
            setTextVal('');
            setFamily(0);
        } else {
            setPersonalizationData(null)
            setEsportsData(null)
            setSelectedOption(null)
            setMenuItems([])
            setLogo(false);
            setImages([]);
            setLbRBData(null)
            setLedData(null)
            setGripsData(null)
            setGuideData(null)
            setLbRb([0, 0])
            setLed([0, 0])
            setGrips([0, 0])
            setGuide([0, 0])
            setPaddleData(null)
            setDominSelectLeftData(null)
            setDominSelectRightData(null)
            setEsportsFlag(0)
            setLRdomin(false)
            setPaddle(null)
            setOptionTabSelect({})
            setOptionItemSelect({})
        }
        if (isAll && ind < 16) {
            func_reset(ind + 1, isAll)
        }
    }


    const [digital_trigger, setDigital_trigger] = React.useState(false);
    const [digital_trigger_price, setDigital_trigger_price] = React.useState(0);


    const [selectedOption, setSelectedOption] = useState(null)
    const [menuItems, setMenuItems] = useState([])
    // Text
    const [isText, setIsText] = React.useState(false);
    const [textVal, setTextVal] = React.useState('');
    const [familyId, setFamily] = React.useState(0);
    const [textPrice, setTextPrice] = React.useState(0);

    // Logo
    const [isLogo, setLogo] = React.useState(false);
    const [logoPrice, setLogoPrice] = React.useState(0);
    const [images, setImages] = React.useState([]);

    const [initalPrice, setInitalPrice] = React.useState(selectedController.iniPrice);
    const [textColor, setTextColor] = React.useState('#999999');
    const [fontSize, setFontSize] = React.useState(30);

    const [assetsData, setAssetsData] = React.useState({});

    const [previewImage, setPreviewImage] = React.useState(null);
    const [logoImage, setLogoImage] = React.useState(null);

    const [perText, setPerText] = React.useState(null);
    const [perFont, setPerFont] = React.useState(null);
    const [perColor, setPerColor] = React.useState(null);


    const [designData, setDesignData] = React.useState(null);
    const [abxyData, setAbxyData] = React.useState(null);

    const [dpadData, setDpadData] = React.useState(null);
    const [thubmLData, setThumbLData] = React.useState(null);
    const [thubmRData, setThumbRData] = React.useState(null);
    const [startBackData, setStateBackData] = React.useState(null);
    const [thuchPadData, setTouchPadData] = React.useState(null);
    const [lbRBData, setLbRBData] = React.useState(null);
    const [ledData, setLedData] = React.useState(null);
    const [gripsData, setGripsData] = React.useState(null);
    const [guideData, setGuideData] = React.useState(null);

    const [partHover, setPartHover] = useState(null)

    const [copiedUrl, setCopiedUrl] = useState(null)

    const [estimatedDelivery, setEstimatedDelivery] = React.useState(null);
    const [trimData, setTrimData] = React.useState(null);
    const [triggersData, setTriggersData] = React.useState(null);
    const [paddleData, setPaddleData] = React.useState(null);
    const [dominSelectLeftData, setDominSelectLeftData] = React.useState(null);
    const [dominSelectRightData, setDominSelectRightData] = React.useState(null);
    const [rearDesignData, setRearDesignData] = React.useState(null);
    const [personalizationData, setPersonalizationData] = React.useState(null);
    const [remTechData, setRemTechData] = React.useState(null);
    const [razorBackData, setRazorBackData] = React.useState({ is_default: false });
    const [esportsData, setEsportsData] = React.useState(null);
    const [dtriggersData, setDtriggersData] = React.useState(null);
    const [textAndLogoData, setTextAndLogoData] = React.useState(null);

    // TablIndexs
    const [optionTabSelect, setOptionTabSelect] = React.useState({});
    const [optionItemSelect, setOptionItemSelect] = React.useState({});
    const [partSelected, setPartSelected] = useState({})

    const [DesigntabSelect, DesignSetTabSelect] = React.useState(0);
    const [AbxytabSelect, AbxySetTabSelect] = React.useState(0);
    const [DpadtabSelect, DpadSetTabSelect] = React.useState(0);
    const [ThumbLtabSelect, ThumbLSetTabSelect] = React.useState(0);
    const [ThumbRtabSelect, ThumbRSetTabSelect] = React.useState(0);
    const [StartBtntabSelect, StartBtnSetTabSelect] = React.useState(0);
    const [TouchpadtabSelect, TouchpadSetTabSelect] = React.useState(0);
    const [TrimtabSelect, TrimSetTabSelect] = React.useState(0);
    const [TriggertabSelect, TriggerSetTabSelect] = React.useState(0);

    const [dataLoading, setDataLoading] = useState(false)
    const [ledDataLoading, setLedDataLoading] = useState(selectedController.id === 'byoxbxled' || selectedController.id === 'byops5led')
    // ------------------- Swiper -------------------
    const [swiper, setSwiper] = React.useState(0);

    const imageSetting = {
        ledDataLoading,
        setLedDataLoading,
        swiper,
        setDataLoading,
        setSwiper,
        selectedOption,
        setSelectedOption,
        menuItems,
        setMenuItems,
        object_data,

        perText,
        perColor,
        perFont,
        previewImage,
        logoImage,
        designData,
        abxyData,
        dpadData,
        thubmLData,
        thubmRData,
        startBackData,
        thuchPadData,
        lbRBData,
        lbRb,
        setLbRb,
        led,
        setLed,
        ledData,
        grips,
        setGrips,
        gripsData,
        guide,
        setGuide,
        guideData,

        copiedUrl,
        setCopiedUrl,
        partHover,
        setPartHover,
        estimatedDelivery,
        trimData,
        triggersData,
        paddleData,
        setPaddleData,
        dominSelectLeftData,
        setDominSelectLeftData,
        dominSelectRightData,
        setDominSelectRightData,
        rearDesignData,
        setRearDesignData,
        personalizationData,
        remTechData,
        razorBackData,
        setRazorBackData,
        esportsData,
        dtriggersData,
        textAndLogoData,

        partSelected,
        setPartSelected,
        optionTabSelect,
        setOptionTabSelect,
        optionItemSelect,
        setOptionItemSelect,

        DesigntabSelect,
        DesignSetTabSelect,
        AbxytabSelect,
        AbxySetTabSelect,
        DpadtabSelect,
        DpadSetTabSelect,
        ThumbLtabSelect,
        ThumbLSetTabSelect,
        ThumbRtabSelect,
        ThumbRSetTabSelect,
        StartBtntabSelect,
        StartBtnSetTabSelect,
        TouchpadtabSelect,
        TouchpadSetTabSelect,
        TrimtabSelect,
        TrimSetTabSelect,
        TriggertabSelect,
        TriggerSetTabSelect,

        assetsData,
        design,
        setDesign,
        abxy,
        setAbxy,
        dpad,
        setDpad,
        thumbstickL,
        setThumbstickL,
        thumbstickR,
        setThumbstickR,
        startBtn,
        setStartBtn,
        touchpad,
        setTouchpad,
        trim,
        setTrim,
        trigger,
        setTrigger,
        rearDesign,
        setRearDesign,
        pad_esp_flag,
        setPad_esp_flag,
        paddle,
        setPaddle,

        ldomin_1,
        setLdomin1,
        ldomin_2,
        setLdomin2,
        rdomin_1,
        setRdomin1,
        rdomin_2,
        setRdomin2,

        digital_trigger,

        digital_trigger_price,

        setDigital_trigger,

        // showTextAndLogo,
        // setShowTextAndLogo,

        // text
        isText,
        setIsText,
        textVal,
        setTextVal,
        textPrice,
        setTextPrice,
        familyId,
        setFamily,
        textColor,
        setTextColor,
        fontSize,
        setFontSize,
        modal_flag,
        setModalFlag,
        modal_desc,
        setModalDesc,

        // Logo
        isLogo,
        setLogo,
        logoPrice,
        setLogoPrice,
        images,
        setImages,

        func_reset,

        sideflag,
        setSideflag,
        snapIndex,
        setSnapIndex,

        initalPrice,
        setInitalPrice,

        aniFlag,
        setAniFlag,
        aniImg,
        setAniImg,

        hoverImg,
        setHoverImg,

        isFinished,
        setIsFinished,

        imgStatus,
        setImgStatus,
        txtStatus,
        setTxtStatus,

        lrdomin,
        setLRdomin,

        esportsFlag,
        setEsportsFlag,

        remap,
        setRemap,

        fontFamiles: [
            // {name: 'Motion Picture', family: 'motion-picture'},
            { name: 'Bubblegum', family: 'bubblegum' },
            // {name: 'Carnival', family: 'carnival'},
            { name: 'COD', family: 'call-of-duty' },
            { name: 'Hero', family: 'hero' },
            // {name: 'Huntera', family: 'huntera'},
            { name: 'Mario', family: 'mario' },
            { name: 'Melted Monster', family: 'melted monster' },
            { name: 'Nightmare', family: 'nightmare' },
            { name: 'Strange Story', family: 'strange story' },
            { name: 'Pristina', family: 'pristina' },
            { name: 'Fortnite', family: 'luckiest-guy' },
            // {name: 'Delicia', family: 'delicia'},
            // {name: 'Luna', family: 'luna-medium'},
            // {name: 'Fortnite', family: 'fortnite'},
            // {name: 'Bazooka', family: 'bazooka'},
            // {name: 'Marker-Felt', family: 'marker-felt'},
            // {name: 'Zapfino', family: 'zapfino'},
            // {name: 'Abel', family: 'abel'},
        ]
    }

    // const [siteFlag, setSiteFlag] = React.useState(false);

    // React.useEffect(() => {
    //   setTimeout(() => {
    //     setSiteFlag(true);
    //   }, [6000])
    // }, [])

    // useEffect(() => {
    //     console.log('hoverImg:', hoverImg)
    // }, [hoverImg])

    const getIndexByName = async (name, object_data, object_keys) => {
        return await object_keys.map(key => {
            return object_data[key].title.trim()
        }).indexOf(name)
    }
    const getImageUrl = (assetsData = {}, name, type, sub = '', domin8or = '') => {
        type = type.split(' ').join('_').toLowerCase()
        name = name.trim().split(' ').join('_').toLowerCase()
        if (name === 'stock')
            return require('../../assets/images/transparent.png')

        let controllerId = selectedController.id
        if (controllerId === 'byops5led')
            controllerId = 'byops5'
        else if (controllerId === 'byoxbxled')
            controllerId = 'byoxbx'
        if (!_.isEmpty(assetsData)) {
            const b64Img = assetsData[`${controllerId}/${type}/${name}.txt`]
            if (b64Img)
                return null
        }
        const imgUrl = `https://builder.controllermodz.co.uk/${controllerId}/${type}${sub !== '' ? ('/' + sub) : ''}${domin8or !== '' ? ('/' + domin8or) : ''}/${name}.png`
        if (type === 'design') {
            const img = new Image()
            img.src = imgUrl
        }
        return imgUrl
        //return `http://devdiamondoza.com/${selectedController.id}/${type}${sub !== '' ? ('/' + sub) : ''}/${name}.png`
    }
    const getOptionDataByKey = async (data, key) => {
        return await data.find(dt => dt.key === key.toLowerCase())
    }
    const getItemByOptionId = (optionId, object) => {
        if (!optionId)
            return null
        return object.find(obj => obj.option_id.toString() === optionId.toString())
    }
    const getDetailItemByOptionValue = (optionValue, items) => {
        if (!_.isArray(items)) {
            return null
        }
        let response = items[0].find(el => parseInt(el.option_type_id) === parseInt(optionValue))
        if (response)
            return { item: response, inTab: 0, index: items[0].indexOf(response) }

        if (items.length >= 2) {
            response = items[1].find(el => parseInt(el.option_type_id) === parseInt(optionValue))
            if (response)
                return { item: response, inTab: 1, index: items[1].indexOf(response) }
        }
        return null
    }
    useEffect(() => {
        getData().then()
    }, []);
    function getCorrectQuoteItemData(quoteItemData) {
        if (!selectedController.item_id)
            return null

        return quoteItemData.find(item => item.item_id === selectedController.item_id)
    }
    async function getData() {
        const json = await M2_getOptions(selectedController.id)
        if (json) {
            let quoteItemData = null
            if (selectedController.quote_id) {
                quoteItemData = await M2_getProductByQuoteId(selectedController.quote_id)
                if (quoteItemData) {
                    console.log('quoteItemData:', quoteItemData)
                    console.log('selectedController:', selectedController)
                    // if (quoteItemData && quoteItemData.length)
                    // {
                    //     if (!selectedController.item_id)
                    //     {
                    //         selectedController.item_id = quoteItemData[0].item_id
                    //     }
                    // }
                    // else if(_.isEmpty(quoteItemData))
                    // {
                    //
                    // }
                }
            }
            // try
            // {
            //     const estimateDate = await M2_getEstimatedDeliveryDate(selectedController.id)
            //     if (estimateDate)
            //     {
            //         console.log('estimateDate:', estimateDate)
            //         let inStock = estimateDate.in_stock ?? null
            //         if (inStock) {
            //             inStock = inStock.split(' ')
            //             inStock = inStock[inStock.length - 1]
            //             inStock = inStock.split('/')
            //             inStock = `${inStock[1]}/${inStock[0]}/${inStock[2]}`
            //         }
            //         setEstimatedDelivery(Date.parse(inStock))
            //     }
            // }
            // catch (e) {
            // }

            // axios.post('http://consolemaker.fouble.com:5000/zip-assets', {sku: selectedController.id},{responseType: 'arraybuffer'}).then(async function (assData) {
            //     if (assData.data)
            //     {
            //         const zip = new JSZip();
            //         const unZipped = await zip.loadAsync(assData.data)
            //         for (const filename in unZipped.files)
            //         {
            //             assetsData[filename] = await zip.files[filename].async('string')
            //         }
            //         console.log('assetsData:',assetsData)
            //         setAssetsData(assetsData)
            //     }
            // }).catch(function (error) { console.log('ZipError:', error); });

            setDataLoading(false)
            // ---------------------- Response is Okay ----------------------
            //let json = await response.json();
            const object_data = {};
            let childs = {};
            for (var i = 0; i < json.length; i++) {
                // if (json[i].title === 'Personalization Text')
                // {
                //     console.log('json[i]:',json[i])
                //
                //     return
                // }
                const objKey = 'optId_' + json[i].option_id
                if (json[i].values !== undefined) {
                    if (json[i].values[0]['extension_attributes'].dependency === undefined) {
                        object_data[objKey] = {};
                        object_data[objKey]['option_id'] = json[i].option_id;
                        object_data[objKey]['title'] = json[i].title;
                        object_data[objKey]['dependType'] = json[i].extension_attributes.dependency_type;
                        object_data[objKey]['disabled'] = json[i].extension_attributes.disabled;
                        object_data[objKey]['option_title_id'] = json[i].extension_attributes.option_title_id;
                        if (json[i].extension_attributes.description === undefined)
                            object_data[objKey]['desc'] = '';
                        else
                            object_data[objKey]['desc'] = JSON.parse(json[i].extension_attributes.description)[0].description;
                        object_data[objKey]['values'] = {};
                        for (var j = 0; j < json[i].values.length; j++) {
                            object_data[objKey]['values']["optTypeId_" + json[i].values[j].option_type_id] = json[i].values[j];
                            // object_data['optId_'+json[i].option_id]['childs']["optTypeId_" + json[i].values[j].option_type_id] = {};
                        }
                    } else {
                        // Childs
                        for (j = 0; j < json[i].values.length; j++) {
                            childs['optId_' + json[i].values[j].option_type_id] = json[i].values[j];
                            childs['optId_' + json[i].values[j].option_type_id]['option_id'] = json[i].option_id;
                        }
                        // Childs End
                    }
                } else {
                    object_data[objKey] = {};
                    object_data[objKey]['option_id'] = json[i].option_id;
                    object_data[objKey]['title'] = json[i].title;
                    object_data[objKey]['dependType'] = json[i].extension_attributes.dependency_type;
                    object_data[objKey]['disabled'] = json[i].extension_attributes.disabled;
                    object_data[objKey]['option_title_id'] = json[i].extension_attributes.option_title_id;
                    object_data[objKey]['values'] = {};
                }
            }
            const childKeys = Object.keys(childs);
            for (i = 0; i < childKeys.length; i++) {
                const link = JSON.parse(childs[childKeys[i]]['extension_attributes'].dependency)[0];
                if (object_data['optId_' + link[0]].values['optTypeId_' + link[1]]['childs'] === undefined) {
                    object_data['optId_' + link[0]].values['optTypeId_' + link[1]]['childs'] = [];
                }
                object_data['optId_' + link[0]].values['optTypeId_' + link[1]]['childs'].push(childs[childKeys[i]])
            }
            const object_keys = Object.keys(object_data);
            console.log('-----------OBJECT DATA-------------');
            console.log(object_data);
            console.log('------------------------');
            setObjectKeys(object_keys);
            // --------------- Design ---------------
            const optionsData_temp = []
            OPTIONS_CAN_HAVE(imageSetting, selectedController).forEach((optionObject, index) => {
                const optionName = optionObject.name.toLowerCase()
                let object_data_item = null
                for (const item in object_data) {
                    if (object_data[item].title.toLowerCase() === optionName) {
                        object_data_item = object_data[item]
                        break
                    }
                }
                const rootParentOptionId = (object_data_item && object_data_item.option_id) ? object_data_item.option_id : null
                let option = {
                    key: optionName,
                    steps: [],
                    items: [],
                    option_id: rootParentOptionId
                }
                if (rootParentOptionId) {
                    option.name = object_data_item.title
                    option.desc = object_data_item.desc
                    const subCategories = []
                    let option_step = object_data_item.values;
                    let option_step_keys = Object.keys(option_step);
                    option_step_keys.forEach((stepItem, index) => {
                        const option_step_data = option_step[stepItem]
                        
                        if (option_step_data.sku && option_step_data.sku.trim()) {
                            if (!subCategories.includes(option_step_data.sku.trim())) {
                                subCategories.push(option_step_data.sku.trim())
                            }
                            let image = option_step_data['extension_attributes']['images_data'] ? JSON.parse(option_step_data['extension_attributes']['images_data'])[0]['value'] : '';
                            const name = option_step_data.title
                            const optionItem = {
                                name,
                                price: option_step_data.price,
                                optionName,
                                image: optionObject.backOnly === true ? null : getImageUrl(assetsData, name, optionName),
                                image_back: getImageUrl(assetsData, name, optionName, optionObject.hasBack ? 'back' : ''),
                                selet: base_url + image,
                                is_default: option_step_data['extension_attributes'].is_default,
                                option_id: object_data_item.option_id,
                                option_type_id: option_step_data.option_type_id,
                                desc: (option_step_data.extension_attributes.description && JSON.parse(option_step_data.extension_attributes.description)[0].description) ?? ''
                            }
                            const indexOf = subCategories.indexOf(option_step_data.sku.trim())
                            if (!option.items[indexOf])
                                option.items[indexOf] = []

                            option.steps = subCategories
                            option.items[indexOf].push(optionItem)
                        }
                        if (optionName === 'razorback maxfire') {
                            const razorbacks = {
                                name: object_data_item.title,
                                desc: object_data_item.desc,
                                option_id: rootParentOptionId,
                                option_type_id: option_step_data.option_type_id,
                                is_default: option_step_data.extension_attributes.is_default
                            }
                            const razorbackData = {
                                data: razorbacks,
                                is_default: option_step_data.extension_attributes.is_default,
                                price: option_step_data.price
                            }
                            if (!option.items[0])
                                option.items[0] = []
                            option.items[0].push(razorbackData);
                        }
                        else {
                            let ltemp = [];
                            const childs = option_step_data.childs ?? []
                            childs.forEach((child, childIndex) => {
                                let image = child['extension_attributes']['images_data'] ? JSON.parse(child['extension_attributes']['images_data'])[0]['value'] : '';
                                const name = child.title
                                ltemp.push({
                                    name,
                                    price: child.price,
                                    optionName,
                                    image: optionObject.backOnly === true ? null : getImageUrl(assetsData, name, optionName),
                                    image_back: getImageUrl(assetsData, name, optionName, optionObject.hasBack ? 'back' : ''),
                                    selet: base_url + image,
                                    is_default: child['extension_attributes'].is_default,
                                    option_id: child.option_id,
                                    option_type_id: child.option_type_id,
                                    desc: (child.extension_attributes.description && JSON.parse(child.extension_attributes.description)[0].description) ?? ''
                                });
                            })
                            option.option_id = rootParentOptionId
                            if (childs.length) {
                                //option.steps.push(temp);
                                option.steps = subCategories
                                option.items.push(ltemp);
                            }
                            else if (subCategories.length === 0) {
                                let image = option_step_data['extension_attributes']['images_data'] ? JSON.parse(option_step_data['extension_attributes']['images_data'])[0]['value'] : '';
                                const temp = {
                                    name: option_step_data.title,
                                    price: option_step_data.price,
                                    optionName,
                                    image: optionObject.backOnly === true ? null : getImageUrl(assetsData, option_step_data.title, optionName),
                                    image_back: getImageUrl(assetsData, option_step_data.title, optionName, optionObject.hasBack ? 'back' : ''),
                                    selet: base_url + image,
                                    is_default: option_step_data.extension_attributes.is_default,
                                    option_id: option_step_data.option_id ?? option.option_id,
                                    option_type_id: option_step_data.option_type_id,
                                    desc: (option_step_data.extension_attributes.description && JSON.parse(option_step_data.extension_attributes.description)[0].description) ?? ''
                                }
                                if (!option.items[0])
                                    option.items[0] = []
                                option.items[0].push(temp);
                            }
                        }
                    })
                }
                optionsData_temp.push(option)

                if (quoteItemData && quoteItemData.length && option.items && getCorrectQuoteItemData(quoteItemData)) {

                    const itemOption = getCorrectQuoteItemData(quoteItemData)
                    const productOption = itemOption.product_option
                    const customOptions = productOption.extension_attributes.custom_options
                    const option_id = option.option_id
                    const foundItem = getItemByOptionId(option_id, customOptions)
                    if (foundItem) {
                        const selectedItem = getDetailItemByOptionValue(foundItem.option_value, option.items)
                        if (selectedItem) {
                            partSelected[option.name] = selectedItem.name
                            setPartSelected({ ...partSelected })

                            optionTabSelect[option.name] = selectedItem.inTab
                            setOptionTabSelect({ ...optionTabSelect });

                            optionItemSelect[option.name] = selectedItem.index + (selectedItem.inTab === 1 ? 1000 : selectedItem.inTab)
                            setOptionItemSelect({ ...optionItemSelect })
                            if (optionObject.onClick)
                                optionObject.onClick([selectedItem.inTab, selectedItem.index])
                        }
                    }
                }
            })
            console.log('optionsData_temp:', optionsData_temp)

            let customOptions = []
            if (quoteItemData && quoteItemData.length && getCorrectQuoteItemData(quoteItemData)) {
                const itemOption = getCorrectQuoteItemData(quoteItemData)
                const productOption = itemOption.product_option
                customOptions = productOption.extension_attributes.custom_options
            }

            // --------------- Design End ---------------
            const design_ = await getOptionDataByKey(optionsData_temp, 'Design')
            setDesignData(design_);


            // --------------- Abxy ---------------
            const abxy_ = await getOptionDataByKey(optionsData_temp, 'Abxy')
            setAbxyData(abxy_);
            // --------------- Dpad ---------------
            const dpad_ = await getOptionDataByKey(optionsData_temp, 'Dpad')
            setDpadData(dpad_);
            // --------------- Dpad End --------------
            // --------------- ThumbL --------------
            const thumbl_ = await getOptionDataByKey(optionsData_temp, 'L Thumbstick')
            setThumbLData(thumbl_);
            // --------------- ThumbL End ---------------

            // --------------- ThumbR --------------
            const thumbr_ = await getOptionDataByKey(optionsData_temp, 'R Thumbstick')
            setThumbRData(thumbr_);
            // --------------- ThumbR End ---------------

            // --------------- Start Buttons ---------------
            const startbutton_ = await getOptionDataByKey(optionsData_temp, 'Start Buttons')
            setStateBackData(startbutton_);
            // --------------- Start Back End ---------------

            // --------------- Touchpad ---------------
            const touchpad_ = await getOptionDataByKey(optionsData_temp, 'Touchpad')
            console.log('touchpad_:', touchpad_)
            setTouchPadData(touchpad_);
            // --------------- Touchpad End ---------------

            // --------------- LB RB ---------------
            const lb_rb = await getOptionDataByKey(optionsData_temp, 'LB RB')
            console.log('lb_rb_:', lb_rb)
            setLbRBData(lb_rb);
            // --------------- LB RB End ---------------

            // --------------- LED ---------------
            const led = await getOptionDataByKey(optionsData_temp, 'LED')
            console.log('led_:', led)
            setLedData(led);

            // --------------- GRIPS ---------------
            const grips = await getOptionDataByKey(optionsData_temp, 'Grips')
            console.log('grips:', grips)
            setGripsData(grips);

            // --------------- Guide ---------------
            const guide = await getOptionDataByKey(optionsData_temp, 'Guide')
            console.log('guide:', guide)
            setGuideData(guide);

            // --------------- Trim --------------
            const trim_ = await getOptionDataByKey(optionsData_temp, 'Trim')
            setTrimData(trim_);
            // --------------- Trim End ---------------

            // --------------- triggers ---------------
            const triggers_ = await getOptionDataByKey(optionsData_temp, 'Triggers')
            setTriggersData(triggers_);
            // --------------- triggers End ---------------

            // --------------- raborback ---------------
            // setRazorbackData
            const razorbacks_ = await getOptionDataByKey(optionsData_temp, 'Razorback Maxfire')
            if (razorbacks_.items.length) {
                const razorbacks = razorbacks_.items[0][0]
                const razorFound = getItemByOptionId(razorbacks_.option_id, customOptions)
                if (razorFound) {
                    razorbacks.is_default = true
                }
                setRazorBackData(razorbacks)
            }
            // --------------- raborback end ---------------

            // --------------- RearDesign ---------------
            const rearDesign_ = await getOptionDataByKey(optionsData_temp, 'Rear Design')
            setRearDesignData(rearDesign_);
            // --------------- RearDesign End ---------------

            //Preview Image & Logo Image
            const prevImageIndex = await getIndexByName('Preview Image', object_data, object_keys)
            const prevImageData = object_data[object_keys[prevImageIndex]];
            if (prevImageData) {
                setPreviewImage(prevImageData)
            }
            const logoImageIndex = await getIndexByName('Logo Image', object_data, object_keys)
            const logoImageData = object_data[object_keys[logoImageIndex]];
            if (logoImageData) {
                setLogoImage(logoImageData)
            }

            const perTextIndex = await getIndexByName('Personalization Text', object_data, object_keys)
            const perTextData = object_data[object_keys[perTextIndex]];
            if (perTextData) {
                setPerText(perTextData)
                const perText = getItemByOptionId(perTextData.option_id, customOptions)
                if (perText) {
                    setTextVal(perText.option_value)
                    setIsText(true);
                }
            }
            const perFontIndex = await getIndexByName('Personalization Font', object_data, object_keys)
            const perFontData = object_data[object_keys[perFontIndex]];
            if (perFontData) {
                setPerFont(perFontData)
                const perFont = getItemByOptionId(perFontData.option_id, customOptions)
                if (perFont) {
                    imageSetting.fontFamiles.forEach((font, index) => {
                        if (font.name === perFont.option_value) {
                            setFamily(index);
                        }
                    })
                }
            }
            const perColorIndex = await getIndexByName('Personalization Color', object_data, object_keys)
            const perColorData = object_data[object_keys[perColorIndex]];
            if (perColorData) {
                setPerColor(perColorData)
                const perColor = getItemByOptionId(perColorData.option_id, customOptions)
                if (perColor) {
                    setTextColor(perColor.option_value)
                }
            }

            // --------------- esports ---------------
            const esportIndex = await getIndexByName('eSports', object_data, object_keys)
            let esport = object_data[object_keys[esportIndex]];
            if (esport) {
                let tempEsportData = {};
                tempEsportData.name = esport.title;
                tempEsportData.desc = esport.desc;
                tempEsportData.option_id = esport.option_id;
                tempEsportData.values = [];
                let tempEsportDataKeys = Object.keys(esport.values);
                for (i = 0; i < tempEsportDataKeys.length; i++) {
                    tempEsportData.values.push(
                        {
                            option_type_id: esport.values[tempEsportDataKeys[i]].option_type_id,
                            desc: esport.values[tempEsportDataKeys[i]].extension_attributes.description ? JSON.parse(esport.values[tempEsportDataKeys[i]].extension_attributes.description)[0].description : ''
                        }
                    )
                }
                console.log('tempEsportDatatempEsportData:', tempEsportData)
                setEsportsData(tempEsportData);
                let esport_keys = Object.keys(esport.values);
                console.log('esport_keys:', esport_keys)
                // --------------- Paddle ---------------
                // console.log('customOptionscustomOptions:', customOptions)
                // let eSportFoundItem = getItemByOptionId(tempEsportData.option_id, customOptions)
                // if (eSportFoundItem) {
                //     console.log('eSportFoundItem:', eSportFoundItem)
                //
                //     // const selectedItem = getDetailItemByOptionValue(foundItem.option_value, dominselect.items)
                //     // if (selectedItem) {
                //     //     console.log('selectedItem:', selectedItem)
                //     // }
                // }
                const paddlesIndex = await esport_keys.map(key => {
                    return esport.values[key].title.trim()
                }).indexOf('Paddles')
                if (paddlesIndex >= 0) {
                    let temp = esport.values[esport_keys[paddlesIndex]];
                    let paddles = {};
                    paddles.name = temp.title;
                    paddles.price = temp.price;
                    paddles.is_default = temp.extension_attributes.is_default;
                    paddles.items = [[]];
                    paddles.option_id = object_data[object_keys[esportIndex]].option_id;
                    for (i = 0; i < temp.childs.length; i++) {
                        paddles.items[0].push(
                            {
                                name: temp.childs[i].title,
                                option_id: temp.childs[i].option_id,
                                option_type_id: temp.childs[i].option_type_id,
                                price: temp.childs[i].price,
                                selet: base_url + JSON.parse(temp.childs[i].extension_attributes.images_data)[0].value,
                                image: null,
                                image_back: getImageUrl({}, temp.childs[i].title, 'Paddles', 'back'),
                                desc: JSON.parse(temp.childs[i].extension_attributes.description)[0].description
                            }
                        )
                    }
                    console.log('paddles:', paddles)
                    setPaddleData(paddles);
                    const paddleOptionSelectedValue = getItemByOptionId('PADDLE_OPTION_VALUE', customOptions)
                    if (paddleOptionSelectedValue) {
                        setEsportsFlag(1);
                        if (paddleOptionSelectedValue) {
                            const idx = paddles.items[0].map(el => parseInt(el.option_type_id)).indexOf(parseInt(paddleOptionSelectedValue.option_value))
                            if (idx > -1) {
                                setPaddle([0, idx]);
                                setLdomin1(null);
                                setLdomin2(null);
                                setRdomin1(null);
                                setRdomin2(null);
                            }
                        }
                    }
                }
                // --------------- Paddle End ---------------
                // --------------- Domin8or Button ---------------
                const dominoIndex = await esport_keys.map(key => {
                    return esport.values[key].title.trim()
                }).indexOf('Domin8or Buttons')
                if (dominoIndex >= 0) {
                    let temp = esport.values[esport_keys[dominoIndex]];
                    const dominSelectLeft = {};
                    const dominSelectRight = {};
                    if (temp) {
                        const dominLeftItems = temp.childs.slice(0, 6)
                        const dominRightItems = temp.childs.slice(6, temp.childs.length)
                        dominSelectLeft.name = temp.title;
                        dominSelectLeft.price = temp.price;
                        dominSelectLeft.items = [];
                        for (i = 0; i < dominLeftItems.length; i++) {
                            dominSelectLeft.items.push({
                                name: dominLeftItems[i].title,
                                price: dominLeftItems[i].price,
                                option_id: dominLeftItems[i].option_id,
                                option_type_id: dominLeftItems[i].option_type_id,
                                image: null,
                                image_back: getImageUrl({}, dominLeftItems[i].title, 'Domin8or Buttons', 'back', '@LEFT_RIGHT@'),
                                select: base_url + JSON.parse(dominLeftItems[i].extension_attributes.images_data)[0].value,
                                desc: dominLeftItems[i].extension_attributes.description ? JSON.parse(dominLeftItems[i].extension_attributes.description)[0].description : ''
                            });
                        }
                        console.log('dominSelectLeft:', dominSelectLeft)
                        setDominSelectLeftData(dominSelectLeft);

                        //Right
                        dominSelectRight.name = temp.title;
                        dominSelectRight.price = temp.price;
                        dominSelectRight.items = [];
                        for (i = 0; i < dominRightItems.length; i++) {
                            dominSelectRight.items.push({
                                name: dominRightItems[i].title,
                                price: dominRightItems[i].price,
                                option_id: dominRightItems[i].option_id,
                                option_type_id: dominRightItems[i].option_type_id,
                                image: null,
                                image_back: getImageUrl({}, dominRightItems[i].title, 'Domin8or Buttons', 'back', '@LEFT_RIGHT@'),
                                select: base_url + JSON.parse(dominRightItems[i].extension_attributes.images_data)[0].value,
                                desc: dominRightItems[i].extension_attributes.description ? JSON.parse(dominRightItems[i].extension_attributes.description)[0].description : ''
                            });
                        }
                        console.log('dominSelectRight:', dominSelectRight)
                        setDominSelectRightData(dominSelectRight);
                    }

                    const leftDominoSelected = getItemByOptionId('LEFT_DOMINO_OPTION_VALUE', customOptions)
                    const rightDominoSelected = getItemByOptionId('RIGHT_DOMINO_OPTION_VALUE', customOptions)
                    if (leftDominoSelected || rightDominoSelected) {
                        setEsportsFlag(2);
                        if (leftDominoSelected) {
                            const indx = dominSelectLeft.items.map(item => {
                                return parseInt(item.option_type_id)
                            }).indexOf(parseInt(leftDominoSelected.option_value))
                            if (indx > -1) {
                                setLdomin1(indx)
                                setLdomin2(indx)
                                setPaddle(null)
                            }
                        }
                        if (rightDominoSelected) {
                            const indx = dominSelectRight.items.map(item => {
                                return parseInt(item.option_type_id)
                            }).indexOf(parseInt(rightDominoSelected.option_value))
                            if (indx > -1) {
                                setRdomin1(indx)
                                setRdomin2(indx)
                                setPaddle(null)
                            }
                        }
                    }
                }
                // --------------- Domin8or Button End ---------------
                // --------------- esports end ---------------
            }
            // --------------- Smart Triggers ---------------
            // const [dtriggersData, ]
            const dTriggersIndex = await getIndexByName('Smart Triggers', object_data, object_keys)
            if (dTriggersIndex > -1) {
                let dtriggers = {};
                dtriggers.name = object_data[object_keys[dTriggersIndex]].title;
                dtriggers.desc = object_data[object_keys[dTriggersIndex]].desc;
                let dtriggers_keys = Object.keys(object_data[object_keys[dTriggersIndex]].values);
                dtriggers.price = object_data[object_keys[dTriggersIndex]].values[dtriggers_keys[1]].price;
                dtriggers.is_default = object_data[object_keys[dTriggersIndex]].values[dtriggers_keys[1]].extension_attributes.is_default;
                dtriggers.option_id = object_data[object_keys[dTriggersIndex]].option_id;
                dtriggers.option_type_id1 = object_data[object_keys[dTriggersIndex]].values[dtriggers_keys[1]].option_type_id;
                //dtriggers.option_type_id2 = object_data[object_keys[dTriggersIndex]].values[dtriggers_keys[1]].option_type_id;

                setDtriggersData({ items: [dtriggers], key: 'smart triggers', name: 'Smart Triggers', steps: [], desc: '' });
                setDigital_trigger(dtriggers.is_default);
                setDigital_trigger_price(dtriggers.price);

                const smartTriggerFound = getItemByOptionId(dtriggers.option_id, customOptions)
                if (smartTriggerFound) {
                    setDigital_trigger(true);
                }

                // --------------- Smart Triggers End ---------------
            }

            // --------------- Remappable Technology ---------------
            const remTechIndex = await getIndexByName('Remappable Technology', object_data, object_keys)
            if (remTechIndex > -1) {
                const remTechData_ = object_data[object_keys[remTechIndex]];
                const remKeys = Object.keys(remTechData_.values)
                const leftRemTech = remTechData_.values[remKeys[0]]
                const remData = {
                    option_id: remTechData_.option_id,
                    items: [leftRemTech]
                }
                console.log('remDataremData:', remData)
                setRemTechData(remData)
            }

            // --------------- Text and Logo ---------------
            const textAndLogoIndex = await getIndexByName('Personalization', object_data, object_keys)
            if (textAndLogoIndex > -1) {
                const per = object_data[object_keys[textAndLogoIndex]];
                //console.log('perperperper:', per)
                const per_value_keys = Object.keys(object_data[object_keys[textAndLogoIndex]].values);
                const textAndLogoOptionData = {
                    name: per.title, desc: per.desc, option_id: per.option_id, option_type_ids: {
                        no: per.values[per_value_keys[0]].option_type_id,
                        text: per.values[per_value_keys[1]].option_type_id,
                        logo: per.values[per_value_keys[2]].option_type_id
                    }
                }
                setTextAndLogoData(textAndLogoOptionData);
                let names = [];
                names.push(per.title);
                names.push({ name: per.values[per_value_keys[0]].title, price: per.values[per_value_keys[0]].price });
                names.push({ name: per.values[per_value_keys[1]].title, price: per.values[per_value_keys[1]].price });
                names.push({ name: per.values[per_value_keys[2]].title, price: per.values[per_value_keys[2]].price });
                setTextPrice(per.values[per_value_keys[1]].price);
                setLogoPrice(per.values[per_value_keys[2]].price);
                if (per.values[per_value_keys[1]].extension_attributes.is_default)
                    setIsText(true);
                if (per.values[per_value_keys[2]].extension_attributes.is_default)
                    setLogo(true);

                setPersonalizationData(names);

                const perFound = getItemByOptionId(per.option_id, customOptions)
                if (perFound) {
                    if (parseInt(perFound.option_value) === parseInt(per.values[per_value_keys[1]].option_type_id)) {
                        const perText = getItemByOptionId('PERSONALIZATION_TEXT', customOptions)
                        if (perText) {
                            setTextVal(perText.option_value)
                            setIsText(true);
                        }
                    }
                    else if (parseInt(perFound.option_value) === parseInt(per.values[per_value_keys[2]].option_type_id)) {
                        setLogo(true);
                    }
                    console.log('per.values[per_value_keys[1]]per.values[per_value_keys[1]]:', per.values[per_value_keys[1]])
                    console.log('perFoundperFound:', perFound)
                }
                // --------------- Text and Logo End ---------------
            }


            // ---------------------- Response is Okay End ----------------------
        } else {
        }
    }


    // Check height of components
    const [h_header, getHeader] = React.useState(0);


    const [theme, setTheme] = React.useState(DarkMode);
    const [themeStatus, setStatus] = React.useState(0);

    function modeChange() {
        if (themeStatus === 0) {
            setStatus(1);
            setTheme(DayMode);
        } else {
            setStatus(0);
            setTheme(DarkMode);
        }
    }
    console.log(esportsFlag, "____________________________", partSelected);
    return <>
        {
            (designData && !dataLoading) &&
            <ThemeProvider theme={theme}>
                <AppContext.Provider value={imageSetting}>
                    <>
                        <MetaTags>
                            <title>{selectedController.title}</title>
                            <meta name="description" content="Controller Modz is the home of build-your-own custom modded controllers for  Playstation 5, Playstation 4 and Xbox One" />
                            <meta name="keywords" content="Build Your Own PS4 Controller, Custom Controllers PS4, Custom Gaming Controllers, Custom xbox 360 Controllers, Design PS4 Controller, Design Your Own PS4 Controller, modded controllers, PS4 Custom Controllers, Xbox One Custom Controllers, xbox design lab, ps4 design lab" />
                            <meta property="og:title" content={`${selectedController.title}`} />
                        </MetaTags>
                        <Wrapper>
                            <Header modeChange={modeChange} flag='1' menuSelected={selectedController} />
                            <MainDiv pl={h_header}>
                                <ViewArea controllerId={selectedController.id} />
                                <Tools selectedController={selectedController} />
                            </MainDiv>
                            <Modal flag={modal_flag} flag1={true}>
                                <div>
                                    <h1>
                                        Tips for uploading an image for controller logo
                                    </h1>
                                    <MoConItem>
                                        <h1><BsCheckLg />File size</h1>
                                        <p>
                                            File size must be smaller than 2MB
                                        </p>
                                    </MoConItem>
                                    <MoConItem>
                                        <h1><BsCheckLg />File type</h1>
                                        <p>
                                            Only available Jpeg, Png, SVG
                                        </p>
                                    </MoConItem>
                                    <MoOkay onClick={func_file_select}>
                                        Okay
                                    </MoOkay>
                                    <HideModal onClick={() => setModalFlag(false)}>
                                        <TiTimes />
                                    </HideModal>
                                </div>
                            </Modal>
                            <Modal flag={modal_desc}>
                                <div style={{ maxHeight: '80%', overflow: 'auto' }}>
                                    <h1>
                                        {selectedOption && selectedOption.name}
                                    </h1>
                                    <MoConItem>
                                        <h1>{selectedOption && selectedOption.desc}</h1>
                                    </MoConItem>
                                    <MoOkay onClick={() => setModalDesc(false)}>
                                        Okay
                                    </MoOkay>
                                    <HideModal onClick={() => setModalDesc(false)}>
                                        <TiTimes />
                                    </HideModal>
                                </div>
                            </Modal>
                        </Wrapper>
                    </>
                </AppContext.Provider>
            </ThemeProvider>
        }
        {
            (ledDataLoading || dataLoading || !designData) && (
                <div id="preloader" style={{ zIndex: 1000 }}>
                    {/*<div id="loader"/>*/}
                    <div style={{ backgroundColor: '#292c33', width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', height: '100%' }}>
                        <img src={require('../../assets/images/main_assets/Preloader.gif')} style={{ alignSelf: 'center', width: 200 }} />
                    </div>
                </div>
            )
        }
        {
            copiedUrl && <div id="preloader" style={{ zIndex: 1000 }}>
                <div style={{ backgroundColor: '#292c33', opacity: 0.9, width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', height: '100%' }}>
                    <span style={{ color: '#03cf62', fontWeight: 'bold', fontSize: 25 }}>{copiedUrl}</span>
                </div>
            </div>
        }
    </>
}

const Wrapper = styled.div`
flex-direction: column;
display: flex;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
`
const MainDiv = styled.div`
  height: calc(100vh - 70px);
  display: flex;
  margin: 0;
  @media screen and (max-width: 800px) {
    height: calc(100vh - 120px);
    flex-direction: column;
    justify-content: space-between;
  }
  
  @media not all and (min-resolution:.001dpcm) { @media {
   /* mobile viewport bug fix */
    min-height: -webkit-fill-available;
  }}
  @media only screen and (max-width: 375px) { 
  }
  position: relative;
`

const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  display: ${props => props.flag ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  color: black;
  background-color: rgba(0, 0, 0, 0.3);
  & > div:nth-child(1) {
    border-radius: 20px;
    position: relative;
    
    background-color: white;
    backdrop-filter: blur(100px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 2px 2px 20px 3px ${props => props.theme.ThemeColor} ;
    max-width: 40vw;
    padding: 20px 50px;
    text-align: ${props => !props.flag1 ? 'center' : 'left'};
    & > h1:nth-child(1) {
      margin-top: 30px;
      font-size: 25px;
      font-family: 'Rajdhani-Medium';
      letter-spacing: 2px;
      margin-bottom: 20px;
    }
  }
`

const MoConItem = styled.div`
  h1 {
    text-align: left;
    white-space: pre-line;
    font-family: 'sofiapro';
    font-size: 17px;
    svg {
      width: 30px;
      height: 20px;
      margin-top: 5px;
      fill: #00ce71;
    }
  }
  p {
    font-size: 20px;
  }
`

const HideModal = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  svg {
    width: 100%;
    height: 100%;
  }
  transition: all .1s;
  &:hover {
    transform: scale(1.1);
  }
`

const MoOkay = styled.div`
  font-family: 'sofiapro';
  margin: auto;
  margin-top: 20px;
  cursor: pointer;
  background-color: ${props => props.theme.ThemeColor};
  color: ${props => props.theme.color};
  width: 80px;
  text-align: center;
  border-radius: 10px;
  padding: 5px;
  font-size: 20px;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
  }
  letter-spacing: 2px;
`

export default VHome;
