import { Client } from "basic-ftp";
import * as fs from "fs";
import * as zlib from "zlib";
import * as path from "path";

async function testFTP() {
  const client = new Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: "url.publishedprices.co.il",
      user: "RamiLevi",
      password: "",
      secure: false,
    });

       // 2. List files
       const fileList = await client.list();
       if (fileList.length === 0) {
           console.log("No files found on the server.");
           return;
       }

       // 3. Get first file
       const firstFile = fileList[0].name;
       const localPath = path.join(__dirname, firstFile);
       const extractedPath = localPath.replace(/\.gz$/, "");

       console.log(`Downloading: ${firstFile}...`);

       // 4. Download file
       await client.downloadTo(localPath, firstFile);
       console.log(`Downloaded to: ${localPath}`);

       // 5. Extract if .gz
       if (firstFile.endsWith(".gz")) {
           console.log("Extracting GZ...");
           const readStream = fs.createReadStream(localPath);
           const writeStream = fs.createWriteStream(extractedPath);
           const gunzip = zlib.createGunzip();

           readStream.pipe(gunzip).pipe(writeStream);

           await new Promise((resolve, reject) => {
               writeStream.on("finish", resolve);
               writeStream.on("error", reject);
           });

           console.log(`Extracted to: ${extractedPath}`);
       } else {
           console.log("No extraction needed.");
       }
    
  } catch (err) {
    console.error("FTP error:", err);
  } finally {
    client.close();
  }
}

testFTP();