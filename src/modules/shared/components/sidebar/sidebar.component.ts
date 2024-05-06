import { Component, OnInit } from '@angular/core';
import { LayoutComunicationService } from '../../services/layout-comunication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  showMenu = true
  public getScreenWidth: any;
  constructor(private _comunicacionService: LayoutComunicationService) {
    this._comunicacionService.ToggleMenuEvent.subscribe((action) => {
      this.toggleMenu()

    });
   }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    console.log("this.getScreenWidth", this.getScreenWidth);

  }

  toggleMenu(){
    this.showMenu =  !this.showMenu
  }

}
