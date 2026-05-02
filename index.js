document.getElementById("sign-in-btn").addEventListener("click", function() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username === "admin" && password === "admin123") {
        alert("Login successful!");
        window.location.assign("home.html");
    }
    else {
        alert("Invalid credentials. Please try again.");
        return ;
    }
});

