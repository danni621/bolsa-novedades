import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Components  **/
import { ModalsComponent } from '../components/modals/modals.component';

@NgModule({
    declarations: [
        ModalsComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        ModalsComponent
    ]
})
export class ComponentsModule { }
