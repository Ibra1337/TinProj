const cookieName = "gamersCart";

function checkAndCreateCookie(cookieName) {


    
    var existingCookie = getCookie(cookieName);

    if (!existingCookie) {
        
        var currentDate = new Date();
        var expirationDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
        
        
        document.cookie = cookieName + "=init; expires=" + expirationDate.toUTCString() + "; path=/";

        console.log("Cookie 'gamersCart' created!");
    }
}


function getCookie(name) {
    var match = document.cookie.match(new RegExp(name + '=([^;]+)'));
    return match ? match[1] : null;
}



function getJsonCookie(cookie) {
    

    if (cookie) {
        var decodedValue = decodeURIComponent(cookie);
        return JSON.parse(decodedValue);
    }

    return null;
}

function setJsonCookie(cookieName, jsonObject, expirationDays) {
    var jsonString = JSON.stringify(jsonObject);

    var currentDate = new Date();

    var expirationDate = new Date(currentDate.getTime() + expirationDays * 24 * 60 * 60 * 1000);

    document.cookie = cookieName + "=" + encodeURIComponent(jsonString) + "; expires=" + expirationDate.toUTCString() + "; path=/";
}

function generateExpDate(){
    const expirationDays = 30;
    var currentDate = new Date();
    var expirationDate = new Date(currentDate.getTime() + expirationDays * 24 * 60 * 60 * 1000);
    return expirationDate;
}

function handleNewCookie(prodid)
{
    const data ={
    [prodid]:  1
    };


    const expirationDate = generateExpDate();

    const serializedData = JSON.stringify(data)
    
    document.cookie = cookieName+`=${encodeURIComponent(serializedData)}; expires=${expirationDate}; path=/`;
    console.log('new cookie')
}




function handleOldCookie(prodid , cookie)
{

    let data = JSON.parse(decodeURIComponent(cookie))
    if (data[prodid] !== undefined )
    {
        data[prodid] = data[prodid] + 1;
        console.log('contains');
    }else {
        data[prodid] = 1;
        console.log('containsnt');
    }
    
    const serializedData = JSON.stringify(data)
    const expirationDate = generateExpDate();
    
    document.cookie = cookieName+`=${encodeURIComponent(serializedData)}; expires=${expirationDate}; path=/`;
    console.log('old cookie detected');
}

function genetrateJson(prodid , cookie ){
    if (cookie ==='init')
    {
        handleNewCookie(prodid)
    }else
    {
        handleOldCookie(prodid , cookie);
    }

}

function addToCart(prodid){

    checkAndCreateCookie(cookieName);
    let cookie = getCookie(cookieName);
    //check if init 
    genetrateJson(prodid , cookie)

    console.log("cookie: " , cookie);
    console.log(document.cookie);
    console.log(prodid);

}