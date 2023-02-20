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

export type coin = {
    uuid: string,
    symbol: string,
    name: string,
    iconUrl: string,
    price: string,
    change: string,
    sparkline: string[]
}

export type FirestoreStore = {
    theFirestore: Firestore
}

export type Firestore = {
    theFirestore: uuid[]
}

export type uuid = {
    uuid: string
}

export type userStore = {
    user: userObject
}

type userObject = {
    user: userData
}

export type userData = {
    uid: string;
    name: string;
    email: string;
}




