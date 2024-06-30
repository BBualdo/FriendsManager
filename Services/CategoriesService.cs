using Contracts;
using Contracts.DTO;
using Data.Models;

namespace Services;

public class CategoriesService(IRepository<Category> categoriesRepository) : ICategoriesService
{
  private readonly IRepository<Category> _categoriesRepository = categoriesRepository;
  
  public async Task<IEnumerable<Category>> GetCategoriesAsync()
  {
    return await _categoriesRepository.GetAsync();
  }

  public async Task<Category?> GetCategoryByIdAsync(int id)
  {
    return await _categoriesRepository.GetByIdAsync(id);
  }

  public async Task AddCategoryAsync(CategoryReqDto category)
  {
    await _categoriesRepository.AddAsync(category.ToCategory());
  }

  public async Task UpdateCategoryAsync(Category category)
  {
    await _categoriesRepository.UpdateAsync(category);
  }

  public async Task DeleteCategoryAsync(Category category)
  {
    await _categoriesRepository.DeleteAsync(category);
  }
}