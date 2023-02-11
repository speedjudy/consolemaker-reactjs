import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import html2canvas from 'html2canvas';

import ImageUploading from 'react-images-uploading';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { BsCheck } from 'react-icons/bs';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';


import { FaTimes } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { AiOutlineStop } from 'react-icons/ai';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import downloadjs from "downloadjs";
import { MarkImg, MarkHoverImg, RazorbackSelectImg, NoImg } from "../../assets/images";
import copy from 'copy-to-clipboard';
import {
    PaddleImg,
    DominLimg,
    DominRImg,
    TextImg,
    DTriggerImg,
    OPTIONS_CAN_HAVE, OPTIONS_MANUAL_SHOW, PersonalizeImg
} from "../../assets/images/main_assets/cateImg/cate";

import AppContext from "../../context/context";
import "swiper/css";
import _ from 'lodash'
import moment from "moment";
import { API_ENDPOINT, M2_getQuoteId, M2_postAddProduct, M2_postUpdateProduct } from "./API_GetOption";

import { useLocation } from "react-router";
function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ESTIMATE_DATE = new Date()
ESTIMATE_DATE.setDate(ESTIMATE_DATE.getDate() + 7);

const PRE_EXISTING = [
    {
        title: 'CM',
        image: 'https://builder.controllermodz.co.uk/logo-pre-existing/logo.jpeg'
        // image: 'https://builder.controllermodz.co.uk/logo-pre-existing/cmodz.png'
    },
    {
        title: 'Azox',
        image: 'https://builder.controllermodz.co.uk/logo-pre-existing/azox.png'
    },
    {
        title: 'Hug',
        image: 'https://builder.controllermodz.co.uk/logo-pre-existing/hug.png'
    },
    {
        title: 'Why so serious',
        image: 'https://builder.controllermodz.co.uk/logo-pre-existing/terrible.jpeg'
    },
    {
        title: 'Joker haha',
        image: 'https://builder.controllermodz.co.uk/logo-pre-existing/haha.jpeg'
    },
    {
        title: 'Jigsaw',
        image: 'https://builder.controllermodz.co.uk/logo-pre-existing/joke.jpeg'
    }
]
const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    }))
let rear_design_pro_black_deleting_item = null
let rear_design_pro_black_index_deleting_item = -1
let rear_design_pro_white_deleting_item = null
let rear_design_pro_white_index_deleting_item = -1
const Tools = (props) => {
    const { selectedController } = props

    const [proBlackOrWhiteSelected, setProBlackOrWhiteSelected] = useState(false)
    const font_zoom = [0.7, 0.7, 1, 0.7, 0.7, 0.7];
    const [font_size, setFontSize] = React.useState(0);
    const query = useQuery()
    const isShare = query.get('s') ?? false
    const [totalPrice, setTotalPrice] = useState(0)


    const [PaddletabSelect, PaddleSetTabSelect] = React.useState(0);

    const middRef = useRef();

    const [menuFlag, setMenuFlag] = React.useState(false);
    const [MAIN_OPTIONS, setMain_Option] = useState([])


    const handleCaptureClick = async () => {
        html2canvas(document.getElementById('viewer'), {
            letterRendering: 1,
            useCORS: true,
            //allowTaint : true,
        }).then(async (canvas) => {
            console.log('====Canvas done====')
            const dataURL = canvas.toDataURL('image/png');
            downloadjs(dataURL, 'download.png', 'image/png');
        })
    };

    const myContext = React.useContext(AppContext);

    const swiperTo = (ind) => {
        myContext.setSnapIndex(ind);
        myContext.swiper.slideTo(ind, 300);
    }

    const swiperNext = () => {
        if (myContext.snapIndex >= 17) {
            myContext.setIsFinished(true);
        } else {
            myContext.swiper.slideNext();
        }
    }

    const swiperPrev = () => {
        myContext.setIsFinished(false);
        myContext.swiper.slidePrev();
    }

    useEffect(() => {
        // console.log(myContext.design);
        setFontSize(30 / font_zoom[myContext.familyId]);
    }, [])

    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        const temp = imageList[0].file;
        // if (!(temp.type === 'image/png' || temp.type === 'image/jpeg' || temp.type === 'image/gif')) {
        //   NotificationManager.warning('Only support png, jpeg and svg files', "Warning");
        //   return;
        // } else if (temp.size / 1024 / 1014 > 2) {
        //   NotificationManager.warning('The image must be 2M.', "Warning");
        //   return;
        // }
        console.log('imageList:', imageList)
        myContext.setImages(imageList);
        myContext.setImgStatus(true);
    };

    async function AddToCart(isShare = false) {
        //myContext.setDataLoading(!isShare)
        myContext.setCopiedUrl('PROCESSING...')
        html2canvas(document.getElementById('viewer'), {
            letterRendering: 1,
            useCORS: true,
            //allowTaint : true,
        }).then(async (canvas) => {
            console.log('====Canvas done====')
            let quoteId = selectedController.quote_id
            if (_.isEmpty(quoteId) || isShare) {
                quoteId = await M2_getQuoteId()
            }
            const dataURL = canvas.toDataURL('image/png');
            const previewImgData = dataURL.split(';base64,')[1]
            //downloadjs(dataURL, `preview_${quoteId}.png`, 'image/png');


            const customOptions = []
            getMainOptions().forEach((item, index) => {
                if (item.selectionData && item.selectionData.length === 2 && item.data && item.data.items && item.data.items.length) {
                    const subItem = item.data.items[item.selectionData[0]][item.selectionData[1]]
                    const optionId = item.data.option_id ?? subItem.option_id
                    const cartItem = {
                        optionId,
                        optionValue: subItem.option_type_id
                    }
                    customOptions.push(cartItem)
                }
            })
            const totalData = {
                cartItem: {
                    quoteId,
                    price: totalPrice.toFixed(2),
                    name: selectedController.title,
                    productType: 'simple',
                    sku: selectedController.id,
                    qty: 1,
                    productOption: {
                        extensionAttributes: {
                            customOptions,
                            configurableItemOptions: []
                        }
                    }
                }
            }
            if (selectedController.item_id && !isShare) {
                totalData.itemId = selectedController.item_id
            }
            //console.log(JSON.stringify(totalData));
            //myContext.setDataLoading(false)
            //return
            // ! Razorback options
            if (myContext.razorBackData.is_default) {
                totalData.cartItem.productOption.extensionAttributes.customOptions.push(
                    {
                        optionId: myContext.razorBackData.data.option_id.toString(),
                        optionValue: myContext.razorBackData.data.option_type_id.toString()
                    }
                )
            }

            // ! Esports
            // console.log('--------------------------------------------------');
            if (myContext.esportsFlag > 0) {
                let flagIndex = myContext.esportsFlag
                if (!myContext.paddleData || !myContext.dominSelectLeftData) {
                    flagIndex = 1
                }
                // const optionValue = myContext.esportsData.values[flagIndex].option_type_id
                if (myContext.paddleData && myContext.paddle && myContext.paddleData.items && myContext.paddleData.items.length) {
                    const selectedOptionValue = myContext.paddleData.items[myContext.paddle[0]][myContext.paddle[1]].option_type_id
                    const selectedOptionId = myContext.paddleData.items[myContext.paddle[0]][myContext.paddle[1]].option_id
                    totalData.cartItem.productOption.extensionAttributes.customOptions.push(
                        {
                            optionId: 'PADDLE_OPTION_VALUE',
                            optionValue: selectedOptionValue
                        },
                        {
                            optionId: selectedOptionId,
                            optionValue: selectedOptionValue
                        }
                    )
                }
                if (myContext.ldomin_1 !== null && myContext.dominSelectLeftData && myContext.dominSelectLeftData.items && myContext.dominSelectLeftData.items.length) {
                    const selectedOptionValue = myContext.dominSelectLeftData.items[myContext.ldomin_1].option_type_id
                    const selectedOptionId = myContext.dominSelectLeftData.items[myContext.ldomin_1].option_id
                    totalData.cartItem.productOption.extensionAttributes.customOptions.push(
                        {
                            optionId: 'LEFT_DOMINO_OPTION_VALUE',
                            optionValue: selectedOptionValue
                        },
                        {
                            optionId: selectedOptionId,
                            optionValue: selectedOptionValue
                        }
                    )
                }
                if (myContext.rdomin_1 !== null && myContext.dominSelectRightData && myContext.dominSelectRightData.items && myContext.dominSelectRightData.items.length) {
                    const selectedOptionValue = myContext.dominSelectRightData.items[myContext.rdomin_1].option_type_id
                    const selectedOptionId = myContext.dominSelectRightData.items[myContext.rdomin_1].option_id
                    totalData.cartItem.productOption.extensionAttributes.customOptions.push(
                        {
                            optionId: 'RIGHT_DOMINO_OPTION_VALUE',
                            optionValue: selectedOptionValue
                        },
                        {
                            optionId: selectedOptionId,
                            optionValue: selectedOptionValue
                        }
                    )
                }

            }

            // ! Smart Triggers
            if (myContext.digital_trigger === true) {
                totalData.cartItem.productOption.extensionAttributes.customOptions.push(
                    {
                        optionId: myContext.dtriggersData.items[0].option_id,
                        optionValue: myContext.dtriggersData.items[0].option_type_id1
                    }
                )
            }
            //Rem Tech
            if (myContext.remap) {
                totalData.cartItem.productOption.extensionAttributes.customOptions.push({
                    optionId: myContext.remTechData.option_id,
                    optionValue: myContext.remTechData.items[0].option_type_id
                })
            }
            //Text and logo
            if (myContext.textAndLogoData) {
                const textAndLogoOption = {
                    optionId: myContext.textAndLogoData.option_id,
                    optionValue: myContext.textAndLogoData.option_type_ids.no
                }

                if (myContext.isText || myContext.isLogo) {
                    textAndLogoOption.optionValue = myContext.isText ? myContext.textAndLogoData.option_type_ids.text : myContext.textAndLogoData.option_type_ids.logo
                    //textAndLogoOption.optionValue = myContext.isText ? myContext.textVal : myContext.textAndLogoData.option_type_ids.logo
                    if (myContext.isLogo && myContext.images && myContext.images.length) {
                        const images = myContext.images
                        let imgMime = (images[0] && images[0].file) ? images[0].file.type : 'image/png'
                        if (imgMime === 'image/jpg')
                            imgMime = 'image/jpeg'

                        const logoImgData = images[0].data_url.split(';base64,')[1]
                        //console.log('logoImgData:', logoImgData)
                        totalData.cartItem.productOption.extensionAttributes.customOptions.push(
                            {
                                optionId: myContext.logoImage.option_id,
                                optionValue: 'file',
                                extensionAttributes: {
                                    fileInfo: {
                                        base64EncodedData: logoImgData,
                                        type: imgMime,
                                        name: `logo_${quoteId}.png`
                                    }
                                }
                            }
                        )
                    }
                    else {
                        // totalData.cartItem.productOption.extensionAttributes.customOptions.push(
                        //     {
                        //         optionId: 'PERSONALIZATION_TEXT',
                        //         optionValue: myContext.textVal
                        //     }
                        // )

                        if (myContext.perText) {
                            totalData.cartItem.productOption.extensionAttributes.customOptions.push(
                                {
                                    optionId: myContext.perText.option_id,
                                    optionValue: myContext.textVal
                                }
                            )
                        }
                        if (myContext.perFont) {
                            totalData.cartItem.productOption.extensionAttributes.customOptions.push(
                                {
                                    optionId: myContext.perFont.option_id,
                                    optionValue: myContext.fontFamiles[myContext.familyId].name
                                }
                            )
                        }
                        if (myContext.perColor) {
                            totalData.cartItem.productOption.extensionAttributes.customOptions.push(
                                {
                                    optionId: myContext.perColor.option_id,
                                    optionValue: myContext.textColor
                                }
                            )
                        }
                    }
                }
                totalData.cartItem.productOption.extensionAttributes.customOptions.push(textAndLogoOption)
            }

            if (myContext.previewImage && !isShare) {
                totalData.cartItem.productOption.extensionAttributes.customOptions.push(
                    {
                        optionId: myContext.previewImage.option_id,
                        optionValue: 'file',
                        extensionAttributes: {
                            fileInfo: {
                                base64EncodedData: previewImgData,
                                type: "image/png",
                                name: `preview_${quoteId}.png`
                            }
                        }
                    }
                )
            }

            console.log('-----------|||---------');
            console.log(JSON.stringify(totalData));
            //return
            // myContext.setDataLoading(false)
            const res = totalData.itemId ? (await M2_postUpdateProduct(totalData.cartItem, totalData.itemId)) : (await M2_postAddProduct(totalData.cartItem))
            console.log('res:', res)
            console.log(`${API_ENDPOINT()}/modz/cart/index?quote=${quoteId}`)
            console.log(`${API_ENDPOINT()}/rest/V1/guest-carts/${quoteId}/items`)
            myContext.setDataLoading(false)
            if (res && res.item_id && !isShare) {
                //alert(`${API_ENDPOINT()}/modz/cart/index?quote=${quoteId}`)
                window.location.href = `${API_ENDPOINT()}/modz/cart/index?quote=${quoteId}`;
            }
            else if (isShare) {
                const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
                if (!isSafari)
                    myContext.setCopiedUrl('Copied URL!')

                const shareUrl = `${window.location.origin}/${totalData.cartItem.sku}?q=${quoteId}&id=${res.item_id}&s=true`
                copy(shareUrl, { message: 'Copy the url shown below' })
                setTimeout(() => {
                    myContext.setCopiedUrl(null)
                }, 2000)
                // navigator.clipboard.writeText(shareUrl).then(r => {
                //
                // });
            }
            //window.location.href = 'https://controllermodz.co.uk/checkout/cart/';

        }).catch(err => {
            alert(err.message)
        })
    }

    const getMainOptions = () => {
        const cateOptions = []
        OPTIONS_CAN_HAVE(myContext, selectedController).forEach((item, index) => {
            if ((item.data && item.data.items && item.data.items.length) || item.mustShow) {
                if (!item.disableWhen) {
                    cateOptions.push(item)
                }
            }
        })
        // console.log(cateOptions, 'options');
        return cateOptions
    }
    const findIndexOfItemInRearDesign = (rear_design = [], name = '') => {
        return (rear_design && rear_design.items && rear_design.items[0]) ? rear_design.items[0].findIndex(el => el.name === name) : -1
    }
    useEffect(() => {
        const indx_pro_black = findIndexOfItemInRearDesign(myContext.rearDesignData, 'Pro Black')
        const indx_pro_white = findIndexOfItemInRearDesign(myContext.rearDesignData, 'Pro White')

        setProBlackOrWhiteSelected(myContext.rearDesign && (myContext.rearDesign[1] === indx_pro_black || myContext.rearDesign[1] === indx_pro_white))

        if (myContext.ldomin_2 || myContext.rdomin_2) {
            const rear_design = myContext.rearDesignData
            let deletingItem = rear_design.items[0][indx_pro_black]
            // let deletingItemWhite = rear_design.items[0][indx_pro_white - 1]
            let deletingItemWhite = rear_design.items[0][indx_pro_white]
            if (deletingItem) {
                rear_design_pro_black_index_deleting_item = indx_pro_black
                rear_design_pro_black_deleting_item = deletingItem
                rear_design.items[0].splice(indx_pro_black, 1)

                myContext.setRearDesignData(_.cloneDeep(rear_design))
            }
            if (deletingItemWhite) {
                rear_design_pro_white_index_deleting_item = indx_pro_white
                rear_design_pro_white_deleting_item = deletingItemWhite
                // rear_design.items[0].splice(indx_pro_white - 1, 1)
                rear_design.items[0].splice(indx_pro_white, 1)
                myContext.setRearDesignData(_.cloneDeep(rear_design))
            }
        }
        else if (rear_design_pro_black_deleting_item || rear_design_pro_white_deleting_item) {
            setProBlackOrWhiteSelected(false)

            const rear_design = myContext.rearDesignData
            if (rear_design_pro_black_deleting_item)
                rear_design.items[0].splice(rear_design_pro_black_index_deleting_item, 0, rear_design_pro_black_deleting_item)

            if (rear_design_pro_white_deleting_item)
                rear_design.items[0].splice(rear_design_pro_white_index_deleting_item, 0, rear_design_pro_white_deleting_item)

            myContext.setRearDesignData(_.cloneDeep(rear_design))

            rear_design_pro_black_deleting_item = null
            rear_design_pro_white_deleting_item = null
        }

        const cateOptions = getMainOptions()
        if (!myContext.selectedOption) {
            myContext.setSelectedOption(cateOptions[0])
        }
        setMain_Option(cateOptions)
        const options_manual_show = OPTIONS_MANUAL_SHOW(selectedController)
        //For 2 weeks showing
        // if ((selectedController.id === 'byops5' || selectedController.id === 'byops5led'))// && (myContext.touchpad[1] === 1 || myContext.touchpad[1] === 2))
        // {
        //     myContext.setShowTextAndLogo(true)
        // }
        // else if (selectedController.id === 'build-your-own-ps4' && (myContext.touchpad[1] === 0 || myContext.touchpad[1] === 1))
        // {
        //     myContext.setShowTextAndLogo(true)
        // }
        // else if((selectedController.id === 'byoxbx' || selectedController.id === 'byoxbxled') && (myContext.rearDesign[1] === 0 || myContext.rearDesign[1] === 1))
        // {
        //     myContext.setShowTextAndLogo(true)
        // }
        // else {
        //     myContext.setShowTextAndLogo(false)
        //     options_manual_show.splice(0, 1)
        // }
        const menuItems = cateOptions.concat(options_manual_show)
        if (!_.isEmpty(myContext.paddle)) {
            menuItems.splice(menuItems.length - 4, 1)
        }

        if (!myContext.personalizationData) {
            menuItems.splice(menuItems.length - 2, 1)
        }

        if (myContext.razorBackData.is_default) {
            // menuItems.splice(menuItems.length - 6, 1)
            // myContext.partSelected[cateOption.name] = item.name ?? ''
            // myContext.setPartSelected({ ...myContext.partSelected })
        }

        myContext.setMenuItems(menuItems)

    }, [myContext.design, myContext.paddle, myContext.abxy, myContext.dpad, myContext.thumbstickL, myContext.thumbstickR,
    myContext.startBtn, myContext.touchpad, myContext.trim, myContext.trigger, myContext.esportsFlag, myContext.razorBackData, myContext.digital_trigger,
    myContext.grips, myContext.guide, myContext.led, myContext.lbRb, myContext.rearDesign, myContext.ldomin_2, myContext.rdomin_2])

    useEffect(() => {
        const totalPrice = Math.abs((myContext.initalPrice +
            Number(myContext.design !== null && myContext.designData && myContext.designData.items.length ? myContext.designData.items[myContext.design[0]][myContext.design[1]].price : 0) +
            Number(myContext.abxy !== null && myContext.abxyData && myContext.abxyData.items.length ? myContext.abxyData.items[myContext.abxy[0]][myContext.abxy[1]].price : 0) +
            Number(myContext.dpad !== null && myContext.dpadData && myContext.dpadData.items.length ? myContext.dpadData.items[myContext.dpad[0]][myContext.dpad[1]].price : 0) +
            Number(myContext.thumbstickL !== null && myContext.thubmLData && myContext.thubmLData.items.length ? myContext.thubmLData.items[myContext.thumbstickL[0]][myContext.thumbstickL[1]].price : 0) +
            Number(myContext.thumbstickR !== null && myContext.thubmRData && myContext.thubmRData.items.length ? myContext.thubmRData.items[myContext.thumbstickR[0]][myContext.thumbstickR[1]].price : 0) +
            Number(myContext.startBtn !== null && myContext.startBackData && myContext.startBackData.items.length ? myContext.startBackData.items[myContext.startBtn[0]][myContext.startBtn[1]].price : 0) +
            Number(myContext.touchpad !== null && myContext.thuchPadData && myContext.thuchPadData.items.length ? myContext.thuchPadData.items[myContext.touchpad[0]][myContext.touchpad[1]].price : 0) +
            Number(myContext.trim !== null && myContext.trimData && myContext.trimData.items.length ? myContext.trimData.items[myContext.trim[0]][myContext.trim[1]].price : 0) +

            Number(myContext.lbRb !== null && myContext.lbRBData && myContext.lbRBData.items.length ? myContext.lbRBData.items[myContext.lbRb[0]][myContext.lbRb[1]].price : 0) +
            Number(myContext.led !== null && myContext.ledData && myContext.ledData.items.length ? myContext.ledData.items[myContext.led[0]][myContext.led[1]].price : 0) +
            Number(myContext.grips !== null && myContext.gripsData && myContext.gripsData.items.length ? myContext.gripsData.items[myContext.grips[0]][myContext.grips[1]].price : 0) +
            Number(myContext.guide !== null && myContext.guideData && myContext.guideData.items.length ? myContext.guideData.items[myContext.guide[0]][myContext.guide[1]].price : 0) +

            Number(myContext.trigger !== null && myContext.triggersData && myContext.triggersData.items.length ? myContext.triggersData.items[myContext.trigger[0]][myContext.trigger[1]].price : 0) +
            Number(myContext.rearDesign !== null && myContext.rearDesignData && myContext.rearDesignData.items.length ? myContext.rearDesignData.items[myContext.rearDesign[0]][myContext.rearDesign[1]].price : 0) +
            Number(myContext.razorBackData.is_default ? myContext.razorBackData.price : 0) +
            Number(myContext.paddle !== null && myContext.paddleData && myContext.paddleData.items.length ? myContext.paddleData.items[myContext.paddle[0]][myContext.paddle[1]].price : 0) +
            Number(myContext.ldomin_2 !== null && myContext.dominSelectLeftData ? Number(myContext.dominSelectLeftData.items[myContext.ldomin_1].price) : 0) +
            Number(myContext.rdomin_2 !== null && myContext.dominSelectRightData ? Number(myContext.dominSelectRightData.items[myContext.rdomin_1].price) : 0) +
            Number(myContext.digital_trigger ? myContext.digital_trigger_price : 0) +
            Number(myContext.isText ? myContext.textPrice : 0) +
            Number(myContext.isLogo ? myContext.logoPrice : 0) +
            Number(myContext.remap ? myContext.remTechData.items[0].price : 0)
        ))
        setTotalPrice(totalPrice)
    }, [myContext])
    const isMenuSelected = (selectionData) => {
        if (_.isArray(selectionData))
            return selectionData[1] > 0

        return Boolean(selectionData) === true
    }
    const totalSummaryItems = () => {
        const options = getMainOptions()
        let total = 0
        for (const item of options) {
            if (item.selectionData && item.data) {
                if (item.data.items && item.data.items.length && item.selectionData[1] > 0) {
                    total += 1
                }
                else {
                    total += (myContext.razorBackData.is_default && item.data.name === 'Razorback Maxfire') ? 1 : 0
                    total += (myContext.esportsFlag > 0 && item.data.name === 'eSports') ? 1 : 0
                    total += (myContext.digital_trigger === true && item.data.name === 'Smart Triggers') ? 1 : 0
                }
            }

        }
        total += (myContext.textAndLogoData && (myContext.isText || myContext.isLogo)) ? 1 : 0
        return total
    }

    const currentCate = myContext.menuItems[myContext.snapIndex]

    let isDisabled = (currentCate?.name == 'eSports' && myContext?.razorBackData.is_default) ||
        (currentCate?.name == 'Personalization' && !myContext?.personalizationData) ||
        (currentCate?.name == 'Razorback Maxfire' && !_.isEmpty(myContext?.paddle))

    return (
        <Wrapper>
            <NotificationContainer />
            <Menu mf={menuFlag}>
                <Remove onClick={() => setMenuFlag(false)}>
                    <span><FaTimes /></span>
                </Remove>
                <MenuBody>
                    {
                        myContext.menuItems.map((item, index) => {
                            return <MenuItem onClick={async () => {
                                await setMenuFlag(false);
                                await swiperTo(index);
                            }} me={index} curr={myContext.snapIndex} stat={isMenuSelected(item.selectionData)}>
                                {
                                    item.faFont ? item.faFont : <img alt="no img" src={item.image} style={{ transform: `scale(${item.zoom})` }} />
                                }

                                {
                                    item.name
                                }
                                <SBsCheck />
                            </MenuItem>
                        })
                    }

                </MenuBody>
            </Menu>
            <TopDiv>
                <div>
                    <progress id="file" max={myContext.menuItems.length} value={myContext.snapIndex + 1} />
                </div>
                <div>
                    <div>
                        {
                            (myContext.snapIndex < myContext.menuItems.length - 1) ? <>
                                {myContext.menuItems.length &&
                                    <img alt="no img" src={myContext.menuItems[myContext.snapIndex].image}
                                        style={{ transform: `scale(${myContext.menuItems[myContext.snapIndex].zoom + 0.4})` }} />
                                }
                                <span style={{ display: (myContext.snapIndex === myContext.menuItems.length - 1) ? 'none' : 'flex' }}>
                                    {myContext.menuItems.length && <span>{myContext.menuItems[myContext.snapIndex].name}</span>}
                                    {/** Mobile Steps Sub selection */}
                                    {
                                        (myContext.selectedOption && myContext.selectedOption.data && myContext.selectedOption.data.steps && myContext.selectedOption.data.steps.length) ?
                                            <MobileSelector onChange={(e) => {
                                                myContext.optionTabSelect[myContext.selectedOption.name] = e.target.value
                                                myContext.setOptionTabSelect({ ...myContext.optionTabSelect });
                                            }}>
                                                {myContext.selectedOption.data.steps.map((title, index) => {
                                                    return <option key={index} value={index}>
                                                        {title}
                                                    </option>
                                                })}
                                            </MobileSelector> : null
                                    }

                                </span>
                            </> : null
                        }
                    </div>
                    <div>
                        <span style={{ cursor: 'pointer' }} onClick={() => myContext.setModalDesc(true)}>
                            {/* <MdOutlineDescription onClick={() => myContext.setModalDesc(true)}></MdOutlineDescription> */}
                            <i style={{ fontSize: 25, color: '#00ce71' }} className="fa fa-info-circle" />
                        </span>
                        <span onClick={() => setMenuFlag(!menuFlag)}>
                            <i className="fa fa-bars" />
                        </span>
                        <span className="prev" onClick={() => swiperPrev()}>
                            <BsChevronLeft />
                        </span>
                        <span className="next" onClick={() => swiperNext()}>
                            <BsChevronRight />
                        </span>
                    </div>
                </div>
            </TopDiv>
            <MediumDiv ref={middRef}>
                <Swiper
                    onSwiper={s => {
                        myContext.setSwiper(s)
                    }}
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    simulateTouch={false}
                    scrollbar={{ draggable: true }}
                    allowTouchMove={false}
                    onSlideChange={async (event) => {
                        const ind = event.snapIndex;
                        await myContext.setSnapIndex(ind);
                        middRef.current.scrollTop = 0;
                        const item = myContext.menuItems[ind]
                        //myContext.setPartHover(item.name)
                        myContext.setSelectedOption(item)
                        if (item.sideFlag === true) {
                            await myContext.setSideflag(false);
                        } else {
                            await myContext.setSideflag(true);
                        }
                        if (item.data && item.data.items) {
                            const items = item.data.items.length === 2 ? item.data.items[0].concat(item.data.items[1]) : item.data.items[0]
                            if (_.isArray(items)) {
                                items.forEach(anItem => {
                                    if (anItem.image) {
                                        const img = new Image()
                                        img.src = anItem.image
                                    }
                                    else if (anItem.image_back) {
                                        const img = new Image()
                                        img.src = anItem.image_back
                                    }
                                })
                            }
                        }
                        else if (item.name.toLowerCase() === 'esports') {
                            if (myContext.paddleData && myContext.paddleData.items && myContext.paddleData.items.length) {
                                myContext.paddleData.items[0].forEach(anItem => {
                                    const img = new Image()
                                    img.src = anItem.image_back
                                })
                            }
                            if (myContext.dominSelectLeftData && myContext.dominSelectLeftData.items && myContext.dominSelectLeftData.items.length) {
                                myContext.dominSelectLeftData.items.forEach(anItem => {
                                    const cloneItem = _.cloneDeep(anItem)
                                    const imgLeftUrl = cloneItem.image_back.replace('@LEFT_RIGHT@', 'left')
                                    const imgLeft = new Image()
                                    imgLeft.src = imgLeftUrl
                                })

                                myContext.dominSelectRightData.items.forEach(anItem => {
                                    const cloneItem = _.cloneDeep(anItem)
                                    const imgRightUrl = cloneItem.image_back.replace('@LEFT_RIGHT@', 'right')
                                    const imgRight = new Image()
                                    imgRight.src = imgRightUrl
                                })
                            }
                        }
                    }}
                >
                    {
                        MAIN_OPTIONS.map((cateOption, menuIndex) => {
                            return cateOption.name === 'eSports' ?
                                <SwiperSlide>
                                    <EsportsWrapper>
                                        <EsportsContainer>
                                            <div>
                                                <EsportItems flag={myContext.esportsFlag === 0} onClick={() => {
                                                    myContext.setPaddle(null);
                                                    myContext.setLRdomin(false);
                                                    myContext.setLdomin1(null)
                                                    myContext.setLdomin2(null)
                                                    myContext.setRdomin1(null)
                                                    myContext.setRdomin2(null)

                                                    myContext.setEsportsFlag(0);
                                                    myContext.partSelected[cateOption.name] = 'No (Default)'
                                                    myContext.setPartSelected({ ...myContext.partSelected })
                                                }}>
                                                    <div>
                                                        <AiOutlineStop />
                                                    </div>
                                                    <div>
                                                        No (Default)
                                                    </div>
                                                    <div>
                                                        <SBsCheck />
                                                    </div>
                                                </EsportItems>
                                                {myContext.paddleData ?
                                                    <EsportItems flag={myContext.esportsFlag === 1} onClick={() => {
                                                        myContext.setEsportsFlag(1);
                                                        myContext.partSelected[cateOption.name] = 'Paddles'
                                                        myContext.setPartSelected({ ...myContext.partSelected })
                                                    }}>
                                                        <div>
                                                            <img alt="no img" src={PaddleImg} style={{ width: '60px' }} />
                                                        </div>
                                                        <div>
                                                            Paddles
                                                        </div>
                                                        <div>
                                                            <SBsCheck />
                                                        </div>
                                                    </EsportItems> : null}
                                                {myContext.dominSelectLeftData && !proBlackOrWhiteSelected ?
                                                    <EsportItems flag={myContext.esportsFlag === 2} onClick={() => {
                                                        myContext.setEsportsFlag(2);
                                                        myContext.partSelected[cateOption.name] = myContext.dominSelectLeftData.name ?? ''
                                                        myContext.setPartSelected({ ...myContext.partSelected })
                                                    }}>
                                                        <div>
                                                            <img alt="no img" src={DominLimg} />
                                                        </div>
                                                        <div>
                                                            {
                                                                myContext.dominSelectLeftData.name ?? ''
                                                            }
                                                        </div>
                                                        <div>
                                                            <SBsCheck />
                                                        </div>
                                                    </EsportItems> : null}
                                            </div>

                                            {/* Paddle */}
                                            {
                                                myContext.esportsFlag === 1 ? (
                                                    <div>
                                                        {myContext.razorBackData.is_default === true && <p style={{ fontSize: 13, color: 'grey', paddingLeft: 8 }}><i>Paddles are not compatible with Razorback Maxfire*</i></p>}
                                                        <Selector>
                                                            {
                                                                myContext.paddleData != null ?
                                                                    myContext.paddleData.items[PaddletabSelect].map((item, index) => (
                                                                        <SelectItemPrice me={10000 * myContext.snapIndex + 100 * PaddletabSelect + index} now={myContext.paddle === null ? -1 : 10000 * myContext.snapIndex + 100 * myContext.paddle[0] + myContext.paddle[1]}>
                                                                            <SelectItem
                                                                                // width={'140px'}
                                                                                // height={'86px'}
                                                                                key={index}
                                                                                bgImg={item.selet}
                                                                                now={myContext.paddle === null ? -1 : 10000 * myContext.snapIndex + 100 * myContext.paddle[0] + myContext.paddle[1]}
                                                                                me={10000 * myContext.snapIndex + 100 * PaddletabSelect + index}
                                                                                onClick={() => {
                                                                                    //myContext.setSnapIndex(menuIndex);
                                                                                    myContext.setPaddle([PaddletabSelect, index]);
                                                                                    myContext.setLdomin1(null);
                                                                                    myContext.setLdomin2(null);
                                                                                    myContext.setRdomin1(null);
                                                                                    myContext.setRdomin2(null);
                                                                                    myContext.partSelected[cateOption.name] = item.name ?? ''
                                                                                    myContext.setPartSelected({ ...myContext.partSelected })
                                                                                }}
                                                                                onMouseOver={async () => await myContext.setHoverImg(item)}
                                                                                onMouseLeave={async () => await myContext.setHoverImg(null)}
                                                                            />
                                                                            {
                                                                                '£' + item.price
                                                                            }
                                                                        </SelectItemPrice>
                                                                    ))
                                                                    : null
                                                            }
                                                        </Selector>
                                                        <h6 style={{
                                                            color: '#00ce71',
                                                            fontFamily: 'sofiapro',
                                                            fontSize: 13
                                                        }}>*Remappable Technology is included as standard</h6>
                                                    </div>
                                                ) : null
                                            }

                                            {/* DominBtn */}
                                            {
                                                myContext.esportsFlag === 2 ? (
                                                    <div>
                                                        <span style={{ display: 'flex', color: 'gray', marginBottom: 20, fontSize: 16, fontFamily: 'abel' }}>Rumble motors are removed as standard*</span>
                                                        <UnderlinedDiv>
                                                            <img alt="no img" src={DominLimg} />
                                                            Left Domin8or Button
                                                        </UnderlinedDiv>
                                                        <Selector width={'100%'} gap={'12px'}>
                                                            {
                                                                myContext.dominSelectLeftData != null ?
                                                                    myContext.dominSelectLeftData.items.map((item, index) => (
                                                                        <SelectItemPrice me={10000 * myContext.snapIndex + 100 * index} now={myContext.ldomin_1 === null ? -1 : 10000 * myContext.snapIndex + 100 * myContext.ldomin_1}>
                                                                            <SelectItem
                                                                                key={index}
                                                                                now={myContext.ldomin_1 === null ? -1 : 10000 * myContext.snapIndex + 100 * myContext.ldomin_1}
                                                                                me={10000 * myContext.snapIndex + 100 * index}
                                                                                bgImg={item.select}
                                                                                onClick={() => {
                                                                                    myContext.setLdomin1(index)
                                                                                    myContext.partSelected[cateOption.name] = item.name ?? ''
                                                                                    myContext.setPartSelected({ ...myContext.partSelected })

                                                                                    myContext.setLdomin2(index);
                                                                                    myContext.setPaddle(null);
                                                                                }}
                                                                                onMouseOver={async () => {
                                                                                    const cloneItem = _.cloneDeep(item)
                                                                                    if (cloneItem.image_back.includes('@LEFT_RIGHT@')) {
                                                                                        cloneItem.image_back = cloneItem.image_back.replace('@LEFT_RIGHT@', 'left')
                                                                                    }
                                                                                    await myContext.setHoverImg(cloneItem)
                                                                                }}
                                                                                onMouseLeave={async () => await myContext.setHoverImg(null)}
                                                                            />
                                                                            {
                                                                                '£' + item.price
                                                                            }
                                                                        </SelectItemPrice>
                                                                    ))
                                                                    : null
                                                            }
                                                        </Selector>

                                                        {/* RDominBtn */}
                                                        <UnderlinedDiv>
                                                            <img alt="no img" src={DominRImg} />
                                                            Right Domin8or Button
                                                        </UnderlinedDiv>
                                                        <Selector width={'100%'} gap={'12px'}>
                                                            {
                                                                myContext.dominSelectRightData != null ?
                                                                    myContext.dominSelectRightData.items.map((item, index) => (
                                                                        <SelectItemPrice me={10000 * myContext.snapIndex + 100 * index} now={myContext.rdomin_1 === null ? -1 : 10000 * myContext.snapIndex + 100 * myContext.rdomin_1}>
                                                                            <SelectItem
                                                                                key={index}
                                                                                bgImg={item.select}
                                                                                now={myContext.rdomin_1 === null ? -1 : 10000 * myContext.snapIndex + 100 * myContext.rdomin_1}
                                                                                me={10000 * myContext.snapIndex + 100 * index}
                                                                                onClick={() => {
                                                                                    myContext.setRdomin1(index)
                                                                                    myContext.partSelected[cateOption.name] = item.name ?? ''
                                                                                    myContext.setPartSelected({ ...myContext.partSelected })

                                                                                    myContext.setRdomin2(index);
                                                                                    myContext.setPaddle(null);
                                                                                }}
                                                                                onMouseOver={async () => {
                                                                                    const cloneItem = _.cloneDeep(item)
                                                                                    if (cloneItem.image_back.includes('@LEFT_RIGHT@')) {
                                                                                        cloneItem.image_back = cloneItem.image_back.replace('@LEFT_RIGHT@', 'right')
                                                                                    }
                                                                                    await myContext.setHoverImg(cloneItem)
                                                                                }}
                                                                                onMouseLeave={async () => await myContext.setHoverImg(null)}
                                                                            />
                                                                            {
                                                                                '£' + item.price
                                                                            }
                                                                        </SelectItemPrice>
                                                                    ))
                                                                    : null
                                                            }
                                                        </Selector>

                                                        {(myContext.remTechData && (myContext.rdomin_2 !== null || myContext.rdomin_1 !== null || myContext.ldomin_1 !== null || myContext.ldomin_2 !== null)) ?
                                                            <RemapDiv>
                                                                <CusSwitch flag={myContext.remap} onClick={() => {
                                                                    myContext.setRemap(!myContext.remap)
                                                                    myContext.partSelected[cateOption.name] = `${myContext.remTechData.items[0].title} £${!myContext.remap ? myContext.remTechData.items[0].price : '0.00'}`
                                                                    myContext.setPartSelected({ ...myContext.partSelected })
                                                                }}>
                                                                    <div />
                                                                </CusSwitch>
                                                                <h6>{myContext.remTechData.items[0].title} £{myContext.remTechData.items[0].price}</h6>
                                                                <MarkDiv>
                                                                </MarkDiv>
                                                            </RemapDiv> : null}
                                                    </div>
                                                ) : null
                                            }
                                        </EsportsContainer>
                                    </EsportsWrapper>
                                </SwiperSlide>
                                : (cateOption.name === 'Smart Triggers') ?
                                    <SwiperSlide
                                        style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
                                        <Hr />
                                        <RozorBack>
                                            <div>
                                                <RozorItem flag={!myContext.digital_trigger}
                                                    onClick={() => {
                                                        myContext.setDigital_trigger(false)
                                                        myContext.partSelected[cateOption.name] = 'No (Default)'
                                                        myContext.setPartSelected({ ...myContext.partSelected })
                                                    }}>

                                                    <AiOutlineStop style={{
                                                        width: '55px',
                                                        height: '36px'
                                                    }} />
                                                    <h1 style={{ color: !myContext.digital_trigger ? '#00ce71' : '#fff' }}>No
                                                        (Default)</h1>
                                                    <span><BsCheck /></span>
                                                </RozorItem>
                                                <RozorItem flag={myContext.digital_trigger}
                                                    onClick={() => {
                                                        myContext.setDigital_trigger(true)
                                                        myContext.partSelected[cateOption.name] = 'Add Smart Trigger'
                                                        myContext.setPartSelected({ ...myContext.partSelected })
                                                    }}>
                                                    <img height={45} src={DTriggerImg} alt="img" />
                                                    <h1 style={{ color: myContext.digital_trigger ? '#00ce71' : '#fff' }}>Add
                                                        Smart Trigger {`£${myContext.digital_trigger_price}`}</h1>
                                                    <span><BsCheck /></span>
                                                </RozorItem>
                                            </div>
                                        </RozorBack>
                                    </SwiperSlide>
                                    : (cateOption.name === 'Razorback Maxfire' && myContext.razorBackData.data) ?
                                        <SwiperSlide
                                            style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
                                            <Hr />
                                            {(selectedController.id === 'byops5' || selectedController.id === 'byops5led') ? <span style={{ display: 'flex', width: '100%', textAlign: 'left', color: 'gray', marginLeft: 40, marginTop: 20, fontSize: 16, fontFamily: 'abel' }}>Rapid Fire is not compatible with Smart Triggers*</span> : null}
                                            <RozorBack>
                                                <div>
                                                    <RozorItem flag={!myContext.razorBackData.is_default}
                                                        onClick={() => {
                                                            const razorBackData = myContext.razorBackData
                                                            razorBackData.is_default = false
                                                            myContext.setRazorBackData({ ...razorBackData })
                                                            myContext.partSelected[cateOption.name] = 'No (Default)'
                                                            myContext.setPartSelected({ ...myContext.partSelected })
                                                        }}>

                                                        <AiOutlineStop style={{
                                                            width: '55px',
                                                            height: '36px'
                                                        }} />
                                                        <h1 style={{ color: !myContext.razorBackData.is_default ? '#00ce71' : '#fff' }}>No
                                                            (Default)</h1>
                                                        <span><BsCheck /></span>
                                                    </RozorItem>
                                                    <RozorItem flag={myContext.razorBackData.is_default}
                                                        onClick={() => {
                                                            const razorBackData = myContext.razorBackData
                                                            razorBackData.is_default = true
                                                            myContext.setRazorBackData({ ...razorBackData })
                                                            myContext.partSelected[cateOption.name] = `Razorback Maxfire £${myContext.razorBackData.price}`
                                                            myContext.setPartSelected({ ...myContext.partSelected })
                                                        }}>
                                                        <img alt='razor selection' src={RazorbackSelectImg}
                                                            style={{ width: '90%' }} />
                                                        <h1 style={{ color: myContext.razorBackData.is_default ? '#00ce71' : '#fff' }}>Add
                                                            £{myContext.razorBackData.price}</h1>
                                                        <span><BsCheck /></span>
                                                    </RozorItem>
                                                </div>
                                            </RozorBack>
                                        </SwiperSlide> :
                                        <SwiperSlide
                                            style={{ display: "flex", flexDirection: "column" }}>
                                            {(cateOption.data && cateOption.data.steps && cateOption.data.steps.length) ?
                                                <TopItems>
                                                    {
                                                        cateOption.data.steps.map((title, index) => {
                                                            return (
                                                                <TapItem key={index} keys={index}
                                                                    w={cateOption.data.steps.length}
                                                                    active={myContext.optionTabSelect[cateOption.name] ?? 0}
                                                                    onClick={() => {
                                                                        myContext.optionTabSelect[cateOption.name] = index
                                                                        myContext.setOptionTabSelect({ ...myContext.optionTabSelect });
                                                                    }}>
                                                                    <span>
                                                                        {title}
                                                                    </span>
                                                                    {/* <span>
                                                                          £{ item.price }
                                                                        </span> */}
                                                                    <div />
                                                                </TapItem>
                                                            )
                                                        })
                                                    }
                                                </TopItems> : null
                                            }
                                            <Hr />
                                            {cateOption.data && cateOption.data.items && cateOption.data.items.length &&
                                                <Selector id="design_topitems">
                                                    {
                                                        cateOption.data.items[myContext.optionTabSelect[cateOption.name] ?? 0].map((item, index) => (
                                                            <SelectItemPrice me={myContext.optionItemSelect[cateOption.name] ?? 0} now={index + (myContext.optionTabSelect[cateOption.name] ?? 0)} title={item.name}>
                                                                <SelectItem
                                                                    bgImg={item.selet}
                                                                    key={index}
                                                                    now={index + ((myContext.optionTabSelect[cateOption.name] && myContext.optionTabSelect[cateOption.name] === 1 ? 1000 : myContext.optionTabSelect[cateOption.name]) ?? 0)}
                                                                    me={myContext.optionItemSelect[cateOption.name] ?? 0}
                                                                    onClick={() => {
                                                                        myContext.partSelected[cateOption.name] = item.name
                                                                        myContext.setPartSelected({ ...myContext.partSelected })
                                                                        myContext.optionItemSelect[cateOption.name] = index + ((myContext.optionTabSelect[cateOption.name] && myContext.optionTabSelect[cateOption.name] === 1 ? 1000 : myContext.optionTabSelect[cateOption.name]) ?? 0)
                                                                        myContext.setOptionItemSelect({ ...myContext.optionItemSelect })
                                                                        cateOption.onClick([myContext.optionTabSelect[cateOption.name] ?? 0, index])
                                                                    }}
                                                                    onMouseOver={async () => await myContext.setHoverImg(item)}
                                                                    onMouseLeave={async () => await myContext.setHoverImg(null)}
                                                                >
                                                                    {(item.desc && (item.desc.toUpperCase() === 'NEW' || item.desc.toUpperCase() === 'SALE')) && <NewBanner isSale={item.desc.toUpperCase() === 'SALE'}>{item.desc.toUpperCase()}</NewBanner>}
                                                                </SelectItem>
                                                                {'£' + item.price}

                                                            </SelectItemPrice>
                                                        ))
                                                    }
                                                </Selector>
                                            }
                                        </SwiperSlide>
                        })
                    }

                    {
                        /*==========SHOWING GENERAL DATA HERE=========*/
                    }


                    {/**TEXT and LOGO*/}
                    {(myContext.personalizationData) &&
                        <SwiperSlide>
                            <EsportsWrapper>
                                <EsportsContainer>
                                    <div>
                                        <EsportItems flag={!myContext.isText && !myContext.isLogo} onClick={() => {
                                            myContext.setIsText(false);
                                            myContext.setLogo(false);
                                        }}>
                                            <div>
                                                {/* <AiOutlineStop></AiOutlineStop> */}
                                                <img alt='no' src={NoImg} />
                                            </div>
                                            <div>
                                                {
                                                    myContext.personalizationData[1].name ?? ''
                                                }
                                            </div>
                                            <div>
                                                <SBsCheck />
                                            </div>
                                        </EsportItems>
                                        <EsportItems flag={myContext.isText} onClick={() => {
                                            myContext.setIsText(true);
                                            myContext.setLogo(false);
                                        }}>
                                            <div>
                                                <img alt="no img" src={TextImg}
                                                    style={{ width: '45px', marginRight: '5px' }} />
                                                {
                                                    myContext.personalizationData[2].name ?? ''
                                                }
                                            </div>
                                            <div>
                                                £{
                                                    myContext.textPrice
                                                }
                                            </div>
                                            <div>
                                                <SBsCheck />
                                            </div>
                                        </EsportItems>
                                        <EsportItems flag={myContext.isLogo} onClick={() => {
                                            myContext.setIsText(false);
                                            myContext.setLogo(true);
                                        }}>
                                            <div>
                                                {OPTIONS_MANUAL_SHOW(selectedController).length &&
                                                    <img alt="no img" src={OPTIONS_MANUAL_SHOW(selectedController)[0].image}
                                                        style={{ marginRight: '5px' }} />}
                                                {
                                                    myContext.personalizationData[3].name ?? ''
                                                }
                                            </div>
                                            <div>
                                                £{
                                                    myContext.logoPrice
                                                }
                                            </div>
                                            <div>
                                                <SBsCheck />
                                            </div>
                                        </EsportItems>
                                    </div>

                                    {
                                        !myContext.isText ? (() => {
                                        })() : (
                                            <TextDiv>
                                                <input type="text" className="added-text" maxLength="14"
                                                    value={myContext.textVal} onChange={(e) => {
                                                        myContext.setTextVal(e.target.value);
                                                        if (e.target.value.length > 0) {
                                                            myContext.setTxtStatus(true);
                                                        }
                                                    }} placeholder={"Enter text here"} />
                                                <select className="font-type" onChange={(e) => {
                                                    myContext.setFamily(e.target.value[0]);
                                                    console.log(e.target.value[0]);
                                                }}>
                                                    <FontOption value={0}>Font</FontOption>
                                                    {
                                                        myContext.fontFamiles.map((item, index) => (
                                                            <FontOption selected={myContext.familyId === index} family={item.family} key={index} value={[index, font_zoom[index]]}>
                                                                {item.name}
                                                            </FontOption>
                                                        ))
                                                    }
                                                </select>
                                                <select className="font-type"
                                                    onChange={(e) => myContext.setTextColor(e.target.value)}>
                                                    <option selected={myContext.textColor === 'black'} value='black'>Font Colour</option>
                                                    <option selected={myContext.textColor === 'black'} value='black'>Black</option>
                                                    <option selected={myContext.textColor === 'white'} value='white'>White</option>
                                                    <option selected={myContext.textColor === '#e10088'} value='#e10088'>Pink</option>
                                                    <option selected={myContext.textColor === '#006dd9'} value='#006dd9'>Blue</option>
                                                    <option selected={myContext.textColor === '#cc0000'} value='#cc0000'>Red</option>
                                                    <option selected={myContext.textColor === '#f9f737'} value='#f9f737'>Yellow</option>
                                                    <option selected={myContext.textColor === '#008001'} value='#008001'>Green</option>
                                                </select>
                                            </TextDiv>
                                        )
                                    }

                                    {/* Logo */}
                                    {
                                        myContext.isLogo ? <>
                                            <span>
                                                <ImgDiv>
                                                    <UploadImg
                                                        onClick={() => {
                                                            myContext.setModalFlag(true);
                                                            // onImageUpload()
                                                        }}
                                                    >
                                                        <span><FiUpload /></span>
                                                        <h1>Click To Upload Image</h1>
                                                        <h1>Maximum file size 2MB</h1>
                                                    </UploadImg>
                                                    <ImageUploading
                                                        value={myContext.images}
                                                        onChange={onChange}
                                                        maxNumber={maxNumber}
                                                        dataURLKey="data_url"
                                                    // acceptType={['jpg', 'gif', 'png']}
                                                    // maxFileSize={1024 * 1024 * 2}
                                                    >
                                                        {({
                                                            imageList,
                                                            onImageUpload,
                                                            isDragging,
                                                            dragProps,
                                                        }) => (
                                                            // write your building UI
                                                            <UploadImg
                                                                style={isDragging ? { color: 'red' } : undefined}
                                                                onClick={onImageUpload}
                                                                id="file_selector"
                                                                {...dragProps}
                                                            >
                                                            </UploadImg>
                                                        )}
                                                    </ImageUploading>
                                                </ImgDiv>
                                            </span>
                                            {
                                                PRE_EXISTING.length > 0 ? <div style={{ padding: 10, marginTop: 10, display: 'inline-block' }}>
                                                    <span style={{ height: 35, fontFamily: 'Teko-Regular', fontSize: 16, color: '#fff' }}>Or select from our pre-existing</span>
                                                    <Selector padding={'15px 15px'} id="design_topitems">
                                                        {
                                                            PRE_EXISTING.map((item, index) => (
                                                                <SelectItemPrice title={item.title}>
                                                                    <SelectItem
                                                                        width={'80px'}
                                                                        bgImg={item.image}
                                                                        key={index}
                                                                        now={index + (myContext.optionTabSelect['personalization'] ?? 0)}
                                                                        me={myContext.optionItemSelect['personalization'] ?? 0}
                                                                        onClick={() => {
                                                                            myContext.optionItemSelect['personalization'] = index + (myContext.optionTabSelect['personalization'] ?? 0)
                                                                            myContext.setOptionItemSelect({ ...myContext.optionItemSelect })
                                                                            toDataURL(item.image)
                                                                                .then(data_url => {
                                                                                    myContext.setImages([{
                                                                                        data_url
                                                                                    }]);
                                                                                    myContext.setImgStatus(true);
                                                                                })
                                                                        }}
                                                                    // onMouseOver={async () => {
                                                                    //     toDataURL(item.image)
                                                                    //         .then(data_url => {
                                                                    //             myContext.setImages([{
                                                                    //                 data_url
                                                                    //             }]);
                                                                    //             myContext.setImgStatus(true);
                                                                    //         })
                                                                    // }}
                                                                    // onMouseLeave={async () => await myContext.setHoverImg(null)}
                                                                    >
                                                                    </SelectItem>
                                                                    <span style={{ fontFamily: 'Teko-Regular', fontSize: 16, color: '#fff' }}>{item.title}</span>
                                                                </SelectItemPrice>
                                                            ))
                                                        }
                                                    </Selector>
                                                </div> : null
                                            }
                                        </>
                                            : null
                                    }
                                </EsportsContainer>
                            </EsportsWrapper>
                        </SwiperSlide>
                    }
                    <SwiperSlide style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'center', display: 'flex' }}>
                        <AddToCartDiv>
                            <button style={{ cursor: 'pointer' }} onClick={() => AddToCart()}>
                                <p style={{ height: 30 }}>{(selectedController.quote_id === null || isShare || _.isNaN(selectedController.item_id)) ? 'ADD  TO  CART' : 'UPDATE  CART'}</p>
                                <p style={{
                                    height: 35,
                                    fontFamily: 'Teko-Regular',
                                    fontSize: 35
                                }}>£{totalPrice.toFixed(2)}</p></button>
                        </AddToCartDiv>
                        <div onClick={() => {
                            myContext.setCopiedUrl('GENERATING...')
                            AddToCart(true).then()
                        }} style={{ color: '#ffffff', fontFamily: 'Teko-Regular', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            Share my design
                            <img width={30} style={{ marginBottom: 5 }} src={require('../../assets/images/share_icon.png')} />
                        </div>
                        {
                            (myContext.selectedOption && myContext.selectedOption.name === 'Add to cart') && <div style={{ width: '90%', padding: 20, columns: 2 }}>
                                {
                                    getMainOptions().map((item, index) => {
                                        if (item.selectionData && item.data) {
                                            if (item.data.items && item.data.items.length && item.selectionData[1] > 0) {
                                                const selectedItem = item.data.items[item.selectionData[0]][item.selectionData[1]]
                                                return <div style={summaryBottomBorder}>
                                                    <div style={{ flexDirection: 'row', color: '#fff', alignItems: 'center', display: 'flex', fontSize: 16 }}>
                                                        {item.data.name}
                                                    </div>
                                                    <div style={{ flexDirection: 'row', alignItems: 'center', display: 'flex' }}>
                                                        <img style={summaryImg} src={selectedItem.selet} width={40} />
                                                        <div style={{ flexDirection: 'column', marginLeft: 10, display: 'flex' }}>
                                                            <span style={summaryPrice}>{selectedItem.name}</span>
                                                            <span style={summaryPrice}>+£{selectedItem.price}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            else {
                                                if (myContext.razorBackData.is_default && item.data.name === 'Razorback Maxfire') {
                                                    return <div style={summaryBottomBorder}>
                                                        <div style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', fontSize: 16, color: '#fff' }}>
                                                            {item.data.name}
                                                        </div>
                                                        <div style={{ flexDirection: 'row', alignItems: 'center', display: 'flex' }}>
                                                            <img style={summaryImg} src={item.image} width={40} />
                                                            <div style={{ flexDirection: 'column', marginLeft: 10, display: 'flex' }}>
                                                                {/*<span style={summaryPrice}>{myContext.razorBackData.name}</span>*/}
                                                                <span style={summaryPrice}>+£{myContext.razorBackData.price}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                if (myContext.esportsFlag > 0 && item.data.name === 'eSports') {
                                                    let flagIndex = myContext.esportsFlag

                                                    let object = { price: 0 }
                                                    if (!myContext.paddleData || !myContext.dominSelectLeftData) {
                                                        flagIndex = 1
                                                    }
                                                    if (myContext.paddle && myContext.paddleData.items) {
                                                        object.price = myContext.paddleData.items[myContext.paddle[0]][myContext.paddle[1]].price
                                                    }
                                                    else if (myContext.dominSelectLeftData) {
                                                        if (myContext.dominSelectLeftData.items[myContext.ldomin_2])
                                                            object.price += Number(myContext.dominSelectLeftData.items[myContext.ldomin_1].price)
                                                        if (myContext.dominSelectRightData.items[myContext.rdomin_2])
                                                            object.price += Number(myContext.dominSelectRightData.items[myContext.rdomin_1].price)
                                                    }
                                                    return <div style={summaryBottomBorder}>
                                                        <div style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', fontSize: 16, color: '#fff' }}>
                                                            {item.data.name}
                                                        </div>
                                                        <div style={{ flexDirection: 'row', alignItems: 'center', display: 'flex' }}>
                                                            <img style={summaryImg} src={myContext.paddle ? PaddleImg : DominLimg} width={35} />
                                                            <div style={{ flexDirection: 'column', marginLeft: 10, display: 'flex' }}>
                                                                <span style={summaryPrice}>{myContext.esportsData.values[flagIndex].desc}</span>
                                                                <span style={summaryPrice}>+£{object.price}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }

                                                // // ! Smart Triggers
                                                if (myContext.digital_trigger === true && item.data.name === 'Smart Triggers') {
                                                    console.log('myContext.dtriggersData:', myContext.dtriggersData)
                                                    return <div style={summaryBottomBorder}>
                                                        <div style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', color: '#fff', fontSize: 16 }}>
                                                            {item.data.name}
                                                        </div>
                                                        <div style={{ flexDirection: 'row', alignItems: 'center', display: 'flex' }}>
                                                            <img style={summaryImg} src={item.image} width={40} />
                                                            <div style={{ flexDirection: 'column', marginLeft: 10, display: 'flex' }}>
                                                                {/*<span style={{color: 'darkgray'}}>{myContext.dtriggersData.name}</span>*/}
                                                                <span style={summaryPrice}>+£{myContext.dtriggersData.items[0].price}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            }
                                        }
                                    })
                                }
                                {
                                    // //Text and logo
                                    (myContext.textAndLogoData && (myContext.isText || myContext.isLogo)) &&
                                    <div style={summaryBottomBorder}>
                                        <div style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', fontSize: 16, color: '#fff' }}>{myContext.textAndLogoData.name}</div>
                                        <div style={{ flexDirection: 'row', alignItems: 'center', display: 'flex' }}>
                                            <img style={summaryImg} src={PersonalizeImg} width={40} />
                                            <div style={{ flexDirection: 'column', marginLeft: 10, display: 'flex' }}>
                                                <span style={summaryPrice}>{myContext.isText ? 'Text' : 'Logo'}</span>
                                                <span style={summaryPrice}>+£{myContext.isText ? myContext.textPrice : myContext.logoPrice}</span>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    (totalSummaryItems() % 2 > 0) &&
                                    <div style={{ flexDirection: 'column', fontFamily: 'Teko-Bold', color: '#fff', height: 76, marginTop: 5 }}>
                                        <div style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', fontSize: 16 }}>&nbsp;</div>
                                        <div style={{ flexDirection: 'row', alignItems: 'center', display: 'flex' }}>
                                            <div style={{ flexDirection: 'column', marginLeft: 10, display: 'flex' }}>
                                                <span style={summaryPrice}>&nbsp;</span>
                                                <span style={summaryPrice}>&nbsp;</span>
                                            </div>
                                        </div>
                                    </div>
                                }

                            </div>
                        }

                    </SwiperSlide>
                </Swiper>
            </MediumDiv>

            {/**
             * ------------------------------------------------- Arror Area -------------------------------------------------
             */}

            {/* <ConfirmDiv flag={ myContext.snapIndex === 10 || myContext.snapIndex === 14 || myContext.snapIndex === 15 || myContext.snapIndex === 16 ? false : true }> */}
            {/* <button onClick={() => myContext.func_reset(myContext.snapIndex)}>Reset</button> */}
            {/* </ConfirmDiv> */}
            <LocalFooter showTopBorder={myContext.selectedOption && myContext.selectedOption.name === 'Design'}>
                <div>
                    <p style={{ display: (myContext.selectedOption && (myContext.selectedOption.showPartSelect === false || (myContext.selectedOption.name === 'eSports' && (myContext.paddle === null || myContext.esportsFlag !== 1)))) ? 'none' : 'flex' }}>
                        <span>Part Selection: <span
                            style={{ fontFamily: 'Teko-Bold' }}>{(myContext.selectedOption && Object.keys(myContext.partSelected).length > 0 && myContext.partSelected[myContext.selectedOption.name]) ? myContext.partSelected[myContext.selectedOption.name] : 'Stock'}</span></span>
                    </p>
                    <div id="info_div">
                        <TotalPrice>
                            <span>
                                Total
                            </span>
                            <span>
                                £{totalPrice.toFixed(2)}
                            </span>
                        </TotalPrice>
                        <Info>
                            <div>
                                <span> Estimated Delivery </span>
                                <EDD>
                                    {moment(myContext.estimatedDelivery ?? ESTIMATE_DATE).format('DD/MM/YYYY')}
                                </EDD>
                            </div>
                            {(myContext.snapIndex < myContext.menuItems.length - 1) ? <ATC onClick={() => {
                                swiperTo(myContext.menuItems.length - 1)
                                //handleCaptureClick()
                            }} flag={myContext.isFinished}>
                                <i style={{ fontSize: 26, width: 26 }} className='fa fa-shopping-cart' />
                                {(selectedController.quote_id === null || isShare || _.isNaN(selectedController.item_id)) ? 'ADD  TO  CART' : 'UPDATE  CART'}
                            </ATC> : null
                            }
                        </Info>
                    </div>
                </div>
            </LocalFooter>
        </Wrapper>
    )
}
const NewBanner = styled.div`
    font-size: 12px;
    margin-top: 3px;
    font-family: 'Rajdhani-Bold';
    line-height: 10px;
    /* height: 20px; */
    background-color: ${props => props.isSale ? '#00f902' : 'red'};
    color: rgb(255, 255, 255);
    padding-top: 3px;
    transform: rotate(-20.5deg);
    margin-left: -14px;
`
const summaryBottomBorder = {
    borderBottom: '0.5px solid gray',
    flexDirection: 'column', fontFamily: 'Teko-Medium', height: 70, paddingTop: 5
};
const summaryImg = {
    // border: '1px solid #00ce71',
    borderRadius: 17, width: 34
}
const summaryPrice = {
    height: 19,
    color: 'darkgray'
}
const Wrapper = styled.div`
  background-color: ${props => props.theme.ToolBgColor};
  border-left: 3px solid ${props => props.theme.ThemeColor};
  overflow: hidden;
  width: 40%;
  position: relative;
  @media screen and (max-width: 800px) {
    width: 100%;
    height: 60%;
  }
`

const TopDiv = styled.div`
  width: 100%;
  margin-bottom: 20px;
  @media screen and (max-width: 800px) {
    margin: 0;
    margin-bottom: 10px;
  }
  
  & > div:nth-child(1) {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 5px;
    progress {
      color: red;
      width: 90%;
      height: 8px;
      border-radius: 20px;
      margin: 10px;
      @media only screen and (max-width: 375px) { 
        height: 5px;
        margin-top: 5px !important;
        margin-bottom: 2px !important;
      }
    }
    @media screen and (max-width: 800px) {
      padding: 0;
    }
    progress::-webkit-progress-value {
      background: ${props => props.theme.ThemeColor};
      border: 0;
      border-radius: 20px;
      box-shadow: 0px 4px 12px rgba(0, 205, 112, 0.58);
    }
    progress::-moz-progress-bar {
      background: ${props => props.theme.ThemeColor};
      border: 0;
      border-radius: 20px;
      box-shadow: 0px 4px 12px rgba(0, 205, 112, 0.58);
    }

    progress::-webkit-progress-bar {
      border: 0;
      border-radius: 20px;
    }
  }
  & > div:nth-child(2) {
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    position: relative;
    & > div:nth-child(1) {
      display: flex;
      justify-content: center;
      gap: 10px;
      align-items: center;
      color: ${props => props.theme.color};
      font-family: 'Rajdhani-Medium';
      font-size:20px;
      @media only screen and (max-width: 375px) { 
        font-size:16px;
      }
      img {
        width: 30px;
        margin: 0 5px;
        margin-left: 8px;
      }
      & > span:nth-child(2) {
        display: flex;
        flex-direction: column;
      }
    }

    & > div:nth-child(2) {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      & > span:nth-child(1) {
        color: white;
        img {
          content: url(${props => props.theme.FlagIcon});
          transform: scale(1.1);
        }
        transition: all 0.1s;
        &:hover {
          transform: scale(1.1);
        }
      }
      & > span:nth-child(2) {
        color: ${props => props.theme.color};
        font-size: 25px;
        cursor: pointer;
        transition: all 0.1s;
        &:hover {
          transform: scale(1.1);
        }
      }
      & > span:nth-child(3) {
        padding: 5px 7px;
        border: ${props => props.theme.DirectIconBorder};
        background-color: ${props => props.theme.DirectIconBgColor};
        border-radius: 10px;
        height: 60%;
        display: flex;
        align-items: center;
        svg {
          color: ${props => props.theme.color};
        }
        cursor: pointer;
        transition: all 0.1s;
        &:hover {
          transform: scale(1.1);
        }
      }
      & > span:nth-child(4) {
        padding: 5px 7px;
        height: 60%;
        border: ${props => props.theme.DirectIconBorder};
        background-color: ${props => props.theme.DirectIconBgColor};
        border-radius: 10px;
        display: flex;
        align-items: center;
        svg {
          color: ${props => props.theme.color};
        }
        cursor: pointer;
        transition: all 0.1s;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
`
const TopItems = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: calc(100% - 20px);
  @media screen and (max-width: 800px){
    height: min-content;
    display: none;
  }
`

const TapItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(80% / ${props => props.w});
  background-color: ${props => props.keys === props.active ? props.theme.TapSelectBgColor : props.theme.TapBgColor};
  color: ${props => props.keys === props.active ? props.theme.TapSelectColor : props.theme.TapColor};
  border-radius: 5px;
  font-family: 'sofiapro';
  position: relative;
  padding: 13px 13px;
  @media screen and (max-width: 800px) {
    padding: 2px 2px;
  }
  cursor: pointer;
  & > span:nth-child(1) {
    font-size: 15 px;
    white-space: nowrap;
  }
  ${props => {
        if (props.keys === props.active) {
            return css`box-shadow: 0px 4px 12px rgba(255, 255, 255, 0.58);`
        }
    }}
  div {
    position: absolute;
    background-color: ${props => props.keys === props.active ? props.theme.ThemeColor : 'none'};
    width: 100%;
    height: 3px;
    bottom: 0;
    ${props => {
        if (props.keys === props.active) {
            return css`box-shadow: 0px 4px 12px rgba(0, 205, 112, 0.58);`;
        }
    }}
  }
`


const MediumDiv = styled.div`
  height: calc(100% - 165px);
  @media only screen and (max-width: 375px) { 
    height: calc(100% - 110px);
  }
  // @media screen and (max-width: 800px) {
  //   height: calc(100% - 105px - 20px);
  // }
  overflow: auto;
  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.ScrollTraker};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${props => props.theme.ScrollBar};
  }

  overflow: auto;
  /* height: 60%; */
`
const Selector = styled.div`
  /* background-color: ${props => props.theme.ToolBgColor}; */
  /* background-color: red; */
  width: ${props => props.width ?? 'auto'};
  display: flex;
  padding: ${props => props.padding ?? '30px 15px'};
  padding-bottom: 0;
  padding-left: ${props => props.width ? '5px' : '15px'};
  gap: ${props => props.gap ?? '15px'};
  justify-content: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow-x: auto;
  margin-bottom: 30px;
  @media screen and (max-width: 800px) {
    /* flex-wrap: nowrap; */
    padding: 10px 10px;
    height: 55%;
  }
  /* height: 100%; */
`

const SelectItem = styled.div`
  min-width: ${props => props.width ?? '50px'};
  min-height: ${props => props.height ?? '50px'};
  overflow: hidden;
  background-position: center;
  border-radius: 20px;
  outline: ${props => props.now !== props.me ? '2px solid white' : `4px solid ${props.theme.ThemeColor}`};
  box-shadow: ${props => props.now === props.me ? '0px 0px 13px 4px ' + props.theme.ThemeColor : '0px 0px 1px 2px #fff'};
  background-image: url(${props => props.bgImg});
  background-repeat: no-repeat;
  background-size: cover;
  &:hover {
    transform: scale(1.1);
  }
  margin-bottom: 5px;
  @media not all and (min-resolution:.001dpcm) { @media {
    outline: none;
    margin-top: ${props => props.now === props.me ? '-3px' : '0'};
    border: ${props => props.now === props.me ? `4px solid ${props.theme.ThemeColor}` : 'none'};
    min-width: ${props => props.width ?? (props.now === props.me ? '45px' : '50px')};
    min-height: ${props => props.height ?? (props.now === props.me ? '45px' : '50px')};
}}
`

const SelectItemPrice = styled.div`
  text-align: center;
  color: ${props => props.theme.color};
  font-family: ${props => props.now === props.me ? 'Rajdhani-Regular' : 'Rajdhani-Light'};
  font-size: 13px;
`

const TextDiv = styled.div`
  margin: 10px;
  border: 1px solid ${props => props.theme.ThemeColor};
  padding: 5px;
  color: ${props => props.theme.color};
  .added-text {
    color: ${props => props.theme.color};
    width: calc(100% - 2 * 10px);
    padding: 10px;
    outline: none;
    border: ${props => props.theme.DirectIconBorder};
    background-color: ${props => props.theme.HeadIconBgColor};
    margin-bottom: 20px;
  }
  .font-type {
    color: ${props => props.theme.color};
    width: 100%;
    padding: 10px;
    outline: none;
    border: ${props => props.theme.DirectIconBorder};
    background-color: ${props => props.theme.DirectIconBgColor};
    margin-bottom: 20px;
  }
`

const ImgDiv = styled.div`
    margin: 0 auto;
  margin-top: 10px;
  width: 50%;
  border: 1px solid ${props => props.theme.ThemeColor};
  color: ${props => props.theme.color};
  .added-text {
    color: ${props => props.theme.color};
    width: calc(100% - 2 * 50px);
    outline: none;
    border: ${props => props.theme.DirectIconBorder};
    background-color: ${props => props.theme.HeadIconBgColor};
  }
  .font-type {
    color: ${props => props.theme.color};
    width: 100%;
    outline: none;
    border: ${props => props.theme.DirectIconBorder};
    background-color: ${props => props.theme.DirectIconBgColor};
  }
`

const FontOption = styled.option`
  width: 100%;
  padding: 10px;
  font-size: 20px;
  outline: none;
  border: ${props => props.theme.DirectIconBorder};
  margin-bottom: 20px;
  min-height: 30px;
  height: 20px;
  font-family: ${props => props.family};
`;

const UploadImg = styled.div`
  padding-bottom: 2px;
  padding-top: 5px;
  color: ${props => props.theme.color};
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    width: 100px;
    // height: 100px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 50%;
      height: 50%;
      stroke: ${props => props.theme.ThemeColor}
    }
  }
  h1 {
    font-family: 'Rajdhani-Light';
    font-weight: lighter;
    font-size: 16px;
  }

`

// Chaing...
const Hr = styled.div`
  height: 3px;
  width: 100%;
  background-color: #494B51;
  display: inline-block;

  & + ${Selector} {
    overflow-y: auto;
    height: 100%;
    ::-webkit-scrollbar {
      width: 3px;
      height: 3px;
    }

    ::-webkit-scrollbar-track {
      background: ${props => props.theme.ScrollTraker};
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: ${props => props.theme.ScrollBar};
    }
    @media screen and (max-width: 800px) {
      height: 55%;
    }
  }
`

const Menu = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: ${props => props.mf ? 'black' : 'none'};
  overflow: auto;
`

const Remove = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  span {
    margin: 20px 20px 0 0;
    float: right;
    font-size: 30px;
    color: ${props => props.theme.color};
  }
`

const MenuBody = styled.div`
  padding-top: 50px;
  overflow: auto;
  margin-bottom: 100px;
`
const MenuItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${props => props.theme.color};
  ${(props) => {
        if (props.me === props.curr) {
            return css`
        color: ${props.theme.ThemeColor};
      `;
        }
    }}
  img {
    width: 46px;
    margin-right: 10px;
  }
  padding: 10px;
  transition: all .1s;
  margin-left: 0;
  &:hover {
    margin-left: 10px;
  }
  svg {
    display: ${props => props.stat ? 'block' : 'none'};
    color: ${props => props.theme.color};
    /* ${(props) => {
        if (props.stat) {
            return css`
          color: ${props.theme.ThemeColor};
        `;
        }
    }} */
  }
`


const RozorBack = styled.div`
  width: 100%;
  padding: 0 RozorBakc0px;
  display: flex;
  & > div:nth-child(1) {
    padding: 20px 20px;
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
`
const RozorItem = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: 'sofiapro';
  font-size: 8px;
  color: ${props => props.theme.color};
  text-align: center;
  width: 40%;
  height: auto;
  padding: 20px;
  border: ${props => props.theme.SwapBorder};
  svg {
    fill: ${props => props.theme.color}
  }
  div {
    width: 100%;
    display: inline-block;
    background-color: red;
  }
  span {
    display: ${props => props.flag ? 'flex' : 'none'};
    position: absolute;
    top: 5px;
    right: 5px;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    svg {
      width: 100%;
      height: 100%;
      fill: ${props => props.theme.ThemeColor};
    }
  }
`
const SBsCheck = styled(BsCheck)`
  svg {
    /* fill: ${props => props.theme.ThemeColor} */
  }
  margin-left: 20px;
`

const TextOptionDiv = styled.div`
  width: 100%;
  padding: 0 30px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

const TextOption = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  border: ${props => props.theme.SwapBorder};
  color: ${props => props.theme.color};
  font-size: 10px;
  position: relative;
  padding: 30px 10px;
  font-family: 'Rajdhani-Light';
  cursor: pointer;
  & :nth-child(1) {
    /* width: 50px;
    height: 50px; */
    margin-bottom: 20px;
  }
  & svg:nth-child(3) {
    position: absolute;
    top: 10px;
    right: 10px;
    color: ${props => props.theme.ThemeColor};
    width: 20px;
    height: 20px;
    display: ${props => props.stat ? 'black' : 'none'}
  }
`

const AddToCartDiv = styled.div`
  padding: 20px;
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button {
    color: #EEE;
    padding: 10px;
    background-color: ${props => props.theme.ThemeColor};
    border-radius: 30px;
    border: 0;
    font-weight: 600;
    font-family: 'abel';
    font-size: 28px;
    width: 60%;
    transition:all 0.1s;
    &:hover {
      transform: scale(1.1);
    }
    @media screen and (max-width: 800px) {
        padding: 5px !important;
        font-size: 20px;
        & > p:nth-child(1) {
            height: 22px !important;
        }
        & > p:nth-child(2) {
            font-size: 25px !important;
            height: 25px !important;
        }
    }
  }
`

const TotalPrice = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 10px;
  & span:nth-child(1) {
    font-size: 14px;
    font-family: 'sofiapro';
    color: #999999;
    @media only screen and (max-width: 375px) { 
        margin-top: 5px;
    }
  }
  & span:nth-child(2) {
    font-size: 25px;
    font-family: 'Rajdhani-Bold';
    font-size: 20px;
    line-height: 30px;
    @media only screen and (max-width: 375px) { 
        line-height: 22px;
    }
    color: ${props => props.theme.ThemeColor};
  }
`

const Info = styled.div`
  text-align: right;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  width: 80%;
  & > div:nth-child(1) {
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    text-align: left;
    & > span:nth-child(1) {
      font-size: 13px;
      font-family: 'sofiapro';
      color: #999999;
      @media only screen and (max-width: 375px) { 
         margin-top: 3px;
      }
    }
    border-left: 1px solid lightgrey;
  }
`

const EDD = styled.span`
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
  color: black;
  font-family: 'Rajdhani-Bold';
  @media only screen and (max-width: 375px) { 
    font-size: 15px;
    line-height: 15px;
  }
`

const ATC = styled.button`
  cursor: pointer;
  /*padding: 0 40px;*/
  @media screen and (max-width: 1340px) {
    padding: 0 30px;
  }
  @media screen and (max-width: 1165px) {
    padding: 0 10px;
  }
  @media screen and (max-width: 800px) {
    padding: 0 20px;
  }
  
  /* display: ${props => props.flag ? 'flex' : 'none'}; */
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  font-family: 'abel';
  color: white;
  border: 0;
  border-radius: 20px;
  background-color: ${props => props.theme.ThemeColor};
  border: 0.5px solid #00D578;
  box-shadow: 0px 4px 12px rgba(0, 205, 112, 0.58);
  border-radius: 6px;
  img {
    content: url(${props => props.theme.AtcIcon});
  }
  transition: all 0.1s;
  &:hover {
    transform: scale(1.1);
  }
  @media only screen and (max-width: 375px) { 
    font-size: 13px;
    padding: 5px 5px !important;
    // padding-left: 5px !important;
    // padding-right: 5px !important;
    i {
      display: none !important;
      font-size: 20px !important;
      width: 20px !important;
    }
  }
`


const LocalFooter = styled.div`
	& > div:nth-child(1) {
		width: 100%;
		z-index: 600;
		border-top: ${props => props.showTopBorder ? '1px solid #808080' : '0'};
        background-color: #1E2025;
		p {
		    height: 30px;
			width: 90%;
			text-align: left;
			padding: 0px 10px;
			padding-top: 5px;
			color: ${props => props.theme.color};
			font-family: 'Rajdhani-Medium';
			font-size: 16px;
			span {
				font-family: 'sofiapro';
				font-size: 16x;
				@media only screen and (max-width: 375px) { 
		          font-size: 13x;
                }
			}
	        @media only screen and (max-width: 375px) { 
		        height: 21px;
		        padding-top: 1px;
		        font-size: 13x !important;
            }
			@media screen and (max-width: 800px) {
				text-align: center;
			}
		}
		@media screen and (max-width: 800px){
			/* bottom: 20px; */
		}
		position: absolute;
		bottom: 0;
		display: flex;
		align-items: center;
		flex-direction: column;
		#info_div {
			width: 90%;
			border-radius: 6px;
			border: 1px solid #00CE71;
			padding: 5px 10px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: white;
			margin-bottom: 10px;
			@media only screen and (max-width: 375px) { 
			    margin-bottom: 2px;
			    padding: 0 10px !important;
            }
      box-shadow: 1px 1px 18px 1px ${props => props.theme.ThemeColor};
		}
	}
`

const EsportsWrapper = styled.div`
  
`

const EsportsContainer = styled.div`
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.ScrollTraker};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${props => props.theme.ScrollBar};
  }
  @media screen and (max-width: 800px) {
    height: 55%;
  }
  & > div:nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  & > div:nth-child(2) {
    padding: 20px 20px;
    color: ${props => props.theme.color};
  }
  gap: 4%;
`

const EsportItems = styled.div`
  width: 26%;
  font-family: 'sofiapro';
  color: ${props => props.theme.color};
  position: relative;
  font-size: 15px;
  padding: 10px;
  border: ${props => props.theme.SwapBorder};
  text-align: center;
  cursor: pointer;
  & > div:nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    /* flex-wrap: wrap; */
    height: 50px;
    svg {
      width: 80%;
      height: 80%;
      fill: white;
    }
    img {
      width: 30px;
      height: 30px;
    }
  }

  & > div:nth-child(2) {
    text-align: center;
    margin: 1 0px 0;
    white-space: nowrap;
    color: ${props => props.flag ? props.theme.ThemeColor : props.theme.color};
    font-family: ${props => props.isDefault ? 'sofiapro' : 'Rajdhani-Regular'};
    font-size: ${props => props.isDefault ? '15px' : '19px'};
  }

  & > div:nth-child(3) {
    position: absolute;
    top: 5px;
    right: 5px;
    display: ${props => props.flag ? 'block' : 'none'};
    svg {
      fill: ${props => props.theme.ThemeColor};
    }
  }
