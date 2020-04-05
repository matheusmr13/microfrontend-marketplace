import { BaseEntity, Column, Entity } from "ts-datastore-orm";
import Application from '../../application/model';
import Microfrontend from './microfrontend';

enum STATUS {
	NEEDS_APROVAL = 'NEEDS_APROVAL',
	APPROVED = 'APPROVED',
}

interface Files {
	js ?: Array<string>
	css ?: Array<string>
}
@Entity({kind: "version"})
class Version extends BaseEntity {

	static STATUS = STATUS;

    @Column({ generateId: true })
    public id: number = 0;
    

	@Column({ index: true })
	public microfrontendId: number = 0;

	@Column()
	public microfrontendName: string = '';

    @Column()
	public name: string = '';
	
	@Column()
	public status: STATUS = STATUS.NEEDS_APROVAL;

	@Column()
	public files: Files = {};
}
export default Version;