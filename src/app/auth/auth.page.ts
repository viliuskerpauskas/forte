import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PulseLoader } from '../shared/pulse-loader/pulse-loader';
import { AuthService } from './auth.service';

type AuthState = 'loading' | 'success' | 'error' | 'no-token';

interface FeatureSlide {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-auth',
  imports: [
    CommonModule,
    CardModule,
    ProgressSpinnerModule,
    MessageModule,
    CarouselModule,
    ButtonModule,
    PulseLoader,
  ],
  templateUrl: './auth.page.html',
  styleUrl: './auth.page.css',
})
export class AuthPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  authState = signal<AuthState>('loading');
  errorMessage = signal<string>('');
  externalAuthUrl = 'https://go.foxus.lt';

  features: FeatureSlide[] = [
    {
      title: 'Interaktyvi pacientų lentelė',
      description:
        'Lengvai naršykite, rūšiuokite ir filtruokite pacientų duomenis pagal savo poreikius. Lentelė leidžia pritaikyti rodomą informaciją, kad greitai rastumėte tai, kas svarbiausia – nuo kontaktų iki klinikinių duomenų.',
      image: 'images/grid.png',
    },
    {
      title: 'Medicininiai duomenų grafikai',
      description:
        'Analizuokite paciento sveikatos pokyčius aiškiai ir vizualiai. Dinamiški grafikai leidžia stebėti gyvybinius rodiklius, laboratorinius rezultatus ir kitus svarbius duomenis laike – greitesniam sprendimų priėmimui.',
      image: 'images/sys_dia.png',
    },
    {
      title: 'Paciento įrašų laiko juosta',
      description:
        'Vizualiai sekite paciento medicininių įrašų eigą nuo pirmojo apsilankymo iki šių dienų. Laiko juosta padeda greitai peržiūrėti svarbiausius diagnozių, gydymo ir tyrimų etapus vienoje vietoje.',
      image: 'images/chronology.png',
    },
  ];

  ngOnInit() {
    if (this.authService.checkExistingAuth()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.processAuthentication();
  }

  openExternalAuth() {
    window.location.href = this.externalAuthUrl;
  }

  private async processAuthentication() {
    try {
      const token = this.route.snapshot.queryParams['token'];

      if (!token) {
        this.authState.set('no-token');
        this.errorMessage.set('No authentication token provided');
        return;
      }

      this.authState.set('loading');
      const success = await this.authService.validateToken(token);

      if (success) {
        this.authState.set('success');
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      } else {
        this.authState.set('error');
        this.errorMessage.set('Invalid or expired token');
      }
    } catch (error) {
      this.authState.set('error');
      this.errorMessage.set('Authentication failed. Please try again.');
    }
  }
}
