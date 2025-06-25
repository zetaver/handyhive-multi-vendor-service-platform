import { User, UserRole, MOCK_USERS } from '../types/auth';

export function setAuthUser(user: User): void {
  localStorage.setItem('authUser', JSON.stringify(user));
}

export function getAuthUser(): User | null {
  const userStr = localStorage.getItem('authUser');
  return userStr ? JSON.parse(userStr) : null;
}

export function clearAuthUser(): void {
  localStorage.removeItem('authUser');
}

export function isAuthenticated(): boolean {
  return !!getAuthUser();
}

export function getUserRole(): UserRole | null {
  const user = getAuthUser();
  return user ? user.role : null;
}

export function authenticateUser(email: string, password: string): User {
  const user = MOCK_USERS.find(u => u.email === email && u.password === password);
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export function getDashboardPath(role: UserRole): string {
  switch (role) {
    case 'admin':
      return '/dashboard/admin';
    case 'provider':
      return '/dashboard/provider';
    case 'customer':
      return '/dashboard/customer';
    default:
      return '/dashboard';
  }
}