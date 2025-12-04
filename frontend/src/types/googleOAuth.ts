export interface IGoogleConnection {
  connected: boolean;
  hasRequiredScopes: boolean;
  createdAt: string;
}

export interface IGoogleDoc {
  id: string;
  name: string;
  modifiedTime: string;
  owners: [
    {
      displayName: string;
    }
  ];
}