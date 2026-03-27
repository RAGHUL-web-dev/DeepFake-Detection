const fs = require('fs');

async function testTextAnalysis() {
    try {
        console.log("Testing text analysis...");
        const res = await fetch("http://localhost:5000/api/v1/Auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: "test3@example.com", password: "password123" })
        });
        const loginData = await res.json();
        const token = loginData.token;

        const res2 = await fetch("http://localhost:5000/api/v1/upload/text", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Cookie": `token=${token}`
            },
            body: JSON.stringify({ message: "This is a test message to see if prediction works or fails." })
        });
        const txtData = await res2.json();
        console.log("Text Upload Result:", txtData.success ? "SUCCESS" : "FAILED", txtData.message);
        if (!txtData.success) {
            console.error("Text analysis error:", txtData);
        }
    } catch (err) {
        console.error("Test script failed:", err);
    }
}
testTextAnalysis();
