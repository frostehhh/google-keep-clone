export type AttributeDefinitions = Record<string | number | symbol, unknown>;

export type TableInfoConstructor<TableName, ReadOnlyAttributeDefinitions extends Readonly<AttributeDefinitions> = Readonly<AttributeDefinitions>> = {
  tableName: TableName;
  attributes: ReadOnlyAttributeDefinitions;
}