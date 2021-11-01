import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class VeiculosUpdates extends BaseSchema {
  protected tableName = 'veiculos'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.string('longitude')
      table.string('latitude')
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('longitude')
      table.dropColumn('latitude')
    })
  }
}
