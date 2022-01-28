import { IDENTIFIER } from './extension';

export const runCommand = async (record: Aha.RecordUnion, commands: Command) => {
  await aha.command(`${IDENTIFIER}.${commands}`, { record });
};
