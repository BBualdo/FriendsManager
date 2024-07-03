import React from 'react';
import {capitalizeFirst} from "@/utils/capitalizeFirst";
import {contactTypeToString} from "@/utils/contactTypeToString";
import EditFriendDialog from "@/components/EditFriendDialog";
import {Button} from "@/components/shadcn/ui/button";
import {Friend} from "@/models/Friend";
import useFriends from "@/hooks/useFriends";

const FriendItem = ({friend}:{friend:Friend}) => {
    const {deleteFriend} = useFriends();

    return (
        <div key={friend.id} className="flex items-center text-white gap-10">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">
                    {capitalizeFirst(friend.firstName)} {capitalizeFirst(friend.lastName)}
                </h2>
                <div className="flex flex-col gap-1">
                    <p>Last contacted at: {friend.lastContactDate.toString()}</p>
                    <p>
                        Last contact type: {contactTypeToString(friend.lastContactType)}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <EditFriendDialog friend={friend}/>
                <Button onClick={() => deleteFriend(friend.id)} variant="destructive">
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default FriendItem;