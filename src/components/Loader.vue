<template>
    <div class="lds-dual-ring"></div>
</template>

<style>
    .lds-dual-ring {
        display: inline-block;
        width: 40px;
        height: 40px;
    }
    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 60%;
        height: 60%;
        margin-left: 40px; 
        border-radius: 50%;
        border: 3px solid #fff;
        border-color: #fff transparent #fff transparent;
        animation: lds-dual-ring 1.5s linear infinite;
    }
    @keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>