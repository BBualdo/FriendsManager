using Contracts.DTO;
using Data.Models;

namespace Contracts;

public interface ICategoriesService
{
  Task<IEnumerable<Category>> GetCategoriesAsync();
  Task<Category?> GetCategoryByIdAsync(int id);
  Task AddCategoryAsync(CategoryReqDto category);
  Task UpdateCategoryAsync(Category category);
  Task DeleteCategoryAsync(Category category);
}