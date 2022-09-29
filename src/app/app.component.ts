import { AfterViewInit, ApplicationRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserDataService } from './services/user-data.service';
import { UserDataModel } from './models/expense.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('dialogNewUpdate')
  dialogNewUpdate!: TemplateRef<any>;

  @ViewChild('dialogNewUser')
  dialogNewUser!: TemplateRef<any>;

  inputEmail: string | null = null;

  constructor(
    appRef: ApplicationRef,
    private swUpdate: SwUpdate,
    public dialog: MatDialog,
    private userDataService: UserDataService) {
    swUpdate.versionUpdates.subscribe(evt => {
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${evt.version.hash}`);
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
          break;
      }
    });

    swUpdate.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(evt => {
        this.openUpdateDialog();
      });
  }

  public ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    if (!this.userDataService.isUserDataExist()) {
      let config: MatDialogConfig = {
        disableClose: true
      };
      const dialogRef = this.dialog.open(this.dialogNewUser, config);
    }
  }

  proceedRegisterNewUser() {
    if (!this.inputEmail) {

    } else {
      const userData: UserDataModel = {
        uniqueDeviceId: null,
        userEmail: this.inputEmail,
        expenseList: [],
      };

      this.userDataService.userData = userData;
      this.dialog.closeAll();
    }
  }

  openUpdateDialog() {
    let config: MatDialogConfig = {
      disableClose: true
    };
    const dialogRef = this.dialog.open(this.dialogNewUpdate, config);
  }

  proceedUpdateApp() {
    window.location.reload();
  }
}