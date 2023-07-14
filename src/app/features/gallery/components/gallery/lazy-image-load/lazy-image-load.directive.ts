import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Directive({
    selector: '[lazyImage]'
})
export class LazyImageLoadDirective
{
    @Input() lazyImage: any;
    @Output() onImageLoad = new EventEmitter<any>();

    constructor(private elementRef: ElementRef) { }

    ngOnInit()
    {
        const options = {
            root: null, // Use the viewport as the root
            rootMargin: '0px',
            threshold: 0.1 // Trigger the load when 10% of the image is visible
        };

        const observer = new IntersectionObserver((entries, observer) =>
        {
            entries.forEach(entry =>
            {
                if (entry.isIntersecting)
                {
                    this.onImageLoad.emit(this.lazyImage);
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        observer.observe(this.elementRef.nativeElement);
    }
}