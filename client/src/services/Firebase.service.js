import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";


export const provider = new GoogleAuthProvider();

export const authGoogle = getAuth();
