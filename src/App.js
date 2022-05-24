import React, { memo, Suspense } from "react";
import { renderRoutes } from "react-router-config";
// 导入provider组件，利用这个组件包裹我们的结构，从而能够达到统一维护store的结果
import { Provider } from "react-redux";


import routes from "./router"
import store from "./store/index"

import AppHeader from "@/components/AppHeader"
import AppFooter from "@/components/AppFooter"
import Loading from "./components/Loading"
import AppPlayBar from "@/pages/Player/AppPlayBar";
export default memo(function App() {
    return (
        <div>
           <Provider store={store}> 
                <AppHeader />
                <Suspense fallback={<Loading />}>{renderRoutes(routes)}</Suspense>
                <AppFooter />
                <AppPlayBar />
           </Provider>
        </div>
    )
})