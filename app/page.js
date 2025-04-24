import Link from 'next/link';

export default function Page() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            gap: '1.5rem'
        }}>
            <h1>Welcome to Next.js! 🚀</h1>
            <Link href="/snake" style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#4caf50',
                color: 'white',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                transition: 'all 0.2s ease'
            }}>
                Play Snake Game 🐍
            </Link>
        </div>
    );
}
