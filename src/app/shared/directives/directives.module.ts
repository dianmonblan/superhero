import { NgModule } from '@angular/core'
import { ImageLazyLoadingDirective } from './image-lazy-loading.directive';

@NgModule({
    declarations: [
        ImageLazyLoadingDirective
    ],
    exports: [
        ImageLazyLoadingDirective
    ]
})
export class DirectivesModule { }