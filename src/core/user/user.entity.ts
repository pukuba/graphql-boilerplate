import { Column, DeepPartial, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("user")
export class UserEntity {
	constructor(obj: DeepPartial<UserEntity>) {
		Object.assign(this, obj);
	}

	@PrimaryGeneratedColumn({ type: "bigint" })
	id!: number;

	@Column({
		type: "varchar",
		name: "username",
		nullable: false,
	})
	username!: string;
}
