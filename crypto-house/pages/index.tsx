import React from "react";
import Nav from "../src/nav/Nav";
import {useGetStatsByNameQuery} from "../store";

export default function Home() {

    const {data} = useGetStatsByNameQuery()

  return (
    <>
      <Nav />
        {JSON.stringify(data)}
    </>
  )
}
