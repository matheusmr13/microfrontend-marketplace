import { BaseEntity, Column, Entity } from 'ts-datastore-orm';
import { v4 as uuidv4 } from 'uuid';
import dayJs from 'dayjs';

import Microfrontend from 'microfrontend/model';

interface IApplication {
  name: string;
  packageName: string;
}

@Entity({ namespace: 'testing', kind: 'application' })
class Application extends BaseEntity {
  @Column({ index: true })
  public id: string = '';

  @Column()
  public name: string = '';

  @Column()
  public githubId: string = '';

  @Column({ index: true })
  public ownerId: string = '';

  @Column()
  public createdAt: string = '';

  static async findJsonWithMicrofrontends(uuid: string) {
    const [application] = await Application.find(uuid);
    if (!application) return null;

    const microfrontends = await application.getMicrofrontends();
    return {
      ...application?.toJSON(),
      microfrontends: microfrontends.map((micro) => micro.toJSON()),
    };
  }

  static async createFromRepository(repository: any, payload: IApplication, ownerId: string) {
    const applicationName = repository.name;

    const application = Application.create({
      name: applicationName,
      githubId: repository.full_name,
      ownerId,
      createdAt: dayJs().format(),
      id: uuidv4(),
    });
    await application.save();

    const containerMicrofrontend = await Microfrontend.createFromRepository(
      repository,
      {
        name: `${applicationName} Container`,
        applicationId: application.id,
        packageName: payload.packageName,
      },
      ownerId
    );

    await containerMicrofrontend.save();

    return application;
  }

  async getMicrofrontends() {
    const [microfrontends] = await Microfrontend.query().filter('applicationId', '=', this.id).run();
    return microfrontends;
  }

  async update(payload: IApplication) {
    this.name = payload.name;
    await this.save();
    return this;
  }
}

export default Application;
