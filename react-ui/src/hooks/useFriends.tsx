"use client";

import FriendsService from "@/services/FriendsService";
import FriendsState from "@/state/FriendsState";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const useFriends = () => {
  const [friends, setFriends] = useRecoilState(FriendsState.friendsState);
  const [error, setError] = useRecoilState(FriendsState.errorState);
  const [isLoading, setIsLoading] = useRecoilState(FriendsState.isLoadingState);

  useEffect(() => {
    const fetchFriends = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const friends = await FriendsService.GetFriends();
        setFriends(friends);
      } catch (error) {
        setIsLoading(false);
        setError("Fetching friends failed!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFriends();
  }, []);

  return { friends, error, isLoading, setFriends };
};

export default useFriends;
