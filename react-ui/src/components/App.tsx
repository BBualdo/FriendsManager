"use client";

import useFriends from "@/hooks/useFriends";

const App = () => {
  const { friends, isLoading, error } = useFriends();

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {friends && friends.map((f) => <p key={f.id}>{f.firstName}</p>)}
    </div>
  );
};

export default App;
