import React, { memo, Suspense } from "react";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";

import store from "./store/index"

import AppHeader from "@/components/AppHeader"
import AppFooter from "@/components/AppFooter"
export default memo(function App() {
    return (
        <div>
           <Provider store={store}> 
                <AppHeader />
                <AppFooter />
           </Provider>
        </div>
    )
})