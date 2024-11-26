import { ICommandObject, ICommandOptions } from './i-command';
import ICommand from './i-command';
// import { ICommandOptions } from './i-command';

export class Command implements ICommand {
  // private logger?: (msg: string) => void;
  private currentHistory: ICommandObject[] = [];
  private redoHistory: ICommandObject[] = [];
  // constructor(opt?: ICommandOptions) {
  //   this.logger = opt?.logger;
  // }
  constructor() {}

  async exec(command: ICommandObject): Promise<void> {
    try {
      await command.do();
      this.currentHistory.push(command);
      this.redoHistory = [];
    } catch (err) {
      console.error(err);
    }
  }

  async undo(): Promise<void> {
    if (this.currentHistory.length > 0) {
      const command = this.currentHistory.pop();
      if (command) {
        await command.undo();
        this.redoHistory.push(command);
      }
    } else {
      console.log('No History');
    }
  }

  async redo(): Promise<void> {
    if (this.redoHistory.length > 0) {
      const command = this.redoHistory.pop();
      if (command) {
        await command.do();
        this.currentHistory.push(command);
      } else {
        console.log('No History');
      }
    }
  }

  destroy(): void {
    this.currentHistory = [];
    this.redoHistory = [];
  }
}
