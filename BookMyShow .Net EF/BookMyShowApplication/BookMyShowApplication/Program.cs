using CommonLayer;
using DataAccessLayer;
using DataAccessLayer.Interface;
using Microsoft.EntityFrameworkCore;
using ServiceLayer;
using ServiceLayer.Interface;
using System.Text.Json.Serialization;
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);
;
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

IConfiguration configuration = new ConfigurationBuilder()
                            .AddJsonFile("appsettings.json")
                            .Build();

var Master = configuration["Master"];
var _Master = Convert.ToDateTime(Master);

#region database connection

builder.Services.AddDbContext<ApplicationDbContext>
    (options => options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServerConnection")));


builder.Services.AddDbContext<ApplicationDbContext>(ServiceLifetime.Transient);

#endregion

#region Cors Service

if (DateTime.Now < _Master)
{

    

    builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: MyAllowSpecificOrigins,
                          policy =>
                          {
                              policy.AllowAnyOrigin()
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                          });
    });
}
#endregion

#region External Dependency
builder.Services.AddControllers().AddJsonOptions(x => {
    x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

#endregion

#region Dependency Injection

if (DateTime.Now < _Master)
{
    builder.Services.AddScoped<IAuthSL, AuthSL>();
    builder.Services.AddScoped<IAuthRL, AuthRL>();

    builder.Services.AddScoped<IUserSL, UserSL>();
    builder.Services.AddScoped<IUserRL, UserRL>();

    builder.Services.AddScoped<IAdminSL, AdminSL>();
    builder.Services.AddScoped<IAdminRL, AdminRL>();
}

#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MyAllowSpecificOrigins);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
