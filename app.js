import express from 'express';
import { createClient } from 'redis';

const app = express();
app.use(express.json());

const redis = createClient({
  url: 'redis://default:HN79A5HBuxyoTSC7gczxEEJ77beMDnUP@redis-13372.c91.us-east-1-3.ec2.cloud.redislabs.com:13372'
});

redis.on('error', (err) => console.log('Redis Error:', err));

await redis.connect();

console.log("✅ Redis Connected");

// 🔹 Initialize seats (1–5)
for (let i = 1; i <= 5; i++) {
    await redis.set(`seat:${i}`, 'available');
}

// 🔹 Get all seats
app.get('/seats', async (req, res) => {
    let result = [];
    for (let i = 1; i <= 5; i++) {
        const status = await redis.get(`seat:${i}`);
        result.push({ seat: i, status });
    }
    res.json(result);
});

// 🔐 Book seat with locking
app.post('/book/:id', async (req, res) => {
    const seatId = req.params.id;

    // 🔒 Try to acquire lock
    const lock = await redis.set(`lock:${seatId}`, 'locked', {
        NX: true,
        EX: 10
    });

    if (!lock) {
        return res.json({ message: "⚠️ Seat is being booked by another user" });
    }

    const status = await redis.get(`seat:${seatId}`);

    if (status === 'booked') {
        await redis.del(`lock:${seatId}`);
        return res.json({ message: "❌ Seat already booked" });
    }

    // ✅ Book seat
    await redis.set(`seat:${seatId}`, 'booked');

    // 🔓 Release lock
    await redis.del(`lock:${seatId}`);

    res.json({ message: `✅ Seat ${seatId} booked successfully` });
});

// 🔄 Reset seats (for testing)
app.post('/reset', async (req, res) => {
    for (let i = 1; i <= 5; i++) {
        await redis.set(`seat:${i}`, 'available');
    }
    res.json({ message: "All seats reset" });
});

// Server
app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});