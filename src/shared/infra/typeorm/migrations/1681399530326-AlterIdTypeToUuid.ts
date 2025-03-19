import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterIdTypeToUuid1681399530326 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'cars',
            'id',
            new TableColumn({
                name: 'id',
                type: 'uuid',
                isPrimary: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'cars',
            'id',
            new TableColumn({
                name: 'id',
                type: 'varchar'
            })
        )
    }
}
