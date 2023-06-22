export interface TableConfig {
  columns: TableColumn[];
  rows: TableRow[];
}

export interface TableRow {
  rowItems: TableData[];
  id?: string;
}

export interface TableColumn {
  header: string;
  width: string;
}

export interface TableData {
  text?: string;
  user?: TableDataUser;
  showAsBadge?: boolean;
  actions?: TableAction[];
}

export interface TableDataUser {
  avatar: string;
  name: string;
  phone: string;
}

export interface TableAction {
  icon: string;
  callback: () => void;
}
