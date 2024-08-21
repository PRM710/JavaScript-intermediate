const mysql = require('mysql2/promise');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { username, password } = req.body;

    const connection = await mysql.createConnection({
        host: 'your-remote-database-url', // Use a remote database
        user: 'your-username',
        password: 'your-password',
        database: 'intermediate'
    });

    try {
        const [results] = await connection.execute('SELECT * FROM login WHERE username = ? AND password = ?', [username, password]);

        if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    } finally {
        connection.end();
    }
}
