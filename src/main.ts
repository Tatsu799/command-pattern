import { Command } from './command';
import { ICommandObject } from './i-command';

const output = <HTMLParagraphElement>document.getElementById('output');

class textEditor implements ICommandObject {
  private static list: string[] = [];
  public name: string;
  public description: string;
  public text: string;
  constructor(name: string, description: string, text: string) {
    this.name = name;
    this.description = description;
    this.text = text;
  }

  private showText(text: string) {
    // const text = textEditor.list[0];
    if (text) {
      output.innerHTML = text;
    } else {
      output.innerHTML = 'リストがありません。';
    }
  }

  async do(): Promise<void> {
    if (this.text) {
      try {
        textEditor.list.push(this.text);
        console.log(`Write text: ${this.text}`);
        this.showText(this.text);
      } catch (err) {
        console.error(err);
      }
    }
  }
  async undo(): Promise<void> {
    if (textEditor.list.length > 0) {
      try {
        const text = textEditor.list.pop();
        console.log(`Undo text: remove ${text}`);
        this.showText(textEditor.list[textEditor.list.length - 1]);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log('nothing');
    }
  }
}

const text = new textEditor('text1', 'text1', 'write1');
const text2 = new textEditor('text2', 'text2', 'write2');
const text3 = new textEditor('text3', 'text3', 'write3');
const text4 = new textEditor('text4', 'text4', 'write4');

const command = new Command();
(async () => {
  await command.exec(text);
  await command.exec(text2);
  await command.exec(text3);
  // await command.undo();
  // await command.undo();
  // await command.undo();
  // await command.undo();

  // await command.redo();
  // await command.redo();
  // await command.redo();
  // await command.redo();
  // command.exec(text4);
  // command.destroy();
})();
