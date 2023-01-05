import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { configureStore } from '@reduxjs/toolkit';
import userReducer from ".//userSlice"
import {FetchStatsQuery} from "../Types";

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export const coinApi = createApi({
    reducerPath: 'coinApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'https://api.coinranking.com/v2/'
        }),
    endpoints: (builder) => ({
        getStatsByName: builder.query<FetchStatsQuery, void>({query: () => 'coins',})
    }),
})

export const { useGetStatsByNameQuery } = coinApi
