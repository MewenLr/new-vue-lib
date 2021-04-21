export interface AnchorItem {
  label: string;
  to: string;
}

export interface RouterLinkItem {
  label: string;
  to: { name: string };
}

export interface ActionItem {
  label: string;
  [key: string]: string;
}

export type AnyItem = AnchorItem|RouterLinkItem|ActionItem
