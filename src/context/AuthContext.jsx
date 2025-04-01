import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	FacebookAuthProvider,
	OAuthProvider,
} from "firebase/auth";

const AuthContext = createContext();

export const useContextAuth = () => {
	return useContext(AuthContext);
};

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// authProvider
export const AuthProvide = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// register a user
	const registerUser = async (email, password) => {
		return await createUserWithEmailAndPassword(auth, email, password);
	};

	// login the user
	const loginUser = async (email, password) => {
		return await signInWithEmailAndPassword(auth, email, password);
	};

	// sing up with google
	const signInWithGoogle = async () => {
		return await signInWithPopup(auth, googleProvider);
	};

	// sing up with facebook
	const signInWithFaceBook = async () => {
		return await signInWithPopup(auth, facebookProvider);
	};

	// logout the user
	// const logout = () => {
	// 	setCurrentUser(null  );
	// 	return signOut(auth);
	// };

	// manage user
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const email = user.email || user.providerData[0].email;
				const uid = user.uid;
				// setCurrentUser({
				// 	email,
				// 	uid,
				// });
				setLoading(false);
			}
		});

		return () => unsubscribe();
	}, []);

	const value = {
		currentUser,
		loading,
		registerUser,
		loginUser,
		signInWithGoogle,
		signInWithFaceBook,
		// logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
