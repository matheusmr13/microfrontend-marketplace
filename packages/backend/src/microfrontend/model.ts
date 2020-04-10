import { BaseEntity, Column, Entity } from "ts-datastore-orm";
import Version from 'version/model';
import { v4 as uuidv4 } from 'uuid';
import dayJs from 'dayjs';

enum APPROVAL_TYPE {
	NEEDS_REVISION = 'NEEDS_APROVAL',
	AUTO_APPROVE = 'AUTO_APPROVE'
}

interface IMicrofrontend {
	name: string,
	applicationId: string
}

@Entity({namespace: "testing", kind: "microfrontend"})
class Microfrontend extends BaseEntity {

    @Column({ index: true })
    public id: string = '';
    
    @Column()
	public name: string = '';
	
	@Column({ index: true })
	public applicationId: string = '';

	@Column()
	public approvalType: APPROVAL_TYPE = APPROVAL_TYPE.NEEDS_REVISION;

	@Column()
	public deployedVersionsIds: number[] = [];

	@Column()
	public createdAt: string = '';
	
	// constructor(name: string, applicationId:number) {
	// 	super();
	// 	this.name = name;
	// 	this.applicationId = applicationId;
	// }

	static async createMicrofrontend(payload: IMicrofrontend) {
		const microfrontend = Microfrontend.create({
			...payload,
			createdAt: dayJs().format(),
			id: uuidv4()
		});
		await microfrontend.save();
		return microfrontend;
	}

	async update(payload: IMicrofrontend) {
		this.name = payload.name;
		await this.save();
		return this;
	}


	static async findJsonWithVersions(uuid: string) {
		const [microfrontend] = await Microfrontend.find(uuid);
		if (!microfrontend) return null;

		const versions = await microfrontend.getVersions();
		return {
			...(microfrontend.toJSON()),
			versions: versions.map(version => version.toJSON())
		}
	}

	async getVersions() {
		const [versions] = await Version.query()
			.filter("microfrontendId", "=", this.id)
			.run();
		return versions;
	}

	// async getMetadata() {
	// 	const [deployedVersions] = await Version.findMany(this.deployedVersionsIds);

	// 	return deployedVersions.reduce((agg: any, version :Version) => Object.assign(agg, {
	// 		[version.microfrontendName]: version.files
	// 	}), {});

		// {
		// 	"calculator": {
		// 	  "js": [
		// 		"./microfrontends/calculator/static/js/runtime-main.77471cde.js",
		// 		"./microfrontends/calculator/static/js/2.38ed667d.chunk.js",
		// 		"./microfrontends/calculator/static/js/main.05aca4df.chunk.js"
		// 	  ],
		// 	  "css": [
		// 		"./microfrontends/calculator/static/css/main.5db564a1.chunk.css"
		// 	  ]
		// 	},
		// 	"clock": {
		// 	  "js": [
		// 		"./microfrontends/clock/static/js/2.aa876795.chunk.js",
		// 		"./microfrontends/clock/static/js/main.200bda5e.chunk.js",
		// 		"./microfrontends/clock/static/js/runtime-main.bba46b12.js",
		// 		"./microfrontends/clock/precache-manifest.eef57980d56dde585cc47719c11db0cb.js"
		// 	  ],
		// 	  "css": []
		// 	},
		// 	"result-view": {
		// 	  "js": [
		// 		"./microfrontends/result-view/static/js/2.302b8874.chunk.js",
		// 		"./microfrontends/result-view/static/js/runtime-main.b6c8b1e5.js",
		// 		"./microfrontends/result-view/static/js/main.1f55f859.chunk.js"
		// 	  ],
		// 	  "css": [
		// 		"./microfrontends/result-view/static/css/main.696f78a6.chunk.css"
		// 	  ]
		// 	}
		//   }
	// }
}

export default Microfrontend;