
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SocialAccount {
  id: string;
  type: "instagram" | "facebook" | "twitter";
  username: string;
  profilePic: string;
  isConnected: boolean;
}

export interface Post {
  id: string;
  accountId: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  date: string;
}

export interface Story {
  id: string;
  accountId: string;
  imageUrl: string;
  viewed: boolean;
  date: string;
}

interface AccountState {
  accounts: SocialAccount[];
  selectedAccountId: string | null;
  posts: Post[];
  stories: Story[];
  user: {
    name: string;
    email: string;
    avatar: string;
  } | null;
  isAuthenticated: boolean;
  
  setUser: (user: AccountState['user']) => void;
  setAuthenticated: (status: boolean) => void;
  addAccount: (account: SocialAccount) => void;
  selectAccount: (id: string) => void;
  setPosts: (posts: Post[]) => void;
  setStories: (stories: Story[]) => void;
  logout: () => void;
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set) => ({
      accounts: [],
      selectedAccountId: null,
      posts: [],
      stories: [],
      user: null,
      isAuthenticated: false,
      
      setUser: (user) => set(() => ({ user })),
      setAuthenticated: (status) => set(() => ({ isAuthenticated: status })),
      addAccount: (account) => set((state) => ({ 
        accounts: [...state.accounts, account],
        selectedAccountId: state.selectedAccountId || account.id
      })),
      selectAccount: (id) => set(() => ({ selectedAccountId: id })),
      setPosts: (posts) => set(() => ({ posts })),
      setStories: (stories) => set(() => ({ stories })),
      logout: () => set(() => ({ 
        user: null, 
        isAuthenticated: false,
        accounts: [],
        selectedAccountId: null,
        posts: [],
        stories: []
      }))
    }),
    {
      name: 'account-storage',
    }
  )
);
