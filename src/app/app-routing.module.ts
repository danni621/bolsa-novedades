import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BolsaNovedadesComponent } from './pages/bolsa-novedades/bolsa-novedades.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    //{ path: 'bolsanovedades', component: BolsaNovedadesComponent, canActivate: [AuthGuard] },
    { path: 'bolsanovedades', component: BolsaNovedadesComponent },
    { path: '**', redirectTo: 'bolsanovedades', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }