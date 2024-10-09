export class Player {
  private id: number;
  private index: number;
  private pictureUrl: string;
  private name: string;
  private kissCount: number;
  private isActive: boolean;

  constructor(id: number, name: string, pictureUrl: string) {
    this.id = id;
    this.name = name;
    this.pictureUrl = pictureUrl;
    this.isActive = false;
    this.kissCount = 0;
    this.index = 0;
  }

  public incrementKissCount() {
    this.kissCount++;
  }
  get getKissCount() {
    return this.kissCount;
  }
  get getId() {
    return this.id;
  }
  get getName() {
    return this.name;
  }
  get getPictureUrl() {
    return this.pictureUrl;
  }
  get getIndex() {
    return this.index;
  }
  get getIsActive() {
    return this.isActive;
  }
  set setIsActive(newIsCurrentNow: boolean) {
    this.isActive = newIsCurrentNow;
  }
  set setIndex(newIndex: number) {
    this.index = newIndex;
  }
}
