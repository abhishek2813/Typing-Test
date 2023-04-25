const errorMapping = {
    "auth/user-not-found":"Please Enter valid Email or Signup",
    "auth/email-already-exists" : "The provided email is already in use by an existing user.",
    "auth/wrong-password": "The password is invalid or the user does not have a password.",
    "auth/weak-password": "The password must be 6 characters long or more.",
    "auth/unkown": "Please Try Again"
}
export default errorMapping;