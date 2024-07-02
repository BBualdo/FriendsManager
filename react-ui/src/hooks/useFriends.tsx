"use client";

import { FriendReqDto } from "@/models/FriendReqDto";
import FriendsService from "@/services/FriendsService";
import FriendsState from "@/state/FriendsState";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const useFriends = () => {
  const [friends, setFriends] = useRecoilState(FriendsState.friendsState);
  const [error, setError] = useRecoilState(FriendsState.errorState);
  const [isLoading, setIsLoading] = useRecoilState(FriendsState.isLoadingState);

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

  useEffect(() => {
    fetchFriends();
  }, []);

  const addFriend = async (friend: FriendReqDto) => {
    await FriendsService.AddFriend(friend);
    await fetchFriends();
  };

  const deleteFriend = async (id: number) => {
    await FriendsService.DeleteFriend(id);
    setFriends((prev) => prev?.filter((f) => f.id !== id));
  };

  return { friends, error, isLoading, deleteFriend, addFriend };
};

export default useFriends;
