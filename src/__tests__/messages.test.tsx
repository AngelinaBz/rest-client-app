import { describe, expect, it } from 'vitest';
import enMessages from '../../messages/en.json' with { type: 'json' };
import ruMessages from '../../messages/ru.json' with { type: 'json' };

type Messages = { [key: string]: string | Messages };

const printFaultyKey = (key: string) => {
  console.log(`Faulty key: ${key}`);
};

describe('Messages test', () => {
  it('Messages are translated into all languages & not empty', () => {
    const areKeysEqual = (a: Messages, b: Messages): boolean => {
      const keys: string[] = Object.keys(a);

      return keys.every((key) => {
        if (typeof a[key] === 'string' && typeof b[key] === 'string') {
          if (a[key] && b[key]) {
            return true;
          }

          printFaultyKey(key);

          return false;
        } else if (typeof a[key] !== 'string' && typeof b[key] !== 'string')
          return areKeysEqual(a[key], b[key]);

        printFaultyKey(key);

        return false;
      });
    };

    expect(areKeysEqual(enMessages, ruMessages)).toBe(true);
  });
});
