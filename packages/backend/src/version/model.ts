import { BaseEntity, Column, Entity } from "ts-datastore-orm";
import { v4 as uuidv4 } from "uuid";
import dayJs from "dayjs";

enum STATUS {
  NEEDS_APROVAL = "NEEDS_APROVAL",
  APPROVED = "APPROVED",
}

interface Files {
  js?: Array<string>;
  css?: Array<string>;
}

interface IVersion {
  name: string;
  files: Files;
  microfrontendId: string;
}

@Entity({ kind: "version" })
class Version extends BaseEntity {
  static STATUS = STATUS;

  @Column({ index: true })
  public id: string = "";

  @Column({ index: true })
  public microfrontendId: string = "";

  @Column()
  public name: string = "";

  @Column({ index: true })
  public status: STATUS = STATUS.NEEDS_APROVAL;

  @Column()
  public files: Files = {};

  @Column()
  public createdAt: string = "";

  static async createVersion(payload: IVersion) {
    const version = Version.create({
      ...payload,
      createdAt: dayJs().format(),
      id: uuidv4(),
    });
    await version.save();
    return version;
  }

  async update(payload: IVersion) {
    this.name = payload.name;
    this.files = payload.files;
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
