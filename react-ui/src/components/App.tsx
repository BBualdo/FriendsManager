"use client";

import useFriends from "@/hooks/useFriends";
import FriendsService from "@/services/FriendsService";
import { capitalizeFirst } from "@/utils/capitalizeFirst";
import { contactTypeToString } from "@/utils/contactTypeToString";
import { Button } from "./shadcn/ui/button";

const App = () => {
  const { friends, isLoading, error, setFriends } = useFriends();

  const deleteFriend = async (id: number) => {
    await FriendsService.DeleteFriend(id);
    setFriends((prev) => prev?.filter((f) => f.id !== id));
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="flex flex-col gap-4">
        {friends &&
          friends.map((f) => (
            <div key={f.id} className="flex items-center gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">
                  {capitalizeFirst(f.firstName)} {capitalizeFirst(f.lastName)}
                </h2>
                <div className="flex flex-col gap-1">
                  <p>Last contacted at: {f.lastContactDate.toString()}</p>
                  <p>
                    Last contact type: {contactTypeToString(f.lastContactType)}
                  </p>
                </div>
              </div>
              <Button onClick={() => deleteFriend(f.id)} variant="destructive">
                Delete
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
