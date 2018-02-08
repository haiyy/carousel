<template>
    <div>
    </div>
</template>
<script>
import AsyncLoadImages from "./js/loadImage.js"
export default {
    name: "LoadImages",
    mounted() {
        this.go();
    },
    methods: {
        go() {
        const axios=require("axios");
        console.log(axios)
            axios.get("http://localhost:8080/mock").then(function(result){
                let LoadImages=new AsyncLoadImages(result.data);
            })
        }
    }
}
</script>
<style>
@import "./css/style.css";
</style>