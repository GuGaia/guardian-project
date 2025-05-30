import { AuthProvider } from './Auth';

export function AppProvider({children}) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}
