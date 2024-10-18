import { Component } from '@angular/core';
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [
    MatButtonToggleGroup,
    MatButtonToggle
  ],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent {
  /** @property {string} currentLang - The currently active language */
  currentLang = 'en';

  /** @property {string[]} languages - Array of available language codes */
  languages = ['en', 'es'];

  /**
   * @constructor
   * @param {TranslateService} translate - The translation service for handling language changes
   */
  constructor(private translate: TranslateService) {
    this.currentLang = translate.currentLang;
  }

  /**
   * @method useLanguage
   * @description Changes the application's language
   * @param {string} language - The language code to switch to
   */
  useLanguage(language: string) {
    this.translate.use(language);
  }
}
