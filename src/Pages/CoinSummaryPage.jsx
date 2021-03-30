import React from 'react';
import CoinList from '../components/CoinList';
import AddCoin from '../components/AddCoin';

const CoinSummaryPage = () => {
    return (
        <div className="coinsummary shadow border p-2 rounded mt-2 bg-light">
            <AddCoin />
            <CoinList />
        </div>
    )
}

export default CoinSummaryPage;