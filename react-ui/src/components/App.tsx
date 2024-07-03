"use client";

import useFriends from "@/hooks/useFriends";
import EditFriendDialog from "./EditFriendDialog";
import FriendItem from "@/components/FriendItem";

const App = () => {
    const {friends, isLoading, error, deleteFriend} = useFriends();

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="flex flex-col gap-8">
                <EditFriendDialog/>
                {friends && friends.length > 0 ? (
                    friends.map((f) => <FriendItem key={f.id} friend={f}/>)
                ) : (
                    <p className="text-white">No friends found. Add a new friend to get started!</p>
                )}
            </div>
        </div>
    );
};

export default App;
