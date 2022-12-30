export type FetchStatsQuery = {
    status: string,
    data: {
        totalCoins: number,
        totalMarkets: number,
        totalExchanges: number,
        totalMarketCap: string,
        total24hVolume:  string,
        btcDominance: number,
        bestCoins: bestCoin[]
        newestCoins: bestCoin[]
    },

}

type bestCoin = {
    uuid: string,
    symbol: string,
    name: string,
    iconUrl: string,
    coinrankingUrl: string
}


