import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Define the type for our store item
interface StoreItem {
  item_id: string;
  item_code: string;
  item_type: number;
  item_name: string;
  manufacturer_name: string;
  manufacture_country: string;
  manufacturer_item_description: string;
  unit_qty: string;
  quantity: number;
  unit_of_measure: string;
  is_weighted: boolean;
  quantity_in_package: string;
  unit_quantity: number;
  item_price: number;
  unit_of_measure_price: number;
  item_status: number;
  price_update_date: string;
  category: string;
  subcategory: string;
  properties: string[];
  is_organic: boolean;
  created_at?: string;
}

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

// Function to fetch and upsert the first item
async function fetchAndUpsertFirstItem() {
  try {
    // Step 1: Fetch the first item from the store_items table
    console.log('Fetching the first item...');
    const { data: items, error: fetchError } = await supabase
      .from('store_items')
      .select('*')
      .limit(1);

    if (fetchError) {
      throw new Error(`Error fetching item: ${fetchError.message}`);
    }

    if (!items || items.length === 0) {
      throw new Error('No items found in the table');
    }

    const firstItem = items[0] as StoreItem;
    console.log('First item fetched:', firstItem);

    // Step 2: Make a small modification to demonstrate the upsert
    // For example, let's update the price slightly
    const updatedItem = {
      ...firstItem,
      item_price: parseFloat((firstItem.item_price + 0.10).toFixed(2)),
      price_update_date: new Date().toISOString()
    };

    console.log('Updated item:', updatedItem);

    // Step 3: Upsert the item (update if exists, insert if not)
    console.log('Upserting the item...');
    const { data: upsertData, error: upsertError } = await supabase
      .from('store_items')
      .upsert(updatedItem)
      .select();

    if (upsertError) {
      throw new Error(`Error upserting item: ${upsertError.message}`);
    }

    console.log('Upsert successful. Updated item:', upsertData);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Execute the function
fetchAndUpsertFirstItem();