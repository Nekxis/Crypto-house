export type FetchStatsQuery = {
    status: string,
    data: {
        stats: stats
        coins: coin[]

    },

}

type stats = {
    total: number
    totalCoins: number,
    totalMarkets: number,
    totalExchanges: number,
    totalMarketCap: string,
    total24hVolume: string,
}

type coin = {
    uuid: string,
    symbol: string,
    name: string,
    iconUrl: string,
    price: string,
}


