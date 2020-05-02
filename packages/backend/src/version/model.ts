import { BaseEntity, Column, Entity } from 'ts-datastore-orm';
import { v4 as uuidv4 } from 'uuid';
import dayJs from 'dayjs';

enum STATUS {
  NEEDS_APROVAL = 'NEEDS_APROVAL',
  APPROVED = 'APPROVED',
}

interface IVersion {
  name: string;
  microfrontendId: string;
  sha: string;
}

@Entity({ kind: 'version' })
class Version extends BaseEntity {
  static STATUS = STATUS;

  @Column({ index: true })
  public id: string = '';

  @Column({ index: true })
  public microfrontendId?: string = '';

  @Column({ index: true })
  public name: string = '';

  @Column()
  public sha: string = '';

  @Column({ index: true })
  public status: STATUS = STATUS.NEEDS_APROVAL;

  @Column()
  public createdAt: string = '';

  static async createVersion(payload: IVersion) {
    const version = Version.create({
      ...payload,
      createdAt: dayJs().format(),
      id: uuidv4(),
    });
    await version.save();
    return version;
  }

  static build(payload: IVersion) {
    const version = Version.create({
      ...payload,
      createdAt: dayJs().format(),
      id: uuidv4(),
    });
    return version;
  }

  async update(payload: IVersion) {
    this.name = payload.name;
    await this.save();
    return this;
  }

  async approve() {
    this.status = STATUS.APPROVED;
    await this.save();
    return this;
  }
}
export default Version;
