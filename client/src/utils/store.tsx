import Collection, { CurrentCollection, Environment } from '../model/Collection';

function getSelectedEnvs(): Record<number, string> {
  try {
    return JSON.parse(localStorage.getItem('selectedEnvs') ?? '{}');
  } catch (e) {
    console.error(e);
  }

  return {};
}

function getSelectedEnv(collection: Collection | CurrentCollection): Environment | null {
  const selectedEnvName = getSelectedEnvs()[collection.id];

  if (!selectedEnvName) return null;

  return collection.data?.envs?.[selectedEnvName] ?? null;
}

function saveSelectedEnv(collectionId: number, name: string) {
  const newSelectedEnvs = getSelectedEnvs();
  newSelectedEnvs[collectionId] = name;
  localStorage.setItem('selectedEnvs', JSON.stringify(newSelectedEnvs));
}

export { getSelectedEnv, getSelectedEnvs, saveSelectedEnv };
