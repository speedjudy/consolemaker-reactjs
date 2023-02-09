import React, {useEffect} from "react";
import {Routes, Route, Redirect, useNavigate, Navigate, BrowserRouter} from 'react-router-dom';
import VHome from "../views/Home/VHome";
import _404 from '../views/404/index'
import {useLocation} from "react-router";
import {M2_getQuoteId, API_ENDPOINT} from "../components/Tools/API_GetOption";

function useQuery() {
    const {search} = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
    /*
    if (location.protocol !== "https:") {
       location.replace(window.location.href.replace("http:", "https:"));
    }
     */
}

const Router = () => {
    const query = useQuery()
    let quote_id = query.get('q') ?? null
    const item_id = parseInt(query.get('id')) ?? null
    const pathName = window.location.pathname
    const pathNameCleaned = pathName.replace(/\//g, '');
    if (pathNameCleaned === 'byops5' || pathNameCleaned === 'build-your-own-ps4' || pathNameCleaned === 'byoxbx' || pathNameCleaned === 'buildyourownELITExb1' || pathNameCleaned === 'byops5led' || pathNameCleaned === 'byoxbxled')
    {
        if (!quote_id)
        {
            window.location.href = `${API_ENDPOINT()}/modz/cart/index?redirect=${window.location.href}`
            return
        }
        else if (quote_id === 'new')
        {
            (async() => {
                quote_id = await M2_getQuoteId()
                window.location.href = `${window.location.origin}${pathName}?q=${quote_id}`
            })()
            return
        }
    }

    return (
        <Routes>
            <Route path='/' element={<VHome selectedController={{
                title: 'Build Your Own Playstation 5 Controller',
                id: 'byops5',
                quote_id,
                item_id,
                iniPrice: 63.99
            }}/>}/>
            <Route path='/byops5' element={<VHome selectedController={{
                title: 'Build Your Own Playstation 5 Controller',
                id: 'byops5',
                quote_id,
                item_id,
                iniPrice: 63.99
            }}/>}/>
            <Route path='/build-your-own-ps4' element={<VHome selectedController={{
                title: 'Build Your Own Playstation 4 Controller',
                id: 'build-your-own-ps4',
                quote_id,
                item_id,
                iniPrice: 79.99
            }}/>}/>
            <Route path='/byoxbx' element={<VHome selectedController={{
                title: 'Build Your Own Xbox Controller',
                desc: '- Compatible with all Xbox One & Series S+X Consoles ',
                id: 'byoxbx',
                quote_id,
                item_id,
                iniPrice: 59.99
            }}/>}/>
            <Route path='/buildyourownELITExb1' element={<VHome selectedController={{
                title: 'Build Your Own Xbox ELITE Controller',
                id: 'buildyourownELITExb1',
                quote_id,
                item_id,
                iniPrice: 169.99
            }}/>}/>

            <Route path='/byops5led' element={<VHome selectedController={{
                title: 'Build Your Own PS5 LED Controller',
                id: 'byops5led',
                quote_id,
                item_id,
                iniPrice: 89.99
            }}/>}/>

            <Route path='/byoxbxled' element={<VHome selectedController={{
                title: 'Build Your Own Xbox LED Controller',
                id: 'byoxbxled',
                desc: '- Compatible with all Xbox One & Series S+X Consoles ',
                quote_id,
                item_id,
                iniPrice: 84.99
            }}/>}/>
            <Route path='/404' element={<_404/>}/>
            <Route path='*' element={<Navigate to="/404"/>}/>
        </Routes>
    )
}

export default Router;
