import * as SQLite from 'expo-sqlite';
import type { SQLiteDatabase } from 'expo-sqlite';
import { CurrencyList, CurrencyInfo } from '../types';

interface CurrencyRow {
  id: string;
  name: string;
  symbol: string;
  code: string | null;
  image_url: string | null;
  price: number | null;
  change_24h: number | null;
  market_cap: number | null;
}

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
  
  try {
    await db.execAsync(`ALTER TABLE ${TABLE} ADD COLUMN image_url TEXT`);
  } catch (error) {
  }
  
  try {
    await db.execAsync(`ALTER TABLE ${TABLE} ADD COLUMN price REAL`);
  } catch (error) {
  }
  
  try {
    await db.execAsync(`ALTER TABLE ${TABLE} ADD COLUMN change_24h REAL`);
  } catch (error) {
  }
  
  try {
    await db.execAsync(`ALTER TABLE ${TABLE} ADD COLUMN market_cap REAL`);
  } catch (error) {
  }
}

export async function clearAll(): Promise<void> {
  const db = getDb();
  await db.execAsync(`DELETE FROM ${TABLE}`);
}

export async function recreateTable(): Promise<void> {
  const db = getDb();
  await db.execAsync(`DROP TABLE IF EXISTS ${TABLE}`);
  await initDb();
}

export async function insertList(listName: 'A' | 'B', items: CurrencyList): Promise<void> {
  const db = getDb();
  await initDb();
  console.log(`Inserting ${items.length} items into list ${listName}`);
  
  await db.withTransactionAsync(async () => {
    for (const item of items) {
      console.log(`Inserting item: ${item.id} - ${item.name}`);
      await db.runAsync(
        `INSERT OR REPLACE INTO ${TABLE}(id,name,symbol,code,image_url,price,change_24h,market_cap,list) VALUES (?,?,?,?,?,?,?,?,?)`,
        [
          item.id, 
          item.name, 
          item.symbol, 
          item.code ?? null, 
          item.imageUrl ?? null,
          item.price ?? null,
          item.change24h ?? null,
          item.marketCap ?? null,
          listName
        ],
      );
    }
  });
  console.log(`Successfully inserted ${items.length} items into list ${listName}`);
}

export async function getByList(listName: 'A' | 'B'): Promise<CurrencyList> {
  const db = getDb();
  await initDb();
  console.log(`Getting items for list ${listName}`);
  
  const rows = await db.getAllAsync(
    `SELECT id,name,symbol,code,image_url,price,change_24h,market_cap FROM ${TABLE} WHERE list = ? ORDER BY name ASC`,
    [listName],
  ) as CurrencyRow[];
  
  console.log(`Found ${rows.length} items for list ${listName}`);
  
  const result = rows.map((row: CurrencyRow) => ({
    id: row.id,
    name: row.name,
    symbol: row.symbol,
    code: row.code ?? undefined,
    imageUrl: row.image_url ?? undefined,
    price: row.price ?? undefined,
    change24h: row.change_24h ?? undefined,
    marketCap: row.market_cap ?? undefined,
  }));
  
  console.log('Mapped result:', result.slice(0, 3)); // Log first 3 items
  return result;
}

export async function getPurchasableFromAandB(): Promise<CurrencyList> {
  const db = getDb();
  await initDb();
  const rows = await db.getAllAsync(
    `SELECT id,name,symbol,code,image_url,price,change_24h,market_cap FROM ${TABLE} WHERE list IN ('A','B') ORDER BY name ASC`,
  ) as CurrencyRow[];
  
  return rows.map((row: CurrencyRow) => ({
    id: row.id,
    name: row.name,
    symbol: row.symbol,
    code: row.code ?? undefined,
    imageUrl: row.image_url ?? undefined,
    price: row.price ?? undefined,
    change24h: row.change_24h ?? undefined,
    marketCap: row.market_cap ?? undefined,
  }));
}