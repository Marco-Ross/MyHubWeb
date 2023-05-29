import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Pipe({ name: 'safeResourceUrl' })
export class SafeUrlPipe implements PipeTransform
{
    constructor(private readonly sanitizer: DomSanitizer) { }

    public transform(url: string): SafeResourceUrl
    {
        if (!url)
            return '/assets/icons/grey.png';
        else
            return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}