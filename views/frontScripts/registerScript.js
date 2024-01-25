function checkPasswords() {
    var password = document.getElementById("password").value;
    var confirm_password = document.getElementById("confirm_password").value;

    if (password !== confirm_password) {
        alert("Passwords do not match. Please make sure both passwords are the same.");
        return false; 
    }

    return true; 
}