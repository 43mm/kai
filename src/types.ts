export interface Drop {
  id: string;
  title: string;
  customTitle: string;
  url: string;
  order: number;
  collectionId: string | null;
}

export interface Collection {
  id: string;
  name: string;
  order: number;
  isExpanded: boolean;
}