`

const CusSwitch = styled.div`
  width: 40px;
  height: 20px;
  background-color: ${props => props.flag ? props.theme.ThemeColor : '#aaa'};
  border-radius: 20px;
  position: relative;
  div {
    position: absolute;
    background-color: white;
    display: inline-block;
    height: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 20px;
    transition: all .5s;
    top: 0;
    ${props => props.flag ? 'right' : 'left'}: 1px;
  }
`

const RemapDiv = styled.div`
  border: 1px solid ${props => props.theme.ThemeColor};
  padding: 0 20px;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: 'sofiapro';
  font-size: 17px;
  font-weight: lighter;
  h6 {
    margin-left: 10px;
  }
`

const MarkDiv = styled.div`
  img {
    content: url(${MarkImg});
    vertical-align: middle;
    display: inline-block;
  }
  &:hover {
    img {
      content: url(${MarkHoverImg});
    }
  }
  border-radius: 100%;
`

const UnderlinedDiv = styled.div`
  display: flex;
  align-items: center;
  // width: 120px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${props => props.theme.color};
  img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
`

const MobileSelector = styled.select`
  border: 1px solid ${props => props.theme.ThemeColor};
  box-shadow: 2px 2px 10px 1px ${props => props.theme.ThemeColor};
  font-family: 'sofiapro';
  color: ${props => props.theme.ThemeColor};
  background-color: transparent;
  display: none;
  option {
    background-color: ${props => props.theme.ToolBgColor};
  }

  @media screen and (max-width: 800px) {
    display: block;
  }
`

export default Tools;
