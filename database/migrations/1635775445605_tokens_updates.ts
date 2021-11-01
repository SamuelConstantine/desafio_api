import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TokensUpdates extends BaseSchema {
  protected tableName = 'api_tokens'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.date('expires_at')
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('expires_at')
    })
  }
}
