import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {FetchStatsQuery} from "../Types";

export const coinApi = createApi({
    reducerPath: 'coinApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'https://api.coinranking.com/v2/',
        }),
    endpoints: (builder) => ({
        getStatsByName: builder.query<FetchStatsQuery, void>({query: () => 'coins',})
    }),
})

export const { useGetStatsByNameQuery } = coinApi
