import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  @ViewChild('snackBarTemplate')
  snackBarTemplate!: TemplateRef<any>;
  showRickRoll = false;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  
  onBtnClicked() {
    this._snackBar.openFromTemplate(this.snackBarTemplate, {
      duration: 2 * 1000,
    });

    this.showRickRoll = true;
  }
}
