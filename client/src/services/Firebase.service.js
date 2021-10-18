import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


export const provider = new GoogleAuthProvider();

export const authGoogle = getAuth();

export const googleLogin = async (res) => {
    try {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(res);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = res.user;
            return {credential: credential, token: token, user: user};

    } catch(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        
        console.error(errorCode, errorMessage, email, credential);
    }
}
