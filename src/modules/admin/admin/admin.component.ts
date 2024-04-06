import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/guard/auth/auth.service';
import { EventbusService } from 'src/modules/shared/services/eventbus.service';
import { LayoutComunicationService } from 'src/modules/shared/services/layout-comunication.service';
import { StorageService } from 'src/modules/shared/services/storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventbusService,
    private _comunicacionService: LayoutComunicationService
  ) {
    this._comunicacionService.ToggleMenuEvent.subscribe((action) => {
      this.extendContainer()

    });
   }

  menuIsShow = false

  ngOnInit(): void {
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  extendContainer(){
    this.menuIsShow = !this.menuIsShow
  }

  logout(): void {
    this.authService.logOut()
  }

}
