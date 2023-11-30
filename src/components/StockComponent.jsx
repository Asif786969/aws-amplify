import ColorComponent from "./ColorComponent";
import BoxComponent from "./Boxcomponenet";
import { styled } from "styled-components";
import {Logosvg} from "./LogoComponent";
import Red from "./svgs/red";
import Green from "./svgs/green";
const StockElement = styled.div`

  display:grid;
  grid-template-columns:2fr 2fr 2fr 2fr 2fr 2fr 1fr;  
  padding-left:4rem;

`;

const StockComponent=({name,price,change,symbol,volume,rsi,ha})=>{
    const handleClick=()=>{
        
        const url="https://in.tradingview.com/chart/LrprtqNZ/?symbol="+symbol.slice(0,-3);
        window.open(url,'_blank');
        
        
    };
    return(
        <StockElement className="stockName">
            <BoxComponent element={name}/>
            <BoxComponent element={price}/>
            <BoxComponent element={<ColorComponent value={change.toFixed(2)}/>} />  
            <BoxComponent element={rsi.toFixed(2)}/>
            {ha?<Green/>:<Red/>}
            <BoxComponent element={parseFloat(volume*price/10000000).toFixed(1)+"Cr"}/>          
            <p onClick={handleClick}><Logosvg/></p>
            
        </StockElement>
    );
};
export default StockComponent;