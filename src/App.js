import React, { memo, Suspense } from "react";
// import { renderRoutes } from "react-router-config";
// import { Provider } from "react-redux";

import AppHeader from "@/components/AppHeader"
export default memo(function App() {
    return (
        <div>
           <AppHeader />
        </div>
    )
})