export type AttributeDefinitions = Record<string | number | symbol, unknown>;

export type TableInfoConstructor<ReadOnlyAttributeDefinitions extends Readonly<AttributeDefinitions> = Readonly<AttributeDefinitions>> = {
  tableName: string;
  attributes: ReadOnlyAttributeDefinitions;
}