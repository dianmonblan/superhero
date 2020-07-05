import { Component, HostListener } from '@angular/core';
import { MenuOption } from '../shared/models/interfaces';

const MOVILE_MENU_ID: string = "navbar-toggler"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  movileMenuId: string = MOVILE_MENU_ID
  viewMovileMenu: boolean = false
  menu: MenuOption[] = [{
    name: "Item 1",
    link: "/item-1"
  }, {
    name: "Item 2",
    link: "/item-2"
  }, {
    name: "Item 3",
    link: "/item-3"
  }]

  @HostListener('click', ['$event.toElement'])
  onClick(element): void {
    if (element
      && (element.id == MOVILE_MENU_ID))
      this.viewMovileMenu = true
    else if (this.viewMovileMenu)
      this.viewMovileMenu = false
  }
}
