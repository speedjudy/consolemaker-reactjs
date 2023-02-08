import axios from "axios";
//const BASE_URL = 'https://devcontrollermodz.fouble.com'
const BASE_URL = 'https://controllermodz.co.uk'
export const API_ENDPOINT = () => {
    return BASE_URL
}
const accessToken = '8712invg830mw8wkk41nguhh6afb2n3r' //'9xskibvno4ibb0v5d1pm34bq3djvldeu'//
export const M2_getOptions = async (sku) => {
    const please = await axios.get(`${BASE_URL}/rest/V1/products/${sku}/options`, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${accessToken}`,
        }
    });
    return please.data
};

export const M2_getProductByQuoteId = async (quoteId) => {
    const please = await axios.get(`${BASE_URL}/rest/V1/guest-carts/${quoteId}/items`, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${accessToken}`,
        }
    });
    return please.data
};

export const M2_getQuoteId = async () => {
    const createCart = await axios.post(`${BASE_URL}/rest/V1/guest-carts`, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    });
    return createCart.data.toString()
};

export const M2_postAddProduct = async (cartItem) => {
    const please = await axios.post(`${BASE_URL}/rest/V1/guest-carts/${cartItem.quoteId}/items`, {
        cartItem
    }, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${accessToken}`,
        }
    });
    return please.data
};

export const M2_postUpdateProduct = async (cartItem, itemId) => {
    const please = await axios.put(`${BASE_URL}/rest/V1/guest-carts/${cartItem.quoteId}/items/${itemId}`, {
        cartItem
    }, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${accessToken}`,
        }
    });
    return please.data
};

const ESTIMATED_DELIVERY = {
    'byops5': 193,
    'byops5led': 210,
    'byoxbx': 194,
    'build-your-own-ps4': 30,
    'buildyourownELITExb1': 91,
    'byoxbxled': 231
}
export const M2_getEstimatedDeliveryDate = async (sku) => {
    const please = await axios.get(`${BASE_URL}/estimateddeliverydate/message/update/id/${ESTIMATED_DELIVERY[sku]}`, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${accessToken}`,
            "Access-Control-Allow-Origin": '*',
        }
    });
    return please.data
};
