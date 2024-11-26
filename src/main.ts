import { Command } from './command';
import { ICommandObject } from './i-command';

const button = document.getElementById('getButton');
const input = <HTMLInputElement>document.getElementById('input');
const output = <HTMLParagraphElement>document.getElementById('output');
button?.addEventListener('click', () => {
  output.innerHTML = input.value;
});

const IncrementCommand = (state: { value: number }): ICommandObject => ({
  name: 'IncrementCommand',
  description: 'Increments the value in the state',
  do: async () => {
    console.log(`Incrementing value: ${state.value} -> ${state.value + 1}`);
    state.value += 1;
  },
  undo: async () => {
    console.log(`Undo increment: ${state.value} -> ${state.value - 1}`);
    state.value -= 1;
  },
});

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

(async () => {
  const state = { value: 0 };
  const commandManager = new Command();

  const command = IncrementCommand(state);
  await commandManager.exec(command);

  await commandManager.undo();

  //   const incrementCommand = IncrementCommand(state);
  //   const decrementCommand = DecrementCommand(state);

  //   // コマンドを実行
  //   console.log('=== Executing Increment Command ===');
  //   await commandManager.exec(incrementCommand); // state.value = 1

  // console.log('=== Executing Decrement Command ===');
  // await commandManager.exec(decrementCommand); // state.value = 0

  // console.log('=== Undo Last Command ===');
  // await commandManager.undo(); // state.value = 1

  // console.log('=== Redo Last Command ===');
  // await commandManager.redo(); // state.value = 0

  // console.log('=== Re-executing Increment Command ===');
  // await commandManager.exec(incrementCommand); // キャッシュ利用, state.value = 1

  // console.log('=== Destroying Command Manager ===');
  // commandManager.destroy();
})();
