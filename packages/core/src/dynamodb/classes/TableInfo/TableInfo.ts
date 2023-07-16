import { type AttributeDefinitions, type TableInfoConstructor } from './types';

export class TableInfo<ReadOnlyAttributeDefinitions extends Readonly<AttributeDefinitions> = Readonly<AttributeDefinitions>> {
  public tableName: string;
  public attributes: ReadOnlyAttributeDefinitions;

  constructor({ tableName, attributes }: TableInfoConstructor<ReadOnlyAttributeDefinitions>) {
    this.tableName = tableName;
    this.attributes = attributes;
  }
}