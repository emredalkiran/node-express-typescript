export interface Router {
  setRoutes(): void
}

export interface DatabaseConnection {
  connect(connectionURL: string, dbName: string, options?: object): Promise<object>
}