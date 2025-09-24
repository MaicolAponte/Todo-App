import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  sidebarOpen = signal(true); // 👈 estado reactivo

  toggleSidebar() {
    this.sidebarOpen.update(v => !v);
  }

}
