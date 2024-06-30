using Contracts;
using Contracts.DTO;
using Data.Models;

namespace Services;

public class FriendsService(IRepository<Friend> friendsRepository) : IFriendsService
{
  private readonly IRepository<Friend> _friendsRepository = friendsRepository;
  
  public async Task<IEnumerable<Friend>> GetFriendsAsync()
  {
    return await _friendsRepository.GetAsync();
  }

  public async Task<Friend?> GetFriendByIdAsync(int id)
  {
    return await _friendsRepository.GetByIdAsync(id);
  }

  public async Task AddFriendAsync(FriendReqDto friend)
  {
    await _friendsRepository.AddAsync(friend.ToFriend());
  }

  public async Task UpdateFriendAsync(Friend friend)
  {
    await _friendsRepository.UpdateAsync(friend);
  }

  public async Task DeleteFriendAsync(Friend friend)
  {
    await _friendsRepository.DeleteAsync(friend);
  }
}