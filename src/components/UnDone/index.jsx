import React, { memo } from "react";

import { UnDoneWrapper } from "./style";

export default memo(function UnDone() {
    return (
        <UnDoneWrapper>
            <h3>组件还未做，敬请期待...</h3>
        </UnDoneWrapper>
    )
})