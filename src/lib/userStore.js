import { create } from "zustand";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,

  // Fetch user info from Firestore using the uid
  fetchUserInfo: async (uid) => {
    if (!uid) {
      // If no user UID is provided, set loading to false and currentUser to null
      set({ currentUser: null, isLoading: false });
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        // User found in Firestore, set user data
        set({ currentUser: { uid, ...userDoc.data() }, isLoading: false });
      } else {
        // User document doesn't exist in Firestore
        set({ currentUser: null, isLoading: false });
      }
    } catch (error) {
      // Handle errors (e.g., network issues)
      console.error("Error fetching user:", error);
      set({ currentUser: null, isLoading: false });
    }
  },

  // Handle logout process and set currentUser to null
  logout: async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      set({ currentUser: null, isLoading: false }); // Reset the user state and stop loading
    } catch (error) {
      console.error("Logout error:", error);
      set({ isLoading: false }); // Ensure loading state is reset in case of an error
    }
  },
}));
