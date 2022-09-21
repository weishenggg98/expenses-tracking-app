import { ApplicationRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { concat, filter, first, interval } from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('dialogNewUpdate')
  dialogNewUpdate!: TemplateRef<any>;

  constructor(appRef: ApplicationRef, private swUpdate: SwUpdate, public dialog: MatDialog) {
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