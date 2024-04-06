import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/guard/auth/auth.service';
import { LayoutComunicationService } from '../../services/layout-comunication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showContextMenuProfile = false
  showSidebarMenu = true

  constructor(private auth: AuthService, private _comunicacionService: LayoutComunicationService ) { }

  ngOnInit(): void {
  }

  logOut() {
    this.auth.logOut();
  }

  toggleContextMenuProfile(){
    this.showContextMenuProfile = !this.showContextMenuProfile
  }

  toggleSidebarMenu(){
    this.showSidebarMenu = !this.showSidebarMenu
    this._comunicacionService.toggleMenu()
  }

}
