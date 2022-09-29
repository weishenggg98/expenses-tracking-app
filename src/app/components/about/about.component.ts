import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
  }

  clearUserData() {
    this.userDataService.clearUserData();
    location.reload();
  }
}
