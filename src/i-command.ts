export interface ICommandObject {
  name?: string;
  description?: string;
  do: () => Promise<any>;
  undo: () => Promise<any>;
}

export interface ICommandOptions {
  logger?: (msg: string) => void;
}

export default interface ICommand {
  // new (opt?: ICommandOptions): ICommand;
  // constructor(opt?: ICommandOptions): void;
  exec(commandObject: ICommandObject): Promise<void>;
  undo(): Promise<void>;
  redo(): Promise<void>;
  destroy(): void;
}
