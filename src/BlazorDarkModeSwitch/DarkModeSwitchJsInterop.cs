using Microsoft.JSInterop;
using System;
using System.Threading.Tasks;
using System.Xml.Schema;

namespace BlazorDarkModeSwitch
{
    // This class provides an example of how JavaScript functionality can be wrapped
    // in a .NET class for easy consumption. The associated JavaScript module is
    // loaded on demand when first needed.
    //
    // This class can be registered as scoped DI service and then injected into Blazor
    // components for use.

    public class DarkModeSwitchJsInterop : IAsyncDisposable
    {
        private readonly Lazy<Task<IJSObjectReference>> _moduleTask;

        public DarkModeSwitchJsInterop(IJSRuntime jsRuntime)
        {
            _moduleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
               "import", "./_content/BlazorDarkModeSwitch/dark-mode-switch.js").AsTask());
        }

        public async ValueTask<string> PromptAsync(string message)
        {
            var module = await _moduleTask.Value;
            return await module.InvokeAsync<string>("showPrompt", message);
        }

        public async ValueTask DisposeAsync()
        {
            if (_moduleTask.IsValueCreated)
            {
                var module = await _moduleTask.Value;
                await module.DisposeAsync();
            }
        }


        public async ValueTask InitTheme()
        {
            var module = await _moduleTask.Value;
            await module.InvokeVoidAsync("initTheme");
        }

        public async ValueTask ResetTheme(bool darkMode)
        {
            var model = await _moduleTask.Value;
            await model.InvokeVoidAsync("resetTheme", darkMode);
        }
    }
}
