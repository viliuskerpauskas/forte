import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeader } from '../shared/page-header/page-header';

@Component({
  selector: 'app-patients',
  imports: [CommonModule, PageHeader],
  templateUrl: './patients.page.html',
  styleUrl: './patients.page.css',
})
export class PatientsPage {}
