import express from 'express';

const app = express();

app.get("/", (req, res) => {
    return res.json({"message": "Hello !!!!"})
});

app.post("/", (req, res) => {
    return res.json({"message": "Dados ok"})
})

app.listen(3000, () => console.log('server is running...'));