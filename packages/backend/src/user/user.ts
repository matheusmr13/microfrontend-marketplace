import { BaseEntity, Column, Entity } from "ts-datastore-orm";
import { v4 as uuidv4 } from 'uuid';
import dayJs from 'dayjs';
import jwt from 'jsonwebtoken';

interface IUser {
	name: string,
	login: string,
	email : string,
	githubToken ?: string
}

@Entity({namespace: "testing", kind: "user"})
class User extends BaseEntity {
    @Column({ index: true })
    public id: string = '';
    
    @Column()
	public name: string = '';
	
	@Column({ index: true })
	public login: string = '';

	@Column({ index: true })
	public email: string = '';

	@Column()
	public createdAt: string = '';

	@Column()
	public githubToken: string = '';

	static async createUser(payload: IUser) {
		const user = User.create({
			...payload,
			createdAt: dayJs().format(),
			id: uuidv4()
		});
		await user.save();
		return user;
	}

	getJWT() {
		const token = jwt.sign({
			id: this.id
		}, 'MY_COOL_SECRET', {
			expiresIn: 10000
		});

		return {
			access_token: token,
			token_type: 'bearer'
		};
	}

	async update(payload: IUser) {
		this.githubToken = payload.githubToken || '';
		await this.save();
		return this;
	}
}

export default User;