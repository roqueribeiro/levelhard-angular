import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ColorSchemeService } from '../../shared/services/color-scheme.service';
import { slideInAnimation } from 'src/app/shared/routes/route-animations';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  animations: [slideInAnimation],
})
export class DefaultLayoutComponent implements OnInit {
  constructor(
    public colorSchemeService: ColorSchemeService,
    private router: Router
  ) {
    this.colorSchemeService.load();
  }

  menuItems = [
    { link: '/', name: 'Home', icon: 'home' },
    { link: '/kanban', name: 'Kanban', icon: 'assignment' },
  ];

  toggleControl = new FormControl(false);

  ngOnInit(): void {
    const currentTheme = this.colorSchemeService.currentActive();
    this.toggleControl.setValue(currentTheme === 'dark');
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      if (darkMode) {
        this.colorSchemeService.update('dark');
      } else {
        this.colorSchemeService.update('light');
      }
    });
  }
}
