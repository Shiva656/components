import axios from "axios";
import {APPUP_URL, COMPILE_URL,CATEGORY_TEMPLATE_URL} from "./constants.js";

const retriveData = function(themeID,method){

    if(themeID == ""){
        var url = APPUP_URL;
    }else {
        url = APPUP_URL+'/'+themeID;
    }


    return new Promise((resolve, reject) => {

        axios({
            method: method,
            url: url
        }).then(function(response){
             resolve(response);
        }).catch(function(error){
            reject(error);
        });



    });
}

const insertUpdateData = function(data, method, header){

    if(header == ""){
        var url = COMPILE_URL;
    }else {
        url = APPUP_URL;
    }
    

    return new Promise((resolve, reject) => {

        axios({
        method: method,
        url: url,
        data: data,
        header: header
        }).then(function(response){
             resolve(response);
        }).catch(function(error){
            reject(error);
        });



    });
}
export {retriveData, insertUpdateData}