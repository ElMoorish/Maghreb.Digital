import type { Locale } from './config';

const dictionaries = {
    fr: () => import('./dictionaries/fr.json').then((module) => module.default),
    en: () => import('./dictionaries/en.json').then((module) => module.default),
    ar: () => import('./dictionaries/ar.json').then((module) => module.default),
};

export type Dictionary = Awaited<ReturnType<typeof dictionaries.fr>>;

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
    return dictionaries[locale]();
};
