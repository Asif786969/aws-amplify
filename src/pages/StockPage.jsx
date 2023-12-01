import Logosvg from "../components/LogoComponent"
import StockComponent from "../components/StockComponent";
import { useEffect, useState } from "react";
import "./StockPage.css";
import BoxComponent from "../components/Boxcomponenet";
import StockBar from "../components/StockBar";




const StockPage = () => {
    const [stocks, setStocks] = useState([]);
    
    const [newStocks, setNewStocks] = useState([]);
    
    const [sortstocksbyprice,setSortStocksPrice]=useState(false);
    const [sortstockbyvolume,setSortStockVolume]=useState(false);
    const [sortstockbychange,setSortStockChange]=useState(false);
    const [sortstockbyrsi,setSortStockRsi]=useState(false);
    



    const fetchData = async () => {
        try {
            const response = await fetch("/allstocks");
            const data = await response.json();
            
            
            const responsersi = await fetch("/allrsi");
            const dataRsi = await responsersi.json();
            
            
            const responseha = await fetch("/allha");
            const dataHa = await responseha.json();
            
            
            const tempdata=data.map((item,index)=>{
                    return {
                        stockName:item['stockName'],
                        stockSymbol:item['stockSymbol'],
                        stockPrice:item['stockPrice'],
                        stockChange:100*(item['stockPrice']-item['stockOld'])/item['stockOld'],
                        volume:(item['volume']),
                        rsi:dataRsi[index],
                        ha:dataHa[index]
                    };
            });
            return tempdata;
        

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    

    


       const updatedStocksData=async ()=>{
            const data=await fetchData();
            //console.log(data);
            setNewStocks(data);
           
       }


        useEffect(()=>{
            updatedStocksData();
        },[stocks])

    

    const sortStocksByPrice=()=>{
        const sortedStocks=[...newStocks]
        sortedStocks.sort((a,b)=>a.stockPrice-b.stockPrice);
        setNewStocks(sortedStocks);
        setSortStocksPrice(true);
        setSortStockVolume(false);
        setSortStockChange(false);
        setSortStockRsi(false);
    }

    const sortStockByVolume=()=>{
        const sortedStocks=[...newStocks]
        sortedStocks.sort((a,b)=>a.volume*a.stockPrice-b.volume*b.stockPrice);
        setNewStocks(sortedStocks);
        setSortStockVolume(true);
        setSortStockChange(false);
        setSortStocksPrice(false);
        setSortStockRsi(false);
    }

    const sortStockByChange=()=>{
        const sortedStocks=[...newStocks];
        sortedStocks.sort((a,b)=>a.stockChange-b.stockChange);
        setNewStocks(sortedStocks);
        setSortStockChange(true);
        setSortStocksPrice(false);
        setSortStockVolume(false);
        setSortStockRsi(false);
    }

    const sortRsiByChange=()=>{
        const sortedStocks=[...newStocks];
        sortedStocks.sort((a,b)=>a.rsi-b.rsi);
        setNewStocks(sortedStocks);
        setSortStockChange(false);
        setSortStocksPrice(false);
        setSortStockVolume(false);
        setSortStockRsi(true);
    }
    

    const handleClickRefresh = async () => {
        const refreshCaller = async () => {
            
            try {
                const response = await fetch("/refresh");
                
                console.log("refresh success");
                updatedStocksData();
                console.log("updated")
            } catch (error) {
                console.log(error + "error in refresh button");
            }
        };
        refreshCaller();
        
    };
    
    
    return (
        <div>
            <h1 className="heading">Stocks</h1>
            <StockBar sortStocksbyprice={sortStocksByPrice} sortStocksbyvolume={sortStockByVolume} sortStocksbychange={sortStockByChange} sortstockbyrsi={sortRsiByChange}/>
            <button onClick={handleClickRefresh}>Refresh</button>
           
            

            {  newStocks.map((ele) => (
                <StockComponent
                    key={ele.stockName}
                    name={ele.stockName}
                    price={ele.stockPrice}
                    change={ele.stockChange}
                    symbol={ele.stockSymbol}
                    volume={ele.volume}
                    rsi={ele.rsi}
                    ha={ele.ha}
                />
            ))}
            
        </div>
    );
};


export default StockPage;
