import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/guard/auth/auth.service';
import { LayoutComunicationService } from '../../services/layout-comunication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showContextMenuProfile = false
  showSidebarMenu = true
  companyName = 'Nombre de academia'
  imagenCompany = ''

  constructor(private auth: AuthService, private _comunicacionService: LayoutComunicationService ) { }

  ngOnInit(): void {
    this.getInfo()
  }

  logOut() {
    this.auth.logOut();
  }

  getInfo(){
    let user = this.auth.getUser()

    this.companyName = (user.CompanyName) ? user.CompanyName: ''

    this.imagenCompany = (user.CompanyImage)? environment.routerImg + user.CompanyImage:''
  }

  toggleContextMenuProfile(){
    this.showContextMenuProfile = !this.showContextMenuProfile
  }

  toggleSidebarMenu(){
    this.showSidebarMenu = !this.showSidebarMenu
    this._comunicacionService.toggleMenu()
  }

}
