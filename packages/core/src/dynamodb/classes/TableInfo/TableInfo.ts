import { type AttributeDefinitions, type TableInfoConstructor } from './types';

export class TableInfo<const TableName, ReadOnlyAttributeDefinitions extends Readonly<AttributeDefinitions> = Readonly<AttributeDefinitions>> {
  public tableName: TableName;
  public attributes: ReadOnlyAttributeDefinitions;

  constructor({ tableName, attributes }: TableInfoConstructor<TableName, ReadOnlyAttributeDefinitions>) {
    this.tableName = tableName;
    this.attributes = attributes;
  }
}