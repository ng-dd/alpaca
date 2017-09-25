import { Component, OnInit } from '@angular/core';
import 'jquery';
import 'bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title = 'Alpaca';
  constructor() { }

  ngOnInit() {
  }

}
