import { Directive, ElementRef, AfterViewInit, Renderer2, EventEmitter, OnChanges, SimpleChanges } from '@angular/core'

@Directive({
    selector: '[imageLazyLoading]',
    inputs: [
        'imageLazyLoading: imageLazyLoading',
        'imageLazyLoadingAlt',
    ],
    outputs: [
        'imageLazyLoadingInProcess'
    ]
})
export class ImageLazyLoadingDirective implements AfterViewInit, OnChanges {
    imageLazyLoading: string
    imageLazyLoadingAlt: string
    imageLazyLoadingInProcess: EventEmitter<boolean> = new EventEmitter<boolean>(true)

    constructor(
        private _render2: Renderer2,
        private _elementReference: ElementRef
    ) { }

    ngAfterViewInit(): void {
        this.startImageLazyLoading()
    }

    ngOnChanges(simpleChanges: SimpleChanges): void {
        if (simpleChanges.imageLazyLoading
            && simpleChanges.imageLazyLoading.currentValue)
            this.startImageLazyLoading()
    }

    private startImageLazyLoading(): void {
        if (!this.imageLazyLoading)
            return

        this.imageLazyLoadingInProcess.emit(true)

        this._render2.listen(this._elementReference.nativeElement, 'load', () => {
            this._render2.setAttribute(this._elementReference.nativeElement, 'alt', this.imageLazyLoadingAlt)
            this.imageLazyLoadingInProcess.emit(false)
        })

        this._render2.setAttribute(this._elementReference.nativeElement, 'src', this.imageLazyLoading)
    }
}