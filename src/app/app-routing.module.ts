import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

const routes: Routes = [
    {
        path: '',
        component: SidenavComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'expenses',
                loadChildren: () =>
                    import('./components/expense/expense.module').then(
                        (m) => m.ExpenseModule
                    ),
            },
            {
                path: 'about',
                component: AboutComponent,
            },
        ],
    },
    {
        path: '**',
        redirectTo: '/dashboard',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
