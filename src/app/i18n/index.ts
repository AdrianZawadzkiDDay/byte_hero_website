import type { Lang } from '../core/lang';
import { en } from './en';
import { pl, type Translations } from './pl';

export type { Translations };

export const DICTIONARIES: Record<Lang, Translations> = { pl, en };
