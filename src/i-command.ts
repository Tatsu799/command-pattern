export interface ICommandObject {
  name?: string;
  description?: string;
  do: () => Promise<any>;
  undo: () => Promise<any>;
}

interface ICommandOptions {
  logger?: (msg: string) => void;
}

export default interface ICommand {
  constructor(opt?: ICommandOptions): void;

  exec(commandObject: ICommandObject): Promise<void>;

  undo(): Promise<void>;

  redo(): Promise<void>;

  destroy(): void;
}
