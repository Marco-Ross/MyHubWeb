import { RendererFactory2 } from "@angular/core";
import { ThemeRenderer } from "./global-shared/services/theme/theme.renderer";

export function AppInitialize(themeRenderer: ThemeRenderer, renderer: RendererFactory2)
{
    return () =>
    {
        return new Promise<void>((resolve, reject) =>
        {
            themeRenderer.renderer = renderer.createRenderer(null, null);
            resolve();
        })
    }
}