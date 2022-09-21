import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SidenavService {
    private isExpandedSubject = new BehaviorSubject<boolean>(false);
    $isExpandedObservable = this.isExpandedSubject.asObservable();

    constructor() {}

    toggleSideNav() {
        if (this.isExpandedSubject.value) {
            this.isExpandedSubject.next(false);
        } else {
            this.isExpandedSubject.next(true);
        }
    }
}
