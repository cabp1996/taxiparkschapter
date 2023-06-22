export interface SnackbarMessage {
  message: string;
  type: 'error' | 'success';
  action?: () => any;
  actionText?: string;
}
