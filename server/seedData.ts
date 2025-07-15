import { db } from "./db";
import { categories, users, accounts, transactions } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function seedDatabase() {
  try {
    // Seed default categories
    const defaultCategories = [
      // Expense categories
      { name: 'Food & Dining', type: 'expense' as const, color: '#FF6B6B', icon: '🍽️', isDefault: true },
      { name: 'Transportation', type: 'expense' as const, color: '#4ECDC4', icon: '🚗', isDefault: true },
      { name: 'Shopping', type: 'expense' as const, color: '#45B7D1', icon: '🛍️', isDefault: true },
      { name: 'Entertainment', type: 'expense' as const, color: '#96CEB4', icon: '🎬', isDefault: true },
      { name: 'Bills & Utilities', type: 'expense' as const, color: '#FECA57', icon: '💡', isDefault: true },
      { name: 'Healthcare', type: 'expense' as const, color: '#FF9FF3', icon: '🏥', isDefault: true },
      { name: 'Travel', type: 'expense' as const, color: '#A8E6CF', icon: '✈️', isDefault: true },
      { name: 'Education', type: 'expense' as const, color: '#FFB347', icon: '📚', isDefault: true },
      { name: 'Personal Care', type: 'expense' as const, color: '#DDA0DD', icon: '💄', isDefault: true },
      { name: 'Insurance', type: 'expense' as const, color: '#87CEEB', icon: '🛡️', isDefault: true },
      
      // Income categories
      { name: 'Salary', type: 'income' as const, color: '#6BCF7F', icon: '💼', isDefault: true },
      { name: 'Freelance', type: 'income' as const, color: '#4D96FF', icon: '💻', isDefault: true },
      { name: 'Investment', type: 'income' as const, color: '#9B59B6', icon: '📈', isDefault: true },
      { name: 'Business', type: 'income' as const, color: '#F39C12', icon: '🏢', isDefault: true },
      { name: 'Side Hustle', type: 'income' as const, color: '#E74C3C', icon: '🚀', isDefault: true },
      { name: 'Rental Income', type: 'income' as const, color: '#2ECC71', icon: '🏠', isDefault: true },
      { name: 'Dividends', type: 'income' as const, color: '#3498DB', icon: '💰', isDefault: true },
      { name: 'Other Income', type: 'income' as const, color: '#95A5A6', icon: '💸', isDefault: true },
    ];

    // Check if categories already exist
    const existingCategories = await db.select().from(categories).limit(1);
    
    if (existingCategories.length === 0) {
      await db.insert(categories).values(defaultCategories);
      console.log('✅ Default categories seeded successfully');
    } else {
      console.log('📋 Categories already exist, skipping seed');
    }

    // Create demo user if not exists
    const existingUsers = await db.select().from(users).limit(1);
    
    if (existingUsers.length === 0) {
      const [demoUser] = await db.insert(users).values({
        email: 'demo@budgetiq.com',
        name: 'Demo User',
        currency: 'USD',
      }).returning();

      // Create demo account
      const [demoAccount] = await db.insert(accounts).values({
        userId: demoUser.id,
        name: 'Main Checking',
        type: 'checking',
        balance: '5000.00',
        currency: 'USD',
      }).returning();

      // Get categories for demo transactions
      const expenseCategories = await db.select().from(categories).where(eq(categories.type, 'expense'));
      const incomeCategories = await db.select().from(categories).where(eq(categories.type, 'income'));

      // Create demo transactions
      const demoTransactions = [
        {
          userId: demoUser.id,
          accountId: demoAccount.id,
          categoryId: incomeCategories.find(c => c.name === 'Salary')?.id || incomeCategories[0].id,
          description: 'Monthly Salary',
          amount: '5000.00',
          type: 'income' as const,
          date: new Date('2025-01-01'),
        },
        {
          userId: demoUser.id,
          accountId: demoAccount.id,
          categoryId: expenseCategories.find(c => c.name === 'Food & Dining')?.id || expenseCategories[0].id,
          description: 'Grocery Shopping',
          amount: '-85.50',
          type: 'expense' as const,
          date: new Date('2025-01-15'),
        },
        {
          userId: demoUser.id,
          accountId: demoAccount.id,
          categoryId: expenseCategories.find(c => c.name === 'Transportation')?.id || expenseCategories[1].id,
          description: 'Gas Station',
          amount: '-45.00',
          type: 'expense' as const,
          date: new Date('2025-01-14'),
        },
        {
          userId: demoUser.id,
          accountId: demoAccount.id,
          categoryId: incomeCategories.find(c => c.name === 'Freelance')?.id || incomeCategories[1].id,
          description: 'Web Development Project',
          amount: '1200.00',
          type: 'income' as const,
          date: new Date('2025-01-10'),
        },
      ];

      await db.insert(transactions).values(demoTransactions);
      console.log('✅ Demo data seeded successfully');
    }

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}