import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SectionTitleComponent } from './components/section-title/section-title.component';
import { TableComponent } from './components/table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { FileInputComponent } from './components/file-input/file-input.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { AlertConfirmationComponent } from './components/alert-confirmation/alert-confirmation.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    SidebarComponent,
    HeaderComponent,
    SectionTitleComponent,
    TableComponent,
    ModalComponent,
    FileInputComponent,
    SnackbarComponent,
    AlertConfirmationComponent,
    CheckboxComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    InputComponent,
    ButtonComponent,
    SidebarComponent,
    HeaderComponent,
    SectionTitleComponent,
    TableComponent,
    ModalComponent,
    FileInputComponent,
    SnackbarComponent,
    AlertConfirmationComponent,
    CheckboxComponent,
  ],
})
export class SharedModule {}
