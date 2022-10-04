<template>
    <main>
        <div id="authId" />
    </main>
</template>
<script lang="ts">
import * as React from "react";
import * as ReactDOM from "react-dom";
import SuperTokensReactComponent from "../components/ReactAuth";
//import ReactAuth from "../components/SupabaseUI.tsx"

export default {
    mounted(){
        ReactDOM.render(React.createElement(SuperTokensReactComponent), document.getElementById('authId'));
    },
    beforeDestroy(){
        ReactDOM.unmountComponentAtNode
(document.getElementById('authId') as Element);
    }
}
</script>
