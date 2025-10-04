import * as SQLite from 'expo-sqlite';
import type { SQLiteDatabase } from 'expo-sqlite';
import { CurrencyList, CurrencyInfo } from '../types';

const DB_NAME = 'currencies.db';
const TABLE = 'currencies';

function getDb(): SQLiteDatabase {
  return SQLite.openDatabaseSync(DB_NAME);
}

export async function initDb(): Promise<void> {
  const db = getDb();
  await db.execAsync(`CREATE TABLE IF NOT EXISTS ${TABLE} (
		id TEXT PRIMARY KEY,
		name TEXT NOT NULL,
		symbol TEXT NOT NULL,
		code TEXT,
		list TEXT NOT NULL
	)`);
}

export async function clearAll(): Promise<void> {
  const db = getDb();
  await db.execAsync(`DELETE FROM ${TABLE}`);
}

export async function insertList(listName: 'A' | 'B', items: CurrencyList): Promise<void> {
  const db = getDb();
  await initDb();
  await db.withTransactionAsync(async () => {
    for (const item of items) {
      await db.runAsync(
        `INSERT OR REPLACE INTO ${TABLE}(id,name,symbol,code,list) VALUES (?,?,?,?,?)`,
        [item.id, item.name, item.symbol, item.code ?? null, listName],
      );
    }
  });
}

export async function getByList(listName: 'A' | 'B'): Promise<CurrencyList> {
  const db = getDb();
  await initDb();
  const rows = await db.getAllAsync(
    `SELECT id,name,symbol,code FROM ${TABLE} WHERE list = ? ORDER BY name ASC`,
    [listName],
  );
  return rows as unknown as CurrencyList;
}

export async function getPurchasableFromAandB(): Promise<CurrencyList> {
  const db = getDb();
  await initDb();
  const rows = await db.getAllAsync(
    `SELECT id,name,symbol,code FROM ${TABLE} WHERE list IN ('A','B') ORDER BY name ASC`,
  );
  return rows as unknown as CurrencyList;
}