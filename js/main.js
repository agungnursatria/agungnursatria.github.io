var webPush = require('web-push');
var pushSubscription = {
    "endpoint": "https://android.googleapis.com/gcm/send/cqJOh70B7q8:APA91bFK-mzuFH8QyzqORJ81bt0yegmKD6Xdp9HPaY6tUe0VIVlu41N7lLES8YEufympjcr4vNhIuLafB0GdSRWUNW6HMnv_le0lwkQlAIwbJ5pyMw-gia1hiw-oA7Gnsx7Z_FVG7x7r",
    "keys": {
        "p256dh": "BHOmkIVWBPcyQHZZQrsOZh1K3abVrFPCV2pFoOeV7B9ssxnM7IP+TFFIwi41UO0gOT5uaUAmiLgZBTAUqjJgcgI=", 
        "auth": "AykjKBkmfxUm4lPkDZtTDg=="
    }
};
var payload = 'Here is a payload!';
var options = {
    gcmAPIKey: 'AIzaSyCIwnQbXlgMm7kEJnjrzS4oBApX8voCICM',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);