function getHost() {
    return host;
}

function isLoggedIn() {
    if(localStorage.getItem("token")) {
        return true;
    } else {
        return false;
    }
}

function getTheToken() {
    return localStorage.getItem("token");
}

function saveTheToken(token) {
    localStorage.setItem("token", token);
    updateTheNavigationBar();
}

function removeTheToken() {
    localStorage.removeItem("token");
    updateTheNavigationBar();
}

let configuration = {
    isLoggedIn: () => isLoggedIn(),
    host: () => getHost(),
    token: () => getTheToken()
};

updateTheNavigationBar();

async function updateTheNavigationBar() {
    const navigation = document.getElementsByClassName("navbar")[0];
    if(navigation){
        let cart = navigation.getElementsByClassName("cart")[0];
    }

}



async function signup() {
    let email = document.getElementById("email").value;
    let username = document.getElementById("signup-username").value;
    let password = document.getElementById("signup-password").value;
    let customer = {email:email, username: username, password: password}
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
    };
    try {
        let response = await fetch(host + "/signup", request);
        if(response.status === 200) {
            alert("The registration was successful!")
            history.back();
        } else {
            console.log(`response status:${response.status}`);
            alert("Something went wrong!");
        }
    }
    catch(error) {
        console.log(error);
        alert("Something went wrong!");
    }
}
