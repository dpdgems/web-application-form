import { Component, OnInit } from '@angular/core';
import { mock_Menu } from '../../mock/mock-menu';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  menus = mock_Menu;
  
  constructor() { }

  ngOnInit(): void {
  }

}
