export type AttributeDefinitions = Record<string | number | symbol, unknown>;

export type TableInfoConstructor<TableName> = {
  tableName: TableName;
  apiName?: string;
}