import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PageHeader } from '../shared/page-header/page-header';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, PageHeader],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.css',
})
export class DashboardPage {}
