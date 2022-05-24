import React from "react";

import { Redirect } from "react-router-dom";



const Discover = React.lazy(() => import("@/pages/Discover"));
const Recommend = React.lazy((_) => import("@/pages/Discover/c-pages/Recommend"));
const Ranking = React.lazy((_) => import("@/pages/Discover/c-pages/Ranking"));


const Friends = React.lazy((_) => import("@/pages/Friends"));
/* 路由书写格式有时出问题 */
const routes = [
    {
        path: "/",
        exact: true,
        render: () => {
            return <Redirect to="/discover" />
        }
    },
    {
        path: "/discover",
        component: Discover,
        routes: [
            {
                path: "/discover",
                exact: true,
                render: () => <Redirect to="/discover/recommend" />,
            },
            {
                path: "/discover/recommend",
                component: Recommend,
            },
            {
                path: "/discover/ranking",
                component: Ranking,
            }
        ],
    },
    {
        path: "/friends",
        component: Friends,
    },
    
];

export default routes;