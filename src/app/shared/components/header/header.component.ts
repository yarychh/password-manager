import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import {TranslateService} from '@ngx-translate/core';
import { Auth2Service } from 'src/app/auth/auth2.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(public auth2: Auth2Service, private router: Router, private translate: TranslateService) { }
  public currentLang = '';

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    })
  }

  public home(): void {
    this.router.navigate(['keychain']);
  }

  public changeLang(): void {
    if (this.currentLang === 'en') {
      this.translate.use('ua');
      document.getElementById('body')?.classList.add('ua');
    } else if (this.currentLang === 'ua') {
      this.translate.use('en');
      document.getElementById('body')?.classList.remove("ua");
    }
  }

  ngOnDestroy(): void {
    this.translate.onLangChange.unsubscribe();
  }
}
