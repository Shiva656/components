import Vue from 'vue';
const wrapperMap = require("./wrapper.json");

function getWrapperConfig(wrapperName) {
    return wrapperMap[wrapperName] ? wrapperMap[wrapperName] : null;
}

function fetchDependencies(cdnUrls, callback) {
    const loadjs = require('loadjs');
    loadjs(cdnUrls, callback);
}

function getAsyncComponent(compName, cdnUrls) {
    return new Promise(function (resolve, reject) {
        fetchDependencies(cdnUrls, () => {
            resolve(window[getWrapperConfig(compName).importName].default);
        });
    });
}

function loadComponent(compName, cdnUrls) {
    return function (resolve, reject) {
        getAsyncComponent(compName, cdnUrls).then(resolve, reject);
    }
}

export default {
    init: function () {
        for (var wrapperName in wrapperMap) {
            Vue.component(wrapperName, loadComponent(wrapperName, wrapperMap[wrapperName].cdnUrls));
        }
    }
}