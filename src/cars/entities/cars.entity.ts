import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn }
from "typeorm";

@Entity()
export class Cars {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    plate: string;

    @Column()
    year: string;

    @Column()
    color: string;

    @Column({type: 'decimal'})
    price: number

    @Column()
    isFavorite: boolean;
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}