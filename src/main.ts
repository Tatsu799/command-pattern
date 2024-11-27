import { Command } from './command';
import { ICommandObject } from './i-command';

const button = document.getElementById('getButton');
const backButton = document.getElementById('backButton');
const input = <HTMLInputElement>document.getElementById('input');
const output = <HTMLParagraphElement>document.getElementById('output');
button?.addEventListener('click', () => {
  output.innerHTML = input.value;
});

let commandManager = new Command();
const showText = (input: HTMLInputElement): ICommandObject => ({
  name: 'show text',
  description: 'get text',
  do: async () => {
    const currentText = input.value;
    output.innerHTML = currentText;
  },
  undo: async () => {
    output.innerHTML = '';
  },
});

button?.addEventListener('click', (e) => {
  async () => {
    const command = showText(input);
    await commandManager.exec(command);
  };
});

backButton?.addEventListener('click', (e) => {
  async () => {
    // const command = showText(input);
    console.log('undo');
    await commandManager.undo();
  };
});

// const IncrementCommand = (state: { value: number }): ICommandObject => ({
//   name: 'IncrementCommand',
//   description: 'Increments the value in the state',
//   do: async () => {
//     console.log(`Incrementing value: ${state.value} -> ${state.value + 1}`);
//     state.value += 1;
//   },
//   undo: async () => {
//     console.log(`Undo increment: ${state.value} -> ${state.value - 1}`);
//     state.value -= 1;
//   },
// });

// const DecrementCommand = (state: { value: number }): ICommandObject => ({
//   name: 'DecrementCommand',
//   description: 'Decrements the value in the state',
//   do: async () => {
//     console.log(`Decrementing value: ${state.value} -> ${state.value - 1}`);
//     state.value -= 1;
//   },
//   undo: async () => {
//     console.log(`Undo decrement: ${state.value} -> ${state.value + 1}`);
//     state.value += 1;
//   },
// });

// (async () => {
//   const state = { value: 0 };
//   const commandManager = new Command();

//   const command = IncrementCommand(state);
//   // await commandManager.exec(command);

//   // await commandManager.undo();

//   const incrementCommand = IncrementCommand(state);
//   const decrementCommand = DecrementCommand(state);

//   // コマンドを実行
//   console.log('=== Executing Increment Command ===');
//   await commandManager.exec(incrementCommand); // state.value = 1

//   console.log('=== Executing Decrement Command ===');
//   await commandManager.exec(incrementCommand); // state.value = 0

//   console.log('=== Undo Last Command ===');
//   await commandManager.undo(); // state.value = 1

//   console.log('=== Redo Last Command ===');
//   await commandManager.redo(); // state.value = 0

//   console.log('=== Re-executing Increment Command ===');
//   await commandManager.exec(incrementCommand); // キャッシュ利用, state.value = 1

//   console.log('=== Destroying Command Manager ===');
//   commandManager.destroy();
// })();

// const commandManager = new Command();
// console.log(commandManager);

// class textEditor implements ICommandObject {
//   private list: string[] = [];
//   public name: string;
//   public description: string;
//   public text?: string;
//   constructor(name: string, description: string, text?: string) {
//     this.name = name;
//     this.description = description;
//     this.text = text;
//   }
//   async do(): Promise<void> {
//     if (this.text) {
//       this.list.push(this.text);
//     }
//     console.log(this.text);
//   }
//   async undo(): Promise<void> {
//     if (this.list.length > 0) {
//       this.list.pop();
//       console.log('delete');
//     } else {
//       console.log('nothing');
//     }
//   }
// }

// const text = new textEditor('aaa', 'bbbb', 'write');
// // console.log(text);

// const text2 = new textEditor('aaa', 'bbbb', 'write2');
// const text3 = new textEditor('aaa', 'bbbb', 'write3');

// const command = new Command();
// command.exec(text);
// command.exec(text2);
// command.undo();
// command.exec(text3);
