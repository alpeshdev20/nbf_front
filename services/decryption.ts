// Decrypt AES-256-CBC function (no external libraries)
  const decryptAES256CBC = (encryptedData :any, key :any, iv :any) => {
    const crypto = require('crypto');

    // Ensure the key is 32 bytes (256 bits)
    const formattedKey = Buffer.from(key, 'utf-8'); // Convert string to Buffer
    const finalKey = formattedKey.slice(0, 32); // Use only the first 32 bytes (256 bits)

    // Create a decipher object with AES-256-CBC algorithm
    const decipher = crypto.createDecipheriv('aes-256-cbc', finalKey, iv);

    // Decrypt the data
    let decrypted = decipher.update(encryptedData);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted;
  };


  export function decryption(encryptedLink: string): string | null {  
      // encrypted Resource Link
      const encryptedString = encryptedLink;

      // This Should same as Laravel API Project Encrption Key 
      const secretKey = "4oMolNLzvbMBMvq0X86yK3qd3sfgvr0h1R25FcomZFXRhqRmISt8ncKelmd3UJGQ"; // Same as SHARED_SECRET_KEY in Laravel
  
      try {
        // Decode the Base64-encoded encrypted string
        const decodedData = Buffer.from(encryptedString, 'base64');

        // Extract the IV (first 16 bytes) and encrypted value
        const iv = decodedData.slice(0, 16); // First 16 bytes are IV
  
        const encryptedValue = decodedData.slice(16); // Remaining bytes are encrypted value
  
        // Convert the custom key into a 256-bit key (32 bytes)
        const key = secretKey;
  
        // Decrypt the data using AES-256-CBC
        const decryptedBuffer = decryptAES256CBC(encryptedValue, key, iv);
  
        // Convert decrypted buffer to a UTF-8 string
        const decryptedurlData = decryptedBuffer.toString('utf-8');
        //Set Decrpted Url
        
        
        return decryptedurlData;
        
      } catch (error) {
        console.error('Decryption Error:', error);
        return null;
      }
      
    } 