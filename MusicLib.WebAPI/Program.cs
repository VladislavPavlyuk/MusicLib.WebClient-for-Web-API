using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Serilog;
using MusicLib.WebAPI.Models;
using Microsoft.AspNetCore.Diagnostics;
using System.Net.Http;

public class Program
{
    private static readonly HttpClient httpClient = new HttpClient();

    public static async Task Main(string[] args)
    {

        var builder = WebApplication.CreateBuilder(args);

        try
        { 
            // Отправка HTTP GET-запроса
            var resp = await httpClient.GetAsync("https://example.com");

            // Логирование статусного кода
            Console.WriteLine($"Статусный код ответа: {(int)resp.StatusCode} ({resp.StatusCode})");

            // Если нужно, можно проверить успешность запроса
            if (resp.IsSuccessStatusCode)
            {
                Console.WriteLine("Запрос успешен!");
            }
            else
            {
                Console.WriteLine("Запрос завершился ошибкой.");
            }
        }
        catch (HttpRequestException ex)
        {
            // Логирование исключений
            Console.WriteLine($"Ошибка HTTP-запроса: {ex.Message}");
        }
        catch (Exception ex)
        {
            // Обработка других исключений
            Console.WriteLine($"Неизвестная ошибка: {ex.Message}");
        }

        // Добавляем Application Insights
        builder.Services.AddApplicationInsightsTelemetry();

        Log.Logger = new LoggerConfiguration()
            .WriteTo.Console()
            .WriteTo.File("Logs/log-.txt", rollingInterval: RollingInterval.Day)
            .CreateLogger();

        // Получаем строку подключения из файла конфигурации
        string? connection = builder.Configuration.GetConnectionString("DefaultConnection");

        // добавляем контекст ApplicationContext в качестве сервиса в приложение
        builder.Services.AddDbContext<MusicContext>(options => options.UseSqlServer(connection));

        builder.Services.AddControllers();

        builder.Host.UseSerilog();

        var app = builder.Build();

        app.UseStaticFiles();

        app.UseHttpsRedirection();

        app.MapControllers();

        app.UseExceptionHandler(errorApp =>
        {
            errorApp.Run(async context =>
            {
                context.Response.StatusCode = 500; // Устанавливаем статусный код
                var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
                var exception = exceptionHandlerPathFeature?.Error; // Получаем информацию об исключении

                // Настраиваем логирование
                var logger = context.RequestServices.GetService<ILogger<Program>>();
                if (exception != null)
                {
                    logger?.LogError(exception, "Произошла ошибка: {Message}", exception.Message);
                }

                // Дополнительно можно вернуть пользователю информацию, если нужно
                await context.Response.WriteAsync("Ошибка сервера. Подробности смотрите в логах.");
            });
        });

        var response = await httpClient.GetAsync("https://example.com");
        Console.WriteLine($"Статусный код: {response.StatusCode}");


        app.Run();

    }
}   
