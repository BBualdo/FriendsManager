using Contracts;
using Contracts.DTO;
using Data.Models;
using ModelExtensions;
using Repository;

namespace Services;

public class CategoriesService(IRepository<Category> categoriesRepository) : ICategoriesService
{
  private readonly IRepository<Category> _categoriesRepository = categoriesRepository;
  
  public async Task<IEnumerable<CategoryResDto>> GetCategoriesAsync()
  {
    var categories = await _categoriesRepository.GetAsync();

    return categories.Select(category => category.ToCategoryResponse()).ToList();
  }

  public async Task<Category?> GetCategoryByIdAsync(int id)
  {
    return await _categoriesRepository.GetByIdAsync(id);
  }

  public async Task AddCategoryAsync(CategoryReqDto category)
  {
    await _categoriesRepository.AddAsync(category.ToCategory());
  }

  public async Task UpdateCategoryAsync(CategoryResDto category)
  {
    await _categoriesRepository.UpdateAsync(category.ToCategory());
  }

  public async Task DeleteCategoryAsync(Category category)
  {
    await _categoriesRepository.DeleteAsync(category);
  }
}