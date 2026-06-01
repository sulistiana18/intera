import { create } from "zustand";
import { persist } from "zustand/middleware"; // 💡 Import middleware untuk simpan data di browser

interface AuthState {
  isSignInOpen: boolean;
  isSignUpOpen: boolean;
  user: any | null; // null = belum login, objek = sudah login
  openSignIn: () => void;
  closeSignIn: () => void;
  openSignUp: () => void;
  closeSignUp: () => void;
  loginSuccess: (userData: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isSignInOpen: false,
      isSignUpOpen: false,
      user: null,
      
      openSignIn: () => set({ isSignInOpen: true, isSignUpOpen: false }),
      closeSignIn: () => set({ isSignInOpen: false }),
      openSignUp: () => set({ isSignUpOpen: true, isSignInOpen: false }),
      closeSignUp: () => set({ isSignUpOpen: false }),
      
      // Panggil ini saat Supabase berhasil mengembalikan data user (Login sukses)
      loginSuccess: (userData) => set({ user: userData, isSignInOpen: false }),
      
      // Panggil ini saat user klik tombol logout
      logout: () => set({ user: null }),
    }),
    {
      name: "intera-auth-storage", // Nama key yang akan muncul di LocalStorage browser kamu
      
      // 🛠️ CRUCIAL: Kita filter hanya data 'user' saja yang disimpan ke browser.
      // Status modal open/close (isSignInOpen/isSignUpOpen) tidak perlu disimpan agar saat buka tab baru modalnya tidak ikut otomatis kebuka.
      partialize: (state) => ({ user: state.user }), 
    }
  )
);