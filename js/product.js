const isLoggedIn = !!localStorage.getItem("alphaUser");

if(!isLoggedIn){
    window.location.href="/Templates/helpers/errorPage.html"
}