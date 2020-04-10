import { BaseEntity, Column, Entity } from "ts-datastore-orm";
import { v4 as uuidv4 } from 'uuid';
import dayJs from 'dayjs';

enum STATUS {
	NEEDS_APROVAL = 'NEEDS_APROVAL',
	APPROVED = 'APPROVED',
}

interface Files {
	js ?: Array<string>
	css ?: Array<string>
}

interface IVersion {
	name: string,
	files: Files,
	microfrontendId: string
}

@Entity({kind: "version"})
class Version extends BaseEntity {

	static STATUS = STATUS;

    @Column()
    public id: string = '';
    

	@Column({ index: true })
	public microfrontendId: string = '';

    @Column()
	public name: string = '';
	
	@Column()
	public status: STATUS = STATUS.NEEDS_APROVAL;

	@Column()
	public files: Files = {};

	@Column()
	public createdAt: string = '';

	static async createVersion(payload: IVersion) {
		const version = Version.create({
			...payload,
			createdAt: dayJs().format(),
			id: uuidv4()
		});
		await version.save();
		return version;
	}

	static async approve(id: string) {
		const [version] = await Version.find(id);
		if (!version) throw new Error();
		version.status = STATUS.APPROVED;
		await version.save();
		return version;
	}
}
export default Version;