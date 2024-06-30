using Contracts.DTO;
using Data.Models;

namespace Contracts;

public interface IFriendsService
{
  Task<IEnumerable<Friend>> GetFriendsAsync();
  Task<Friend?> GetFriendByIdAsync(int id);
  Task AddFriendAsync(FriendReqDto friend);
  Task UpdateFriendAsync(Friend friend);
  Task DeleteFriendAsync(Friend friend);
}