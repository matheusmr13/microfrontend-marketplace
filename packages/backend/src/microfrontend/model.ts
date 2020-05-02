import { BaseEntity, Column, Entity } from 'ts-datastore-orm';
import { v4 as uuidv4 } from 'uuid';
import dayJs from 'dayjs';
import User from 'user/user';
import { getFoldersFromGithub } from 'github/client';
import Version from 'version/model';

enum APPROVAL_TYPE {
  NEEDS_REVISION = 'NEEDS_APROVAL',
  AUTO_APPROVE = 'AUTO_APPROVE',
}

interface IMicrofrontend {
  name: string;
  applicationId: string;
  packageName: string;
}

@Entity({ namespace: 'testing', kind: 'microfrontend' })
class Microfrontend extends BaseEntity {
  @Column({ index: true })
  public id: string = '';

  @Column()
  public name: string = '';

  @Column()
  public packageName: string = '';

  @Column()
  public githubId: string = '';

  @Column({ index: true })
  public applicationId: string = '';

  @Column({ index: true })
  public ownerId: string = '';

  @Column()
  public approvalType: APPROVAL_TYPE = APPROVAL_TYPE.NEEDS_REVISION;

  @Column()
  public deployedVersionsIds: number[] = [];

  @Column()
  public createdAt: string = '';

  static async createMicrofrontend(payload: IMicrofrontend) {
    const microfrontend = Microfrontend.create({
      ...payload,
      createdAt: dayJs().format(),
      id: uuidv4(),
    });
    await microfrontend.save();
    return microfrontend;
  }

  static async createFromRepository(repository: any, payload: IMicrofrontend, ownerId: string) {
    const application = Microfrontend.create({
      name: repository.name,
      ...payload,
      githubId: repository.full_name,
      ownerId,
      createdAt: dayJs().format(),
      id: uuidv4(),
    });
    await application.save();
    return application;
  }

  async update(payload: IMicrofrontend) {
    this.name = payload.name;
    this.packageName = payload.packageName;
    await this.save();
    return this;
  }

  static async findJsonWithVersions(uuid: string) {
    const [microfrontend] = await Microfrontend.find(uuid);
    if (!microfrontend) return null;

    const versions = await microfrontend.getVersions();
    return {
      ...microfrontend.toJSON(),
      versions: versions.map((version) => version.toJSON()),
    };
  }

  async getVersions() {
    const [versions] = await Version.query().filter('microfrontendId', '=', this.id).run();
    return versions;
  }

  async getCurrentVersion() {
    const [version] = await Version.query()
      .filter('microfrontendId', '=', this.id)
      // .filter("status", "=", Version.STATUS.APPROVED)
      .run();

    return version.filter((v) => v.status === Version.STATUS.APPROVED)[0];
  }

  async syncVersions(user: User) {
    const githubUrl = `/repos/${this.githubId}/contents/versions/${this.packageName}`;
    const versions = await getFoldersFromGithub(githubUrl, user);

    const [microfrontendVersions] = await Version.query().filter('microfrontendId', '=', this.id).run();

    await Promise.all(
      versions
        .filter(
          (version: any) =>
            !microfrontendVersions.find((applicationVersion) => applicationVersion.name === version.name)
        )
        .map(async (version: any) => {
          const newVersion = Version.build({
            microfrontendId: this.id,
            name: version.name,
            sha: version.sha,
          });
          await newVersion.save();
        })
    );
  }
}

export default Microfrontend;
