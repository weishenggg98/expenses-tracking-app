import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
    isExpanded: boolean = false;

    constructor(private sidenavService: SidenavService) {}

    ngOnInit(): void {
        this.sidenavService.$isExpandedObservable.subscribe({
            next: (isExpanded: boolean) => {
                this.isExpanded = isExpanded;
            },
            error: (err: any) => {},
        });
    }

    toggleSideNav() {
        this.sidenavService.toggleSideNav();
    }
}
