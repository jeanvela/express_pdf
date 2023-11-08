import app from "./app";
import { dbConnect } from "./db";

app.listen(8080, async () => {
    await dbConnect()
    console.log('Server on in localhost 8080');
})