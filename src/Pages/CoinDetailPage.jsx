import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import HistoryChart from '../components/HistoryChart';
import CoinData from '../components/CoinData';
import coinGecko from '../APIs/coinGecko';


const CoinDetailPage = () => {
    const { id } = useParams();
    const [coinData, setCoinData] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    const reformatData = data => {
        return data.map(el => {
            return {
                t: el[0],
                y: el[1].toFixed(2)
            };
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const [day, week, year, detail] = await Promise.all([
                coinGecko.get(`/coins/${id}/market_chart`, {
                    params: {
                        vs_currency: 'usd',
                        days: '1',
                    },
                }),
                coinGecko.get(`/coins/${id}/market_chart`, {
                    params: {
                        vs_currency: 'usd',
                        days: '7',
                    },
                }),
                coinGecko.get(`/coins/${id}/market_chart`, {
                    params: {
                        vs_currency: 'usd',
                        days: '365',
                    },
                }),
                coinGecko.get('/coins/markets', {
                    params: {
                      vs_currency: 'usd',
                      ids: id
                    }
                  }),
            ])

            setCoinData({
                day: reformatData(day.data.prices), 
                week: reformatData(week.data.prices), 
                year: reformatData(year.data.prices),
                detail: detail.data[0]
            });
            setIsLoading(false);
        };
        fetchData();
    }, []);


    const renderData = () => {
        if(isLoading){
            <div>Loading...</div>
        }
        return (
            <div className="coinlist">
                <HistoryChart data={coinData} />
                <CoinData data={coinData.detail} /> 
            </div>
        )
    }
    return renderData();
}

export default CoinDetailPage;