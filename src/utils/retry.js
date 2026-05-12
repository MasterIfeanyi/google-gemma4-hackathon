// Retries a function up to `retries` times with a delay between each attempt
export async function withRetry(fn, retries = 2, delayMs = 500) {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const result = await fn();
            return result; // it worked, send it back
        } catch (err) {
            if (attempt === retries) throw err; // we've used all our attempts, give up
            await new Promise((resolve) => setTimeout(resolve, delayMs)); // wait before retrying
        }
    }
}

