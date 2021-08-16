import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class SharedEntity {
    @CreateDateColumn({
        type: 'datetime',
        nullable: true,
        default: () => 'default: () => "CURRENT_TIMESTAMP(6)"',
    })
    created_at?: Date;

    @UpdateDateColumn({ type: 'datetime', nullable: true, onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updated_at?: Date;

    @DeleteDateColumn({ type: 'datetime', default: null })
    deleted_at?: Date;
}
