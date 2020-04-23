import { BaseEntity, Column, Entity } from "ts-datastore-orm";
import { v4 as uuidv4 } from 'uuid';
import dayJs from 'dayjs';

import Microfrontend from 'microfrontend/model';

interface IApplication {
	name: string
}

@Entity({namespace: "testing", kind: "application"})
class Application extends BaseEntity {
    @Column({ index: true })
    public id: string = '';
    
    @Column()
	public name : string = '';

	@Column()
	public githubId : string = '';

	@Column()
	public createdAt: string = '';

	static async findJsonWithMicrofrontends(uuid: string) {
		const [application] = await Application.find(uuid);
		if (!application) return null;

		const microfrontends = await application.getMicrofrontends();
		return {
			...(application?.toJSON()),
			microfrontends: microfrontends.map(micro => micro.toJSON())
		}
	}
	
	static async createApplication(payload: IApplication) {
		const application = Application.create({
			...payload,
			createdAt: dayJs().format(),
			id: uuidv4()
		});
		await application.save();
		return application;
	}

	static async createApplicationFromRepository(repository: any) {
		const application = Application.create({
			name: repository.name,
			githubId: repository.full_name,
			createdAt: dayJs().format(),
			id: uuidv4()
		});
		await application.save();
		return application;
	}

	async getMicrofrontends() {
		const [microfrontends] = await Microfrontend.query()
			.filter("applicationId", "=", this.id)
			.run();
		return microfrontends;
	}

	async update(payload: IApplication) {
		this.name = payload.name;
		await this.save();
		return this;
	}

	async getMeta() {
		const [microfrontends] = await Microfrontend.query()
			.filter("applicationId", "=", this.id)
			.run();

		const meta = {};

		const microfrontendFiles = await Promise.all(microfrontends.map(async (microfrontend) => {
			const version = await microfrontend.getCurrentVersion();
			console.info(version);
			return {
				name: microfrontend.name,
				files: version?.files
			}
		}));

		
		const asd =  microfrontendFiles
			.filter(microFile => !!microFile.files)
			.reduce((agg, microFile) => Object.assign(agg, {[microFile.name]: microFile.files}), {})
			console.info(asd)
		return asd
	}

}

export default Application;