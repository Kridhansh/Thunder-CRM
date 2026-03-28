import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { query } from '~/lib/db.server';

async function seedUser() {
  console.log('Creating admin user...');
  
  try {
    const hashedPassword = await bcrypt.hash('Team@111111', 10);
    
    // Check if user exists
    const existing = await query('SELECT id FROM users WHERE email = $1', ['meshcookies@gmail.com']);
    
    if (existing.rows.length > 0) {
      await query(
        'UPDATE users SET password = $1, name = $2, role = $3 WHERE email = $4',
        [hashedPassword, 'Admin User', 'admin', 'meshcookies@gmail.com']
      );
      console.log('✓ User updated');
    } else {
      await query(
        'INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4)',
        ['meshcookies@gmail.com', hashedPassword, 'Admin User', 'admin']
      );
      console.log('✓ User created');
    }
    
    console.log('\nUser seeded successfully!');
    console.log('Email: meshcookies@gmail.com');
    console.log('Password: Team@111111');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seedUser();