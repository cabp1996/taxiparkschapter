import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SnackbarService } from '../../services/snackbar.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnDestroy, OnInit {
  @ViewChild('snackbar') snackbar: any;

  onDestroySubscriptions$ = new Subject();
  message: string = '';
  type: 'success' | 'error' = 'success';
  actionText: string = '';
  action!: () => void | undefined;
  duration: number = 3500;

  constructor(private readonly _snackBarService: SnackbarService) {}

  ngOnInit(): void {
    this.onSnackbarMessage();
  }

  onSnackbarMessage() {
    this._snackBarService.snackbarBehavior$
      .pipe(takeUntil(this.onDestroySubscriptions$))
      .subscribe((value) => {
        const { actionText, message, action, type } = value;
        if (message) {
          this.action = action!;
          this.actionText = actionText || '';
          this.message = message;
          this.type = type;
          this.showSnackbar();
        }
      });
  }

  showSnackbar() {
    const snackbarContainer: HTMLDivElement = this.snackbar?.nativeElement;
    if (snackbarContainer) {
      snackbarContainer.classList.add('show');
      setTimeout(() => {
        snackbarContainer.className = snackbarContainer.className.replace(
          'show',
          ''
        );
      }, this.duration);
    }
  }

  onActionClick() {
    this.action();
  }

  ngOnDestroy(): void {
    this.removeListeners();
  }

  removeListeners() {
    this.onDestroySubscriptions$.next();
  }
}
