/* eslint-disable @typescript-eslint/no-explicit-any */

export interface AnchorItem {
  to: string;
  [key: string]: any;
}

export interface RouterLinkItem {
  to: {
    name: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface ActionItem {
  [key: string]: string;
}

export type AnyItem = AnchorItem|RouterLinkItem|ActionItem
