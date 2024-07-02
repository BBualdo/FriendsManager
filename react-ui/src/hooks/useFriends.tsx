"use client";

import { Friend } from "@/models/Friend";
import FriendsService from "@/services/FriendsService";
import { useEffect, useState } from "react";

const useFriends = () => {
  const [friends, setFriends] = useState<Friend[] | null | undefined>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
