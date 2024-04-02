import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/guard/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showContextMenuProfile = false

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  logOut() {
    this.auth.logOut();
    // this.user = null;
  }

  toggleContextMenuProfile(){
    this.showContextMenuProfile = !this.showContextMenuProfile
  }

}
