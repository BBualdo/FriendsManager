using Contracts;
using Data;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<FriendsDbContext>(options =>
  options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddScoped<IRepository<Friend>, Repository<Friend>>();
builder.Services.AddScoped<IRepository<Category>, Repository<Category>>();
builder.Services.AddScoped<IFriendsService, FriendsService>();
builder.Services.AddScoped<ICategoriesService, CategoriesService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();