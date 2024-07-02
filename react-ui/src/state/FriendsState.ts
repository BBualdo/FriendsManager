import { Friend } from "@/models/Friend";
import { atom } from "recoil";

const friendsState = atom<Friend[] | null | undefined>({
  key: "friendsState",
  default: null,
});

const errorState = atom<string | null>({
  key: "friendsError",
  default: null,
});

const isLoadingState = atom<boolean>({
  key: "isLoading",
  default: false,
});

export default { friendsState, errorState, isLoadingState };
