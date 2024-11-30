import { ICommandObject, ICommandOptions } from './i-command';
import ICommand from './i-command';

export class Command implements ICommand {
  private logger?: (msg: string) => void; //使い方確認
  private currentCommand: ICommandObject[] = [];
  private redoCommand: ICommandObject[] = [];

  //コンストラクターがない場合エラーが出ない
  // constructor(opt?: ICommandOptions) {
  //   this.logger = opt?.logger;
  //   if (this.logger) {
  //     this.logger('aaaaa');
  //   }
  // }

  // エラーの解決方法確認中　使い方がわからない
  // constructor(opt?: ICommandOptions) {
  //   this.logger = opt?.logger;
  // }
  constructor() {}

  /**
   * コマンドを実行する
   * @param command -コマンドのオブジェクト
   * @param returns  -Promise<void>
   */
  async exec(command: ICommandObject): Promise<void> {
    try {
      await command.do();
      this.currentCommand.push(command);
      this.redoCommand = [];
    } catch (err) {
      console.error('Error exec', err);
    }
  }

  /**
   * 前の状態に戻す関数
   * @param returns  -Promise<void>
   */
  async undo(): Promise<void> {
    if (this.currentCommand.length > 0) {
      const command = this.currentCommand.pop();
      if (command) {
        try {
          await command.undo();
          this.redoCommand.push(command);
        } catch (err) {
          console.error('Error undo', err);
        }
      }
    } else {
      console.log('No History');
    }
  }

  /**
   * undo操作を取り消す関数実行
   * @param returns  -Promise<void>
   */
  async redo(): Promise<void> {
    if (this.redoCommand.length > 0) {
      const command = this.redoCommand.pop();
      if (command) {
        try {
          await command.do();
          this.currentCommand.push(command);
        } catch (err) {
          console.error('Error redo', err);
        }
      }
    } else {
      console.log('No History');
    }
  }

  /**
   * すべてのコマンドリスト（履歴）を削除
   */
  destroy(): void {
    this.currentCommand = [];
    this.redoCommand = [];
    console.log('All Command destroyed');
  }
}
