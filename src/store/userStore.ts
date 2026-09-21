import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User, Address, MeasurementProfile } from "@/types";
import { uuid } from "@/lib/orderUtils";

interface UserState {
  user: User | null;
  addresses: Address[];
  isLoggedIn: boolean;

  login: (name: string, phone: string, email?: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  updateMeasurements: (meas: MeasurementProfile) => void;

  addAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  // Backend sync
  syncProfileToDB: () => Promise<void>;
  fetchProfileFromDB: (phone: string) => Promise<void>;
}

const DEFAULT_DEMO_USER: User = {
  id: "demo-user-001",
  name: "Mohammad Sakib Ahmad",
  email: "sakib@example.com",
  phone: "+91 98765 43210",
  measurements: {
    chest: 40,
    waist: 34,
    hip: 41,
    inseam: 32,
    shoulder: 18.5,
    sleeveLength: 25.5,
    neck: 16,
    notes: "Slight athletic taper. Prefers 0.5 inch extra ease in sleeve length.",
  },
};

const DEFAULT_DEMO_ADDRESS: Address = {
  id: "addr-001",
  name: "Home Penthouse",
  street: "Flat 402, Prestige Palms, 12th Main Road, Indiranagar",
  city: "Bengaluru",
  state: "Karnataka",
  pincode: "560038",
  phone: "+91 98765 43210",
  isDefault: true,
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: DEFAULT_DEMO_USER,
      addresses: [DEFAULT_DEMO_ADDRESS],
      isLoggedIn: true,

      login: (name, phone, email) => {
        const user: User = {
          id: uuid(),
          name,
          email: email || "",
          phone,
        };
        set({ user, isLoggedIn: true });
        // Sync new login to DB
        get().syncProfileToDB();
      },

      logout: () => set({ user: null, isLoggedIn: false }),

      updateUser: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
        // Sync changes to DB after local update
        setTimeout(() => get().syncProfileToDB(), 0);
      },

      updateMeasurements: (meas) => {
        set((state) => ({
          user: state.user ? { ...state.user, measurements: meas } : null,
        }));
        setTimeout(() => get().syncProfileToDB(), 0);
      },

      addAddress: (address) => {
        set((state) => {
          let addresses = [...state.addresses, address];
          if (address.isDefault) {
            addresses = addresses.map((a) =>
              a.id === address.id ? a : { ...a, isDefault: false }
            );
          }
          return { addresses };
        });
        setTimeout(() => get().syncProfileToDB(), 0);
      },

      removeAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.filter((a) => a.id !== id),
        }));
        setTimeout(() => get().syncProfileToDB(), 0);
      },

      setDefaultAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        }));
        setTimeout(() => get().syncProfileToDB(), 0);
      },

      // ── Sync profile to Supabase ──────────────────────────
      syncProfileToDB: async () => {
        const { user, addresses } = get();
        if (!user?.phone) return;

        try {
          await fetch("/api/profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              phone: user.phone.replace(/\D/g, ""),
              name: user.name,
              email: user.email,
              addresses,
            }),
          });
        } catch (err) {
          console.warn("syncProfileToDB failed (offline mode):", err);
        }
      },

      // ── Fetch profile from Supabase on app load ───────────
      fetchProfileFromDB: async (phone: string) => {
        try {
          const res = await fetch("/api/profile", {
            headers: { "x-user-phone": phone.replace(/\D/g, "") },
          });
          if (!res.ok) return;

          const { profile } = await res.json();
          if (!profile) return;

          set((state) => ({
            user: state.user
              ? {
                  ...state.user,
                  name: profile.name || state.user.name,
                  email: profile.email || state.user.email,
                }
              : state.user,
            addresses:
              profile.addresses?.length > 0
                ? profile.addresses
                : state.addresses,
          }));
        } catch (err) {
          console.warn("fetchProfileFromDB failed (offline mode):", err);
        }
      },
    }),
    {
      name: "threadly_user_storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
