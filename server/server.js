const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.SERVER_PORT || 3001;  

// PostgreSQL connection configuration
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
});

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// Create a new task
app.post('/api/task', async (req, res) => {
    const { title, description, scheduledDate, status, pinned } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO tasks (title, description, scheduled_date, status, pinned) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, description, scheduledDate, status, pinned]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
});


app.patch('/api/task/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const record = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
        
        if (record.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const updateData = req.body; 
        const keys = Object.keys(updateData);

        // Construct the SQL query dynamically
        let sql = 'UPDATE tasks SET ';
        const values = [];
        let i = 1;

        if (keys.indexOf("title") !== -1) {
            sql += `title = $${i}, `;
            values.push(updateData.title);
            i++;
        }

        if (keys.indexOf("description") !== -1) {
            sql += `description = $${i}, `;
            values.push(updateData.description);
            i++;
        }

        
        if (keys.indexOf("pinned") !== -1) {
            sql += `pinned = $${i}, `;
            values.push(updateData.pinned);
            i++;
        }

        if (keys.indexOf("status") !== -1) {
            sql += `status = $${i}, `;
            values.push(updateData.status);
            i++;
        }

        // Remove the trailing comma and space
        sql = sql.slice(0, -2); 

        sql += ` WHERE id = $${i}`;
        
        values.push(id);
        
        const result = await pool.query(sql, values); 
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Failed to update task' });
    }
});

app.get('/api/tasks', async (req, res) => {
    const { date } = req.query;

    try {
        const result = await pool.query("SELECT * FROM tasks WHERE DATE(scheduled_date) = $1", [date]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

app.delete('/api/task/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});