import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserUpdats extends BaseSchema {
  protected tableName = 'users'

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
