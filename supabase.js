// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL = 'https://hvdvlhptertqtrggpfrn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2ZHZsaHB0ZXJ0cXRyZ2dwZnJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMzQ0NzgsImV4cCI6MjA4NTcxMDQ3OH0.Zaz2TWuEAbsCzZfv5mW-VT6b4OQWqHkIyhz6m0CEfXk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function submitRequest(firstName, lastName, whatsapp, osType, email) {
    
    const { data, error } = await supabase
        .from('beta_access_requests')
        .insert({
            first_name: firstName,
            last_name: lastName,
            whatsapp: whatsapp,
            os_type: osType,
            email: email
        });

    return { data, error };
}
