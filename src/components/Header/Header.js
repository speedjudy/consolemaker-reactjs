import React, {useState} from "react";
import styled from "styled-components";
import SideDrawer from '../SideMenu/SideDrawer'
import BackDrop from '../SideMenu/BackDrop'
import {API_ENDPOINT} from "../Tools/API_GetOption";
const Header = (props) => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false)
  React.useEffect(() => {
  })
  let backdrop;
  if (sideDrawerOpen) {
    backdrop = <BackDrop click={() => {setSideDrawerOpen(false)}} />;
  }
  const menuClicked = (menu) => {
    setSideDrawerOpen(false)
    props.controllerChange(menu)
  }
  return <>
    <Wrapper id="header">
      <Container>
        <RightDiv onClick={() => {
          //setSideDrawerOpen(!sideDrawerOpen)
        }}>
          {/*<img alt="no img" />*/}
          <img alt="no img" style={{cursor: 'pointer'}} onClick={() => {
            //props.modeChange()
            window.location.href = API_ENDPOINT()
          }}/>
          <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
            <span>
            {props.menuSelected.title}
          </span>
            {props.menuSelected.desc && <span style={{fontSize: 18, fontFamily: 'sofiapro'}}>{props.menuSelected.desc}</span>}
          </div>
        </RightDiv>
        {/*<LeftDiv>*/}
        {/*  /!* <SearchInput placeholder={'Search'} type="text" resflag={0}></SearchInput> *!/*/}
        {/*  <BritiSpan><img alt="no img"/></BritiSpan>*/}
        {/*  <FeatherSpan><img alt="no img"/></FeatherSpan>*/}
        {/*  /!* <AvatarSpan><img alt="no img"></img></AvatarSpan> *!/*/}
        {/*</LeftDiv>*/}
      </Container>
      <ResponContainer>
        <TopDiv onClick={() => {
          //props.modeChange()
          window.location.href = API_ENDPOINT()
        }}>
          <img alt="no img"/>
        </TopDiv>
        <BotDiv>
        </BotDiv>
      </ResponContainer>
    </Wrapper>
    <SideDrawer show={sideDrawerOpen} menuClicked={menuClicked.bind(this)}/>
    {backdrop}
  </>
}

const ResponContainer = styled.div`
  display: none;
  @media screen and (max-width: 800px) {
    display: block;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.bgColor};
  position: relative;
  border-bottom: 5px solid ${props => props.theme.HeaderButtom};
  @media only screen and (max-width: 375px) { 
    height: 40px;
    border-bottom: 2px solid ${props => props.theme.HeaderButtom};
  }
`

const TopDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  // & > img:nth-child(1) {
  //   content: url(${props => props.theme.ResponIcon});
  // }
  & img:nth-child(1) {
    height: 50px;
    content: url(${props => props.theme.Logo});
    @media screen and (max-width: 800px) {
       margin-top: 8px;
       height: 40px;
    }
    @media only screen and (max-width: 375px) { 
        height: 28px;
    }
  }
`

const TopDivMobile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  & > img:nth-child(0) {
    height: 50px;
    content: url(${props => props.theme.Logo});
  }
`
const BotDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.bgColor};
  padding: 10px 0;
  @media screen and (max-width: 800px) {
    display: none;
  }
`

const RightDiv = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  width: max-content;
  img {
    margin-left: 30px;
  }

  // & img:nth-child(1) {
  //   content: url(${props => props.theme.ResponIcon});
  // }

  & img:nth-child(1) {
    height: 50px;
    content: url(${props => props.theme.Logo});
  }

  span {
    margin-left: 30px;
    font-size: 30px;
    font-family: 'Rajdhani-Regular';
    color: ${props => props.theme.color};
    @media screen and (max-width: 400px) {
      font-size: 20px;
    }
  }
`

const LeftDiv = styled.div`
  margin-right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: min-content;
  gap: 20px;
`

const SearchInput = styled.input`
  background-color: ${props => props.theme.SearchBgColor};
  background-image: url(${props => props.theme.SearchIcon});
  width: ${props => props.resflag === 0 ? '300px':'85%'};
  border: 0;
  background-repeat: no-repeat;
  background-position: calc(100% - 20px) center;
  padding: 16px;
  color: ${props => props.theme.color};
  border-radius: 20px;
  padding-right: 50px;
  margin-bottom: 10px;
  margin-top: 10px;
  &:focus {
    outline: none;
  }
`

const BritiSpan = styled.span`
  background-color: ${props => props.theme.HeadIconBgColor};
  padding: 12px 17px;
  border-radius: 15px;
  border: ${props => props.theme.DirectIconBorder};
  img {
    content: url(${props => props.theme.BritiIcon});
  }
`;

const FeatherSpan = styled.div`
  background-color:${props => props.theme.HeadIconBgColor};
  padding: 12px 15px 12px 10px;
  border-radius: 15px;
  position: relative;
  border: ${props => props.theme.DirectIconBorder};

  span {
    background-color:${props => props.theme.InformBgColor};
    position: absolute;
    width: 23px;
    height: 23px;
    text-align: center;
    border-radius: 15px;
    color: white;
    font-weight: bold;
    border: 2px solid white;
    top: -10px;
    right: -10px;
  }

  img {
    content: url(${props => props.theme.FeatherIcon});
  }
`

const AvatarSpan = styled.span`
  border-radius: 15px;
  img {
    content: url(${props => props.theme.Avatar});
  }
`


export default Header;
