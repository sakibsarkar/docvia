export interface IGoogleConnection {
  connected: boolean;
  hasRequiredScopes: boolean;
  createdAt: string;
  name?: string;
  email?: string;
  picture?: string;
}

export interface IGoogleDoc {
  id: string;
  name: string;
  modifiedTime: string;
  owners: [
    {
      displayName: string;
    },
  ];
}
