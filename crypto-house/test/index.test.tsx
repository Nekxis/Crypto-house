import React from "react";
import {Provider} from "react-redux";
import {store} from "../store";
import {render} from "@testing-library/react";
import MenuDrawer from "../src/menuDrawer/MenuDrawer";

describe('index fetch', () => {

    test('fetching favorites', ()=>{
       renderWithContext(<MenuDrawer />);
       expect(true).toBeTruthy()
    })

    function renderWithContext(element: React.ReactElement) {
        render(
            <Provider store={store}>
                {element}
            </Provider>
        )
    }

})
