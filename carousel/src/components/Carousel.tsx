import React,{useState,useEffect} from 'react'
import styled from '@emotion/styled/macro';
import {css}  from '@emotion/react';
import {RiArrowDropLeftLine,RiArrowDropRightLine} from 'react-icons/ri';


const Base = styled.div`

`;


const Container = styled.div`
    position: relative;
`;

const ArrowButton = styled.button<{pos:'left' | 'right'}>`
    position: absolute;
    top:50%;
    z-index: 1;
    padding: 8px 12px;
    font-size:48px;
    font-weight: bold;
    background-color: transparent;
    color:#fff;
    border: none;
    margin: 0;
    cursor: pointer;
    ${({pos}) => pos === 'left' ? css `left:0` : css `right:0`};

`;


const CarouselList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    overflow: hidden;

`;


const CarouselItem = styled.li<{activeIndex: number}>`
    width: 100%;
    flex: 1 0 100%;
    transform: translateX(-${({activeIndex}) => activeIndex * 100}%);
    transition: 200ms ease;
    > img{
        width: 100%;
        height: fit-content;
    }

`;


const NavButton = styled.button<{isActive?:boolean}>`
    width:4px;
    height: 4px;
    background-color: #000;
    opacity: ${({isActive})=> isActive ? 0.3 : 0.1};

`;

const NavItem = styled.li`
    display: inline-block;

`;

const Nav = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    ${NavItem} + ${NavItem}{
        margin-left: 4px;
    }
`;

const banners = ["https://via.placeholder.com/600/92c952","https://via.placeholder.com/500/92c952","https://via.placeholder.com/800/92c952"];


const Carousel: React.FC = () =>{
    const [activeIndex,setActvieIndex] = useState<number>(0);
    const [isFocused,setIsFoused] = useState<boolean>(false);
    const handleNext = () =>{
        setActvieIndex(prev => (prev + 1) % banners.length);
    }
    const handlePrev = () =>{
        setActvieIndex(prev => (prev - 1 + banners.length ));
    }

    const goTo = (idx:number) =>{
        setActvieIndex(idx);
    }

    useEffect(()=>{
        let intervalid:NodeJS.Timeout;


        if(!isFocused){
            intervalid = setInterval(handleNext, 3000);
        }
        return () =>{
            clearInterval(intervalid);
        }
    },[isFocused])
    const handleMouseEnter = () =>{
        setIsFoused(true);
    }
    const handleMouseLeave = () =>{
        setIsFoused(true);
    }
    return(
        <Base onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Container>
                <ArrowButton pos="left" onClick={handlePrev}>
                    <RiArrowDropLeftLine/>
                </ArrowButton>
                
                <CarouselList>
                {
                    
                    banners.map((banner,idx)=>(
                        <CarouselItem activeIndex={activeIndex} key={idx}>
                            <img src={banner}/>
                        </CarouselItem>

                    ))
                }
                </CarouselList>
                <ArrowButton pos="right" onClick={handleNext}>
                    <RiArrowDropRightLine/>
                </ArrowButton>
            </Container>
            <Nav>
                {
                    Array.from({length:banners.length}).map((_,idx)=>(
                        <NavItem key={idx} onClick={() => goTo(idx)}>
                            <NavButton isActive={activeIndex === idx } />                            
                        </NavItem>
                    ))
                }
            </Nav>
        </Base>
    )
}





export default Carousel;