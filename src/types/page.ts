let counter = 0;

export class Page {
  id: string = "";
  title: string = "";

  constructor() {
    counter += 1;
    this.id = `${counter}`;
  }

  properTitle(): string {
    return this.title.charAt(0).toUpperCase() + this.title.slice(1);
  };
}
