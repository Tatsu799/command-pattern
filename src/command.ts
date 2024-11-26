import { ICommandObject } from './i-command';
import ICommand from './i-command';
// import { ICommandOptions } from './i-command';

export class Command implements ICommand {
  // private logger?: (msg: string) => void;
  private history: ICommandObject[] = [];
  private redoHistory: ICommandObject[] = [];
  // constructor(opt?: ICommandOptions) {
  //   this.logger = opt?.logger;
  // }
  constructor() {}

  async exec(command: ICommandObject): Promise<void> {
    try {
      await command.do();
      this.history.push(command);
      this.redoHistory = [];
    } catch (err) {
      console.error(err);
    }
  }

  async undo(): Promise<void> {
    if (this.history.length > 0) {
      const command = this.history.pop();
      await command?.undo();
      if (command) {
        this.redoHistory.push(command);
      }
    } else {
      console.log('No Command');
    }
  }

  async redo(): Promise<void> {
    if (this.redoHistory.length > 0) {
      const command = this.redoHistory.pop();
      await command?.do();
      if (command) {
        this.history.push(command);
      } else {
        console.log('No Command');
      }
    }
  }

  destroy(): void {
    this.history = [];
    this.redoHistory = [];
  }
}
