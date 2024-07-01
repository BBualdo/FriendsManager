using Contracts.DTO;
using Data.Models;

namespace Contracts;

public interface ICategoriesService
{
  Task<IEnumerable<CategoryResDto>> GetCategoriesAsync();
  Task<Category?> GetCategoryByIdAsync(int id);
  Task AddCategoryAsync(CategoryReqDto category);
  Task UpdateCategoryAsync(CategoryResDto category);
  Task DeleteCategoryAsync(Category category);
}