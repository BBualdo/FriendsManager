using Contracts;
using Contracts.DTO;
using Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController(ICategoriesService categoriesService) : ControllerBase
{
  private readonly ICategoriesService _categoriesService = categoriesService;
  
  [HttpGet]
  public async Task<ActionResult<IEnumerable<CategoryResDto>>> GetCategories()
  {
    var categories = await _categoriesService.GetCategoriesAsync();
    return Ok(categories);
  }

  [HttpPost]
  public async Task<ActionResult> AddCategory(CategoryReqDto category)
  {
    await _categoriesService.AddCategoryAsync(category);
    return CreatedAtAction(nameof(AddCategory), category);
  }

  [HttpPut]
  public async Task<ActionResult> UpdateCategory(CategoryResDto category)
  {
    await _categoriesService.UpdateCategoryAsync(category);
    return NoContent();
  }

  [HttpDelete("{id:int}")]
  public async Task<ActionResult> DeleteCategory(int id)
  {
    var category = await _categoriesService.GetCategoryByIdAsync(id);
    if (category is null) return NotFound();
    await _categoriesService.DeleteCategoryAsync(category);
    return NoContent();
  }
}