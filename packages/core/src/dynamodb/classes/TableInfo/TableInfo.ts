import { type TableInfoConstructor } from './types';

export class TableInfo<const TableName> {
  public tableName: TableName;
  public apiName?: string;

  constructor({ tableName, apiName }: TableInfoConstructor<TableName>) {
    this.tableName = tableName;
    this.apiName = apiName;
  }
}